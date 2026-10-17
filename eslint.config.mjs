import nx from '@nx/eslint-plugin';

import { defineConfig, globalIgnores, includeIgnoreFile } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default defineConfig([
    includeIgnoreFile(gitignorePath, { name: 'workspace/gitignore' }),
    globalIgnores(['**/dist/**', '**/out-tsc/**', '**/.angular/**', '**/node_modules/**'], 'workspace/global-ignores'),
    nx.configs['flat/base'],
    nx.configs['flat/typescript'],
    nx.configs['flat/javascript'],
    prettierConfig,
    {
        name: 'workspace/imports-and-formatting',
        plugins: {
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
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
        name: 'workspace/typescript-standards',
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
    {
        name: 'workspace/nx-module-boundaries',
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
]);
