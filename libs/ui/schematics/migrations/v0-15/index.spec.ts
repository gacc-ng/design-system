// @vitest-environment node
import { SchematicTestRunner, type UnitTestTree } from '@angular-devkit/schematics/testing';

import { resolve } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';

const migrationPath = resolve(__dirname, '../../../../../dist/libs/ui/schematics/migration.json');

describe('migration-v0-15-provide-gacc-ui', () => {
    let runner: SchematicTestRunner;
    let tree: UnitTestTree;

    beforeEach(async () => {
        runner = new SchematicTestRunner('@gacc-ng/ui', migrationPath);
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

    it('should migrate provideSpartanHlm from @gacc-ng/ui/utils to provideGaccUi', async () => {
        const initialConfig = `import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideSpartanHlm } from '@gacc-ng/ui/utils';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideSpartanHlm()
  ]
};`;
        tree.overwrite('/projects/test-app/src/app/app.config.ts', initialConfig);

        const result = await runner.runSchematic('migration-v0-15-provide-gacc-ui', {}, tree);
        const migrated = result.readContent('/projects/test-app/src/app/app.config.ts');

        expect(migrated).toContain("import { provideGaccUi } from '@gacc-ng/ui/utils';");
        expect(migrated).toContain('provideGaccUi()');
        expect(migrated).not.toContain('provideSpartanHlm');
    });

    it('should migrate provideSpartanHlm from @spartan-ng/helm/utils to @gacc-ng/ui/utils', async () => {
        const initialConfig = `import { ApplicationConfig } from '@angular/core';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';

export const appConfig: ApplicationConfig = {
  providers: [provideSpartanHlm()]
};`;
        tree.overwrite('/projects/test-app/src/app/app.config.ts', initialConfig);

        const result = await runner.runSchematic('migration-v0-15-provide-gacc-ui', {}, tree);
        const migrated = result.readContent('/projects/test-app/src/app/app.config.ts');

        expect(migrated).toContain("import { provideGaccUi } from '@gacc-ng/ui/utils';");
        expect(migrated).toContain('provideGaccUi()');
        expect(migrated).not.toContain('@spartan-ng/helm/utils');
        expect(migrated).not.toContain('provideSpartanHlm');
    });

    it('should handle mixed imports from @spartan-ng/helm/utils cleanly', async () => {
        const initialConfig = `import { ApplicationConfig } from '@angular/core';
import { provideSpartanHlm, otherHelper } from '@spartan-ng/helm/utils';

export const appConfig: ApplicationConfig = {
  providers: [provideSpartanHlm()]
};`;
        tree.overwrite('/projects/test-app/src/app/app.config.ts', initialConfig);

        const result = await runner.runSchematic('migration-v0-15-provide-gacc-ui', {}, tree);
        const migrated = result.readContent('/projects/test-app/src/app/app.config.ts');

        expect(migrated).toContain("import { provideGaccUi } from '@gacc-ng/ui/utils';");
        expect(migrated).toContain('otherHelper');
        expect(migrated).toContain('provideGaccUi()');
        expect(migrated).not.toContain('provideSpartanHlm');
    });

    it('should deduplicate when provideGaccUi is already imported in @gacc-ng/ui/utils', async () => {
        const initialConfig = `import { ApplicationConfig } from '@angular/core';
import { provideGaccUi, provideSpartanHlm } from '@gacc-ng/ui/utils';

export const appConfig: ApplicationConfig = {
  providers: [provideSpartanHlm()]
};`;
        tree.overwrite('/projects/test-app/src/app/app.config.ts', initialConfig);

        const result = await runner.runSchematic('migration-v0-15-provide-gacc-ui', {}, tree);
        const migrated = result.readContent('/projects/test-app/src/app/app.config.ts');

        const gaccUiImports = (migrated.match(/provideGaccUi/g) || []).length;
        expect(migrated).toContain('provideGaccUi()');
        expect(migrated).not.toContain('provideSpartanHlm');
        // Once in import, once in call
        expect(gaccUiImports).toBe(2);
    });

    it('should leave comments or string literals untouched if possible and not break files', async () => {
        const initialConfig = `import { ApplicationConfig } from '@angular/core';
import { provideSpartanHlm } from '@gacc-ng/ui/utils';

// Note: provideSpartanHlm was replaced
export const message = 'Deprecated provideSpartanHlm';

export const appConfig: ApplicationConfig = {
  providers: [provideSpartanHlm()]
};`;
        tree.overwrite('/projects/test-app/src/app/app.config.ts', initialConfig);

        const result = await runner.runSchematic('migration-v0-15-provide-gacc-ui', {}, tree);
        const migrated = result.readContent('/projects/test-app/src/app/app.config.ts');

        expect(migrated).toContain("import { provideGaccUi } from '@gacc-ng/ui/utils';");
        expect(migrated).toContain('provideGaccUi()');
        expect(migrated).toContain('// Note: provideSpartanHlm was replaced');
        expect(migrated).toContain("'Deprecated provideSpartanHlm'");
    });

    it('should be a no-op if file already uses provideGaccUi without provideSpartanHlm', async () => {
        const initialConfig = `import { ApplicationConfig } from '@angular/core';
import { provideGaccUi } from '@gacc-ng/ui/utils';

export const appConfig: ApplicationConfig = {
  providers: [provideGaccUi()]
};`;
        tree.overwrite('/projects/test-app/src/app/app.config.ts', initialConfig);

        const result = await runner.runSchematic('migration-v0-15-provide-gacc-ui', {}, tree);
        const migrated = result.readContent('/projects/test-app/src/app/app.config.ts');

        expect(migrated).toBe(initialConfig);
    });
});
