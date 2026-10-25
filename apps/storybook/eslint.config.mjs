import { defineConfig, globalIgnores } from 'eslint/config';
import storybook from 'eslint-plugin-storybook';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import baseConfig from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPackageJson = path.resolve(__dirname, '../../package.json');

export default defineConfig([
    globalIgnores(['!.storybook', '!.storybook/**'], 'storybook/unignore-dot-storybook'),
    ...baseConfig,
    ...storybook.configs['flat/recommended'],
    {
        name: 'storybook/configuration-files',
        files: ['.storybook/**/*.ts', 'vite.config.mts'],
        rules: {
            '@nx/enforce-module-boundaries': 'off',
            'storybook/no-uninstalled-addons': [
                'error',
                {
                    packageJsonLocation: rootPackageJson,
                },
            ],
        },
    },
]);
