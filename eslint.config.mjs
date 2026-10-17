import nx from '@nx/eslint-plugin';

import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    prettierConfig,
    {
        ignores: ['**/dist', '**/out-tsc', '**/.angular'],
    },
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // 1. Angular & core framework packages
                        ['^@angular', '^@nx', '^rxjs'],
                        // 2. Third-party external packages
                        ['^@?\\w'],
                        // 3. Internal monorepo library scopes
                        ['^@gacc-ng(/.*|$)'],
                        // 4. Parent and sibling relative imports
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        // 5. Style imports
                        ['^.+\\.s?css$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },
];
