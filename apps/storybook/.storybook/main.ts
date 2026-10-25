import type { StorybookConfig } from '@storybook/angular-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
    stories: ['../../../libs/ui/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: ['@storybook/addon-a11y'],
    framework: {
        name: '@storybook/angular-vite',
        options: {
            tsconfig: resolve(__dirname, '../tsconfig.json'),
        },
    },
};

export default config;
