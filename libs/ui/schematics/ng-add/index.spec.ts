// @vitest-environment node
import { SchematicTestRunner, type UnitTestTree } from '@angular-devkit/schematics/testing';

import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';

const collectionPath = resolve(__dirname, '../../../../dist/libs/ui/schematics/collection.json');

describe('ng-add schematic', () => {
    let runner: SchematicTestRunner;
    let tree: UnitTestTree;

    beforeEach(async () => {
        runner = new SchematicTestRunner('@gacc-ng/ui', collectionPath);
        tree = await runner.runExternalSchematic('@schematics/angular', 'workspace', {
            name: 'test-workspace',
            version: '19.0.0',
            newProjectRoot: 'projects',
        });
        tree = await runner.runExternalSchematic(
            '@schematics/angular',
            'application',
            {
                name: 'test-app',
                standalone: true,
                style: 'css',
            },
            tree,
        );
    });

    it('should add peer dependencies to package.json', async () => {
        const result = await runner.runSchematic('ng-add', { project: 'test-app' }, tree);
        const pkg = JSON.parse(result.readContent('/package.json'));
        expect(pkg.dependencies['@spartan-ng/brain']).toBeDefined();
        expect(pkg.dependencies['class-variance-authority']).toBeDefined();
        expect(pkg.dependencies['clsx']).toBeDefined();
        expect(pkg.dependencies['tailwind-merge']).toBeDefined();
    });

    it('should inject @import "@gacc-ng/ui/preset.css" into styles.css after tailwindcss', async () => {
        tree.overwrite('/projects/test-app/src/styles.css', '@import "tailwindcss";\nbody { margin: 0; }');
        const result = await runner.runSchematic('ng-add', { project: 'test-app' }, tree);
        const styles = result.readContent('/projects/test-app/src/styles.css');
        expect(styles).toContain('@import "tailwindcss";\n@import "@gacc-ng/ui/preset.css";');
    });

    it('should insert @import at start of file when no existing imports exist', async () => {
        tree.overwrite('/projects/test-app/src/styles.css', 'body { margin: 0; }');
        const result = await runner.runSchematic('ng-add', { project: 'test-app' }, tree);
        const styles = result.readContent('/projects/test-app/src/styles.css');
        expect(styles.startsWith('@import "@gacc-ng/ui/preset.css";')).toBe(true);
    });

    it('should be idempotent and not duplicate imports or providers', async () => {
        let result = await runner.runSchematic('ng-add', { project: 'test-app' }, tree);
        result = await runner.runSchematic('ng-add', { project: 'test-app' }, result);
        const styles = result.readContent('/projects/test-app/src/styles.css');
        const config = result.readContent('/projects/test-app/src/app/app.config.ts');
        const styleOccurrences = (styles.match(/@gacc-ng\/ui\/preset\.css/g) || []).length;
        const providerCallOccurrences = (config.match(/provideGaccUi\(\)/g) || []).length;
        expect(styleOccurrences).toBe(1);
        expect(providerCallOccurrences).toBe(1);
    });

    it('should inject provideGaccUi into app.config.ts', async () => {
        const result = await runner.runSchematic('ng-add', { project: 'test-app' }, tree);
        const appConfig = result.readContent('/projects/test-app/src/app/app.config.ts');
        expect(appConfig).toContain('provideGaccUi');
    });

    it('should respect --setupStyles=false and --setupProvider=false', async () => {
        const result = await runner.runSchematic(
            'ng-add',
            {
                project: 'test-app',
                setupStyles: false,
                setupProvider: false,
            },
            tree,
        );
        const styles = result.readContent('/projects/test-app/src/styles.css');
        const appConfig = result.readContent('/projects/test-app/src/app/app.config.ts');
        expect(styles).not.toContain('@gacc-ng/ui/preset.css');
        expect(appConfig).not.toContain('provideGaccUi');
    });

    it('should handle legacy NgModule application gracefully', async () => {
        let ngModuleTree = await runner.runExternalSchematic('@schematics/angular', 'workspace', {
            name: 'test-workspace',
            version: '19.0.0',
            newProjectRoot: 'projects',
        });
        ngModuleTree = await runner.runExternalSchematic(
            '@schematics/angular',
            'application',
            {
                name: 'legacy-app',
                standalone: false,
                style: 'css',
            },
            ngModuleTree,
        );

        const result = await runner.runSchematic('ng-add', { project: 'legacy-app' }, ngModuleTree);
        expect(result).toBeDefined();
    });
});
