import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [
        tsconfigPaths({
            projects: [resolve(__dirname, '../../tsconfig.base.json')],
        }),
        tailwindcss(),
    ],
});
