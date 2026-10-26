/**
 * Known multi-part primitives that export an `Hlm*Imports` barrel array.
 * Single-directive primitives export their direct directive/component name (e.g. `HlmButton`).
 */
const MULTI_PART_PRIMITIVES = new Set([
    'accordion',
    'alert',
    'alert-dialog',
    'avatar',
    'breadcrumb',
    'card',
    'collapsible',
    'command',
    'dialog',
    'dropdown-menu',
    'field',
    'input-otp',
    'kbd',
    'popover',
    'radio-group',
    'select',
    'sheet',
    'switch',
    'tabs',
    'toggle-group',
]);

/**
 * Secondary primitives that may appear inside another component's template.
 */
const SECONDARY_DEPS: Array<{
    kebab: string;
    symbol: string;
    pkg: string;
    test: RegExp;
}> = [
    {
        kebab: 'button',
        symbol: 'HlmButton',
        pkg: '@gacc-ng/ui/button',
        test: /\bhlmBtn\b|<button[^>]*hlmBtn|<hlm-button/,
    },
    { kebab: 'badge', symbol: 'HlmBadge', pkg: '@gacc-ng/ui/badge', test: /\bhlmBadge\b|<hlm-badge/ },
    { kebab: 'input', symbol: 'HlmInput', pkg: '@gacc-ng/ui/input', test: /\bhlmInput\b|<hlm-input/ },
    { kebab: 'label', symbol: 'HlmLabel', pkg: '@gacc-ng/ui/label', test: /\bhlmLabel\b|<hlm-label/ },
    {
        kebab: 'separator',
        symbol: 'HlmSeparator',
        pkg: '@gacc-ng/ui/separator',
        test: /\bhlmSeparator\b|<hlm-separator/,
    },
    { kebab: 'switch', symbol: 'HlmSwitchImports', pkg: '@gacc-ng/ui/switch', test: /\bhlmSwitch\b|<hlm-switch/ },
    { kebab: 'checkbox', symbol: 'HlmCheckbox', pkg: '@gacc-ng/ui/checkbox', test: /\bhlmCheckbox\b|<hlm-checkbox/ },
    { kebab: 'skeleton', symbol: 'HlmSkeleton', pkg: '@gacc-ng/ui/skeleton', test: /\bhlmSkeleton\b|<hlm-skeleton/ },
    { kebab: 'spinner', symbol: 'HlmSpinner', pkg: '@gacc-ng/ui/spinner', test: /\bhlmSpinner\b|<hlm-spinner/ },
    { kebab: 'card', symbol: 'HlmCardImports', pkg: '@gacc-ng/ui/card', test: /\bhlmCard\b|<hlm-card/ },
    { kebab: 'tooltip', symbol: 'HlmTooltip', pkg: '@gacc-ng/ui/tooltip', test: /\bhlmTooltip\b|<hlm-tooltip/ },
    { kebab: 'kbd', symbol: 'HlmKbdImports', pkg: '@gacc-ng/ui/kbd', test: /\bhlmKbd\b|<kbd[^>]*hlmKbd/ },
];

const DEFAULT_VAR_VALUES: Record<string, string> = {
    label: "'My Account'",
    title: "'Notification Preferences'",
    description: "'Configure what you want to receive.'",
    content: "'Account notifications and settings.'",
    text: "'Button'",
    keyText: "'⌘K'",
    separatorText: "'/'",
    side: "'right'",
};

export interface StoryTransformContext {
    title?: string;
    id?: string;
    name?: string;
    args?: Record<string, unknown>;
    initialArgs?: Record<string, unknown>;
    component?: { name?: string };
}

/**
 * Transforms CSF3 story source or template into a clean, copy-pasteable
 * Angular Standalone `@Component` snippet with all necessary imports,
 * changeDetection, selector, template, and class fields.
 */
