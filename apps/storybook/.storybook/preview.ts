import { withThemeByClassName } from '@storybook/addon-themes';
import { applicationConfig, type Preview } from '@storybook/angular-vite';

import { provideSpartanHlm } from '@gacc-ng/ui/utils';

import './tailwind.css';

/**
 * Extracts and unindents the Angular HTML template from a CSF3 story definition,
 * stripping out internal Storybook `{ render: () => ({ template: ... }) }` wrapper code.
 */
function cleanStoryTemplateSource(code: string): string {
    if (!code) return code;

    // Match template: `...` inside render: () => ({ template: `...` })
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

    if (minIndent !== Infinity && minIndent > 0) {
        return lines.map((line) => (line.length >= minIndent ? line.slice(minIndent) : line)).join('\n');
    }

    return lines.join('\n');
}

const preview: Preview = {
    tags: ['autodocs'],
    decorators: [
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
            toc: true,
            codePanel: true,
            source: {
                format: 'dedent',
                language: 'html',
                transform: (code: string) => cleanStoryTemplateSource(code),
            },
        },
        backgrounds: {
            options: {
                light: { name: 'light', value: '#ffffff' },
                dark: { name: 'dark', value: '#18181b' },
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    initialGlobals: {
        backgrounds: { value: 'light' },
    },
};

export default preview;
