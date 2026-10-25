/**
 * Transforms CSF3 story source code into a clean, copy-pasteable Angular Standalone @Component snippet.
 * Strips Storybook's internal `{ render: () => ({ template: ... }) }` wrapper and synthesizes
 * the necessary Angular imports, icon providers, and standalone component metadata.
 */
export function formatStandaloneComponentSource(code: string, context?: { title?: string }): string {
    if (!code) return code;

    // 1. Extract template string
    const templateMatch = code.match(/template:\s*`([\s\S]*?)`(?:\s*,\s*(?:props|styles|moduleMetadata|\}))?/);
    let extracted = templateMatch ? templateMatch[1] : null;

    if (!extracted) {
        const fallbackMatch = code.match(/template:\s*`([\s\S]*?)`/);
        if (fallbackMatch) {
            extracted = fallbackMatch[1];
        }
    }

    if (!extracted) {
        return code;
    }

    // Dedent and trim empty surrounding lines
    const lines = extracted.split('\n');
    while (lines.length > 0 && lines[0].trim() === '') {
        lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }

    if (lines.length === 0) return '';

    const minIndent = lines.reduce((min, line) => {
        if (line.trim() === '') return min;
        const match = line.match(/^(\s*)/);
        return Math.min(min, match ? match[1].length : 0);
    }, Infinity);

    const dedentedTemplate =
        minIndent !== Infinity && minIndent > 0
            ? lines.map((line) => (line.length >= minIndent ? line.slice(minIndent) : line)).join('\n')
            : lines.join('\n');

    // 2. Resolve component naming from Story context
    const title = typeof context?.title === 'string' ? context.title : '';
    const rawName = title.replace(/^Primitives\//i, '').trim();

    if (!rawName) {
        return dedentedTemplate;
    }

    const kebabName = rawName.toLowerCase().replace(/\s+/g, '-');
    const pascalName = rawName.replace(/(?:^|\s|-)([a-z0-9])/gi, (_, c) => c.toUpperCase()).replace(/[\s-]+/g, '');

    // Standardized universal barrel adoption across all 32 primitives
    const importSymbol = `Hlm${pascalName}Imports`;

    // 3. Detect icon usage (<ng-icon name="..." />)
    const iconMatches = Array.from(dedentedTemplate.matchAll(/<ng-icon[^>]*name=["']([^"']+)["']/g), (m) => m[1]);
    const uniqueIcons = Array.from(new Set(iconMatches)).filter(Boolean).sort();

    const hasIcons = uniqueIcons.length > 0;
    const componentImports = hasIcons ? `${importSymbol}, NgIcon` : importSymbol;

    const importStatements = [
        `import { Component } from '@angular/core';`,
        `import { ${importSymbol} } from '@gacc-ng/ui/${kebabName}';`,
    ];

    if (hasIcons) {
        importStatements.push(`import { NgIcon, provideIcons } from '@ng-icons/core';`);
        importStatements.push(`import { ${uniqueIcons.join(', ')} } from '@ng-icons/lucide';`);
    }

    const indentedTemplateForClass = dedentedTemplate
        .split('\n')
        .map((l) => (l.trim() ? `        ${l}` : ''))
        .join('\n');

    const componentMetadataLines = [
        `@Component({`,
        `    selector: 'app-${kebabName}-demo',`,
        `    imports: [${componentImports}],`,
    ];

    if (hasIcons) {
        componentMetadataLines.push(`    providers: [provideIcons({ ${uniqueIcons.join(', ')} })],`);
    }

    componentMetadataLines.push(
        `    template: \``,
        `${indentedTemplateForClass}`,
        `    \`,`,
        `})`,
        `export class ${pascalName}DemoComponent {}`,
    );

    return [...importStatements, '', ...componentMetadataLines].join('\n');
}