export function formatStandaloneComponentSource(code: string, context?: StoryTransformContext): string {
    if (!code) return '';

    // If code is already a complete Angular @Component class, return as is
    if (code.includes('@Component') && code.includes('export class')) {
        return code;
    }

    // 1. Extract template string: check for CSF3 template property, fallback, or raw HTML snippet
    let extracted: string | null = null;
    const templateMatch = code.match(/template:\s*`([\s\S]*?)`(?:\s*,\s*(?:props|styles|moduleMetadata|\}))?/);
    if (templateMatch) {
        extracted = templateMatch[1];
    } else {
        const fallbackMatch = code.match(/template:\s*`([\s\S]*?)`/);
        if (fallbackMatch) {
            extracted = fallbackMatch[1];
        } else {
            const trimmed = code.trim();
            if (trimmed.startsWith('<') || trimmed.includes('</') || trimmed.includes('/>')) {
                extracted = code;
            }
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

    // 2. Resolve component naming
    let rawName = '';
    if (context?.title) {
        rawName = context.title.includes('/') ? (context.title.split('/').pop()?.trim() ?? '') : context.title.trim();
    } else if (context?.id) {
        const withoutStory = context.id.split('--')[0];
        const strippedCategory = withoutStory.replace(
            /^(?:primitives|layout|forms|overlays|foundations|blocks|ui)-/i,
            '',
        );
        rawName =
            strippedCategory !== withoutStory
                ? strippedCategory
                : withoutStory.includes('-')
                  ? withoutStory.substring(withoutStory.indexOf('-') + 1)
                  : withoutStory;
    } else if (context?.component?.name) {
        rawName = context.component.name.replace(/^Hlm/i, '');
    }

    // Fallback: detect from template
    if (!rawName) {
        const tagMatch = dedentedTemplate.match(/<hlm-([a-z0-9-]+)/i);
        if (tagMatch) {
            rawName = tagMatch[1];
        } else if (/hlmBtn/i.test(dedentedTemplate)) {
            rawName = 'button';
        } else {
            rawName = 'example';
        }
    }

    const kebabName = rawName
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .replace(/\s+/g, '-');

    const pascalName = kebabName
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    // Determine primary import symbol: barrel or single directive
    const isMultiPart = MULTI_PART_PRIMITIVES.has(kebabName);
    const primaryImportSymbol = isMultiPart ? `Hlm${pascalName}Imports` : `Hlm${pascalName}`;
    const primaryImportPackage = `@gacc-ng/ui/${kebabName}`;

    // 3. Detect secondary dependencies used in template
    const importMap = new Map<string, Set<string>>();
    importMap.set(primaryImportPackage, new Set([primaryImportSymbol]));

    for (const dep of SECONDARY_DEPS) {
        if (dep.kebab !== kebabName && dep.test.test(dedentedTemplate)) {
            let pkgSet = importMap.get(dep.pkg);
            if (!pkgSet) {
                pkgSet = new Set();
                importMap.set(dep.pkg, pkgSet);
            }
            pkgSet.add(dep.symbol);
        }
    }

    // 4. Detect Lucide icons
    const iconMatches = Array.from(
        dedentedTemplate.matchAll(/(?:name=["']|provideIcons\({\s*)(lucide[A-Z0-9][a-zA-Z0-9]*)/g),
        (m) => m[1],
    );
    const uniqueIcons = Array.from(new Set(iconMatches)).filter(Boolean).sort();
    const hasIcons = uniqueIcons.length > 0;

    // 5. Build imports list for @Component metadata
    const componentImports: string[] = [];
    for (const symbols of importMap.values()) {
        for (const symbol of symbols) {
            componentImports.push(symbol);
        }
    }

    if (hasIcons) {
        componentImports.push('NgIcon');
    }

    // Build TypeScript import statements
    const importStatements = [`import { ChangeDetectionStrategy, Component } from '@angular/core';`];

    for (const [pkg, symbols] of importMap.entries()) {
        const sortedSymbols = Array.from(symbols).sort();
        importStatements.push(`import { ${sortedSymbols.join(', ')} } from '${pkg}';`);
    }

    if (hasIcons) {
        importStatements.push(`import { NgIcon, provideIcons } from '@ng-icons/core';`);
        importStatements.push(`import { ${uniqueIcons.join(', ')} } from '@ng-icons/lucide';`);
    }

    // 6. Detect interpolation variables (e.g. {{ label }})
    const varMatches = Array.from(dedentedTemplate.matchAll(/\{\{\s*([a-zA-Z0-9_$]+)\s*\}\}/g), (m) => m[1]);
    const uniqueVars = Array.from(new Set(varMatches)).filter((v) => !['index', 'item', 'i', 'event'].includes(v));

    const classFields: string[] = [];
    const args = { ...context?.initialArgs, ...context?.args };

    for (const varName of uniqueVars) {
        if (args && args[varName] !== undefined) {
            const val = args[varName];
            const formattedVal = typeof val === 'string' ? `'${val}'` : JSON.stringify(val);
            classFields.push(`    protected readonly ${varName} = ${formattedVal};`);
        } else if (DEFAULT_VAR_VALUES[varName]) {
            classFields.push(`    protected readonly ${varName} = ${DEFAULT_VAR_VALUES[varName]};`);
        } else {
            classFields.push(`    protected readonly ${varName} = 'Sample';`);
        }
    }

    // 7. Format template indentation inside @Component
    const indentedTemplate = dedentedTemplate
        .split('\n')
        .map((l) => (l.trim() ? `        ${l}` : ''))
        .join('\n');

    // 8. Assemble component metadata
    const componentMetadataLines = [
        `@Component({`,
        `    selector: 'app-${kebabName}-demo',`,
        `    imports: [${componentImports.join(', ')}],`,
    ];

    if (hasIcons) {
        componentMetadataLines.push(`    providers: [provideIcons({ ${uniqueIcons.join(', ')} })],`);
    }

    componentMetadataLines.push(
        `    changeDetection: ChangeDetectionStrategy.OnPush,`,
        `    template: \``,
        `${indentedTemplate}`,
        `    \`,`,
        `})`,
        `export class ${pascalName}DemoComponent {${
            classFields.length > 0 ? '\n' + classFields.join('\n') + '\n' : ''
        }}`,
    );

    return [...importStatements, '', ...componentMetadataLines].join('\n');
}
