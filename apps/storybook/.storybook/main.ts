import type { StorybookConfig } from '@storybook/angular-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
    stories: ['../docs/**/*.mdx', '../../../libs/ui/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: ['@storybook/addon-a11y', '@storybook/addon-mcp', '@storybook/addon-themes', '@storybook/addon-docs'],
    features: {
        experimentalDocgenServer: false,
    },
    docs: {
        defaultName: 'Docs',
    },
    framework: {
        name: '@storybook/angular-vite',
        options: {
            tsconfig: resolve(__dirname, '../tsconfig.json'),
            compodoc: false,
        },
    },
};

export default config;
