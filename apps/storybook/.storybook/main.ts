import type { StorybookConfig } from '@storybook/angular-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
    stories: ['../../../libs/shared/ui/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: [],
    framework: {
        name: '@storybook/angular-vite',
        options: {
            tsconfig: resolve(__dirname, '../tsconfig.json'),
        },
    },
    async viteFinal(config) {
        config.plugins = config.plugins || [];
        config.plugins.push(
            tsconfigPaths({
                projects: [resolve(__dirname, '../../../tsconfig.base.json')],
            }),
        );
        return config;
    },
};

export default config;
