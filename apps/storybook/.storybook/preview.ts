import { withThemeByClassName } from '@storybook/addon-themes';
import { applicationConfig, type Preview } from '@storybook/angular-vite';

import { provideSpartanHlm } from '@gacc-ng/ui/utils';

import { DocsContainer } from './docs-container';

import './tailwind.css';

const MULTI_PART_COMPONENTS = new Set([
    'accordion',
    'alert-dialog',
    'alert',
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
    'separator',
    'sheet',
    'slider',
    'switch',
    'tabs',
    'toggle-group',
]);

/**
 * Transforms CSF3 story source code into a clean, copy-pasteable Angular Standalone @Component snippet.
 * Strips Storybook's internal `{ render: () => ({ template: ... }) }` wrapper and synthesizes
 * the necessary Angular imports and standalone component metadata.
 */
function formatStandaloneComponentSource(code: string, context?: { title?: string }): string {
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

    const importSymbol = MULTI_PART_COMPONENTS.has(kebabName) ? `Hlm${pascalName}Imports` : `Hlm${pascalName}`;

    const indentedTemplateForClass = dedentedTemplate
        .split('\n')
        .map((l) => (l.trim() ? `        ${l}` : ''))
        .join('\n');

    return [
        `import { Component } from '@angular/core';`,
        `import { ${importSymbol} } from '@gacc-ng/ui/${kebabName}';`,
        ``,
        `@Component({`,
        `    selector: 'app-${kebabName}-demo',`,
        `    imports: [${importSymbol}],`,
        `    template: \``,
        `${indentedTemplateForClass}`,
        `    \`,`,
        `})`,
        `export class ${pascalName}DemoComponent {}`,
    ].join('\n');
}

const RADIUS_MAP: Record<string, string> = {
    none: '0rem',
    subtle: '0.25rem',
    moderate: '0.875rem',
    pronounced: '1.5rem',
};

const withRadiusDecorator = (storyFn: () => unknown, context: { globals?: { radius?: string } }) => {
    const radius = context.globals?.radius;
    if (typeof document !== 'undefined') {
        if (!radius || radius === 'default') {
            document.documentElement.style.removeProperty('--radius');
        } else if (RADIUS_MAP[radius]) {
            document.documentElement.style.setProperty('--radius', RADIUS_MAP[radius]);
        }
    }
    return storyFn();
};

const preview: Preview = {
    tags: ['autodocs'],
    globalTypes: {
        radius: {
            name: 'Radius',
            description: 'Corner radius preset token',
            defaultValue: 'default',
            toolbar: {
                title: 'Radius',
                icon: 'box',
                dynamicTitle: true,
                items: [
                    { value: 'default', title: 'Default' },
                    { value: 'none', title: 'None' },
                    { value: 'subtle', title: 'Subtle' },
                    { value: 'moderate', title: 'Moderate' },
                    { value: 'pronounced', title: 'Pronounced' },
                ],
            },
        },
    },
    decorators: [
        withRadiusDecorator,
        withThemeByClassName({
            themes: {
                light: '',
                dark: 'dark',
            },
            defaultTheme: 'light',
            parentSelector: 'html',
        }),
        applicationConfig({
            providers: [provideSpartanHlm()],
        }),
    ],
    parameters: {
        docs: {
            container: DocsContainer,
            toc: true,
            codePanel: true,
            source: {
                format: 'dedent',
                language: 'typescript',
                transform: (code: string, storyContext: { title?: string }) =>
                    formatStandaloneComponentSource(code, storyContext),
            },
        },
        backgrounds: {
            disable: true,
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
