import { defineConfig } from 'eslint/config';
import playwright from 'eslint-plugin-playwright';

import baseConfig from '../../eslint.config.mjs';

export default defineConfig(baseConfig, playwright.configs['flat/recommended'], {
    name: 'showcase-e2e/playwright-rules',
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {},
});
