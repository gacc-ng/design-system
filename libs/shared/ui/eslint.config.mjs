import nx from '@nx/eslint-plugin';

import baseConfig from '../../../eslint.config.mjs';

export default [
    ...baseConfig,
    ...nx.configs['flat/angular'],
    ...nx.configs['flat/angular-template'],
    {
        files: ['**/*.json'],
        rules: {
            '@nx/dependency-checks': [
                'error',
                {
                    ignoredFiles: [
                        '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
                        '{projectRoot}/vite.config.{ts,mts}',
                        '{projectRoot}/**/test-setup.ts',
                        '{projectRoot}/src/testing/**/*.ts',
                        '{projectRoot}/**/*.spec.ts',
                        '{projectRoot}/**/*.stories.ts',
                    ],
                    // tailwindcss and tw-animate-css are required peer dependencies consumed through the
                    // CSS preset (@import in preset.css), which dependency check cannot detect from TS imports.
                    ignoredDependencies: ['tailwindcss', 'tw-animate-css'],
                },
            ],
        },
        languageOptions: {
            parser: await import('jsonc-eslint-parser'),
        },
    },
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: ['gacc', 'hlm'],
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
            // Spartan design system class naming (classes are HlmButton, HlmBadge, etc. without mandatory suffix)
            '@angular-eslint/directive-class-suffix': 'off',
            '@angular-eslint/component-class-suffix': 'off',
            // Primitives alias inputs/outputs and may emit native DOM events
            '@angular-eslint/no-input-rename': 'off',
            '@angular-eslint/no-output-rename': 'off',
            '@angular-eslint/no-output-native': 'off',
            // Enforce modern Angular Signal and Zoneless standards
            '@angular-eslint/prefer-output-readonly': 'error',
            '@angular-eslint/prefer-on-push-component-change-detection': 'error',
            '@angular-eslint/prefer-signals': 'error',
        },
    },
    {
        files: ['**/*.spec.ts', '**/__tests__/*.ts'],
        rules: {
            // Test host components don't require production signals or design system selector prefixes
            '@angular-eslint/prefer-signals': 'off',
            '@angular-eslint/directive-selector': 'off',
            '@angular-eslint/component-selector': 'off',
        },
    },
    {
        files: ['**/*.html'],
        rules: {
            // Accessible primitives delegate interactive/key handlers to host directives (CDK / Brain)
            '@angular-eslint/template/click-events-have-key-events': 'off',
            '@angular-eslint/template/interactive-supports-focus': 'off',
            '@angular-eslint/template/label-has-associated-control': 'off',
        },
    },
];
