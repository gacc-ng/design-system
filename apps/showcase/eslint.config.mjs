import nx from '@nx/eslint-plugin';

import { defineConfig } from 'eslint/config';

import baseConfig from '../../eslint.config.mjs';

export default defineConfig(
    baseConfig,
    nx.configs['flat/angular'],
    nx.configs['flat/angular-template'],
    {
        name: 'showcase/angular-components',
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/prefer-on-push-component-change-detection': 'error',
            '@angular-eslint/prefer-standalone': 'error',
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'gacc',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'gacc',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        name: 'showcase/angular-templates',
        files: ['**/*.html'],
        rules: {
            '@angular-eslint/template/banana-in-box': 'error',
            '@angular-eslint/template/button-has-type': 'error',
            '@angular-eslint/template/alt-text': 'error',
            '@angular-eslint/template/click-events-have-key-events': 'error',
            '@angular-eslint/template/mouse-events-have-key-events': 'error',
        },
    },
);
