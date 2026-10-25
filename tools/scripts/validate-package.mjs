import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');
const targetDirArg = process.argv[2] || 'dist/libs/ui';
const distDir = resolve(root, targetDirArg);

console.log(`🔍 Validating package integrity at: ${distDir}`);

if (!existsSync(distDir)) {
    console.error(`❌ Distribution directory not found: ${distDir}`);
    process.exit(1);
}

const pkgJsonPath = resolve(distDir, 'package.json');
if (!existsSync(pkgJsonPath)) {
    console.error(`❌ package.json not found in distribution directory: ${pkgJsonPath}`);
    process.exit(1);
}

const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));

// 1. Validate mandatory static assets
const requiredFiles = ['src/styles/preset.css', 'schematics/collection.json', 'schematics/migration.json'];

for (const file of requiredFiles) {
    const filePath = resolve(distDir, file);
    if (!existsSync(filePath)) {
        console.error(`❌ Mandatory file missing: ${file} (expected at ${filePath})`);
        process.exit(1);
    }
}
console.log(`✅ Verified mandatory assets: ${requiredFiles.join(', ')}`);

// 2. Validate all exports dynamically
if (!pkg.exports || typeof pkg.exports !== 'object') {
    console.error(`❌ package.json missing "exports" field`);
    process.exit(1);
}

let verifiedExports = 0;
for (const [subpath, entry] of Object.entries(pkg.exports)) {
    if (typeof entry === 'string') {
        const fullPath = resolve(distDir, entry);
        if (!existsSync(fullPath)) {
            console.error(`❌ Export "${subpath}" references missing file: ${entry}`);
            process.exit(1);
        }
    } else if (typeof entry === 'object' && entry !== null) {
        for (const [condition, target] of Object.entries(entry)) {
            if (typeof target === 'string') {
                const fullPath = resolve(distDir, target);
                if (!existsSync(fullPath)) {
                    console.error(`❌ Export "${subpath}" [${condition}] references missing file: ${target}`);
                    process.exit(1);
                }
            }
        }
    }
    verifiedExports++;
}
console.log(`✅ Verified ${verifiedExports} export mappings in package.json`);

// 3. Dry-run npm packaging with pnpm
console.log(`📦 Running pnpm pack --dry-run...`);
try {
    execSync('pnpm pack --dry-run', { cwd: distDir, stdio: 'inherit' });
    console.log(`✅ Package tarball structure validated successfully!`);
} catch (error) {
    console.error(`❌ Failed to execute pnpm pack --dry-run:`, error);
    process.exit(1);
}

console.log(`🎉 Package validation passed with 100% integrity.`);
