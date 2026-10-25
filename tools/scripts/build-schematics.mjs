import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const schematicsSrc = resolve(root, 'libs/ui/schematics');
const schematicsDist = resolve(root, 'dist/libs/ui/schematics');

console.log('Cleaning schematics dist directory...');
rmSync(schematicsDist, { recursive: true, force: true });
mkdirSync(schematicsDist, { recursive: true });

console.log('Compiling schematics TypeScript...');
execFileSync('pnpm', ['tsc', '-p', join(schematicsSrc, 'tsconfig.schematics.json')], {
    stdio: 'inherit',
    cwd: root,
});

console.log('Syncing schematics JSON and package assets...');
function copyJsonRecursive(srcDir, destDir) {
    for (const item of readdirSync(srcDir)) {
        const srcPath = join(srcDir, item);
        const destPath = join(destDir, item);
        if (statSync(srcPath).isDirectory()) {
            mkdirSync(destPath, { recursive: true });
            copyJsonRecursive(srcPath, destPath);
        } else if (item.endsWith('.json') && !item.startsWith('tsconfig')) {
            copyFileSync(srcPath, destPath);
        }
    }
}
copyJsonRecursive(schematicsSrc, schematicsDist);

console.log('Schematics build completed successfully.');
