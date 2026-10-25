import { chain, type Rule, type SchematicContext, type Tree } from '@angular-devkit/schematics';

import { addDependency, addRootProvider, DependencyType, ExistingBehavior } from '@schematics/angular/utility';
import { getWorkspace } from '@schematics/angular/utility/workspace';

import { type Schema } from './schema';

const REQUIRED_PEER_DEPS = [
    '@angular/cdk',
    '@spartan-ng/brain',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    'tw-animate-css',
    '@ng-icons/core',
    '@ng-icons/lucide',
];

function addDependenciesRule(): Rule {
    return () => {
        let pkgJson: { peerDependencies?: Record<string, string> } = {};
        try {
            pkgJson = require('../../package.json');
        } catch {
            // Fallback in test environments or isolated execution
        }
        const peers = pkgJson.peerDependencies || {};

        const rules: Rule[] = [];
        for (const dep of REQUIRED_PEER_DEPS) {
            const version = peers[dep] || 'latest';
            rules.push(
                addDependency(dep, version, {
                    type: DependencyType.Default,
                    existing: ExistingBehavior.Skip,
                }),
            );
        }
        return chain(rules);
    };
}

function addStylesRule(options: Schema): Rule {
    return async (tree: Tree, context: SchematicContext) => {
        if (options.setupStyles === false) {
            return;
        }

        const workspace = await getWorkspace(tree);
        const projectName =
            options.project ||
            (workspace.extensions['defaultProject'] as string | undefined) ||
            workspace.projects.keys().next().value;

        if (!projectName) {
            context.logger.warn('No project found in workspace to configure styles.');
            return;
        }

        const project = workspace.projects.get(projectName);
        if (!project) {
            context.logger.warn(`Project "${projectName}" not found in workspace.`);
            return;
        }

        const buildTarget = project.targets.get('build');
        if (!buildTarget || !buildTarget.options || !buildTarget.options['styles']) {
            context.logger.warn(`Could not find build styles for project "${projectName}".`);
            return;
        }

        const styles = buildTarget.options['styles'] as (string | { input?: string })[];
        let stylePath: string | undefined;
        for (const s of styles) {
            const candidate = typeof s === 'string' ? s : s?.input;
            if (candidate && candidate.endsWith('.css')) {
                stylePath = candidate;
                break;
            }
        }

        if (!stylePath) {
            context.logger.warn(
                'Could not find a .css stylesheet to configure. If using Sass/Less, please import "@gacc-ng/ui/preset.css" manually.',
            );
            return;
        }

        if (!tree.exists(stylePath)) {
            context.logger.warn(`Stylesheet ${stylePath} does not exist in workspace.`);
            return;
        }

        const content = tree.readText(stylePath);
        if (content.includes('@gacc-ng/ui/preset.css')) {
            context.logger.info(`Preset styles already imported in ${stylePath}.`);
            return;
        }

        if (content.includes('@tailwind base')) {
            context.logger.warn('Tailwind CSS v3 (@tailwind base) detected. @gacc-ng/ui requires Tailwind CSS v4.');
        }

        const presetImport = '@import "@gacc-ng/ui/preset.css";';
        let newContent: string;

        const tailwindMatch = content.match(/@import\s+['"]tailwindcss['"];?/);
        if (tailwindMatch && tailwindMatch.index !== undefined) {
            const insertIdx = tailwindMatch.index + tailwindMatch[0].length;
            newContent = content.slice(0, insertIdx) + '\n' + presetImport + content.slice(insertIdx);
        } else {
            const allImports = [...content.matchAll(/@import\s+[^;]+;/g)];
            if (allImports.length > 0) {
                const last = allImports[allImports.length - 1];
                const insertIdx = (last.index ?? 0) + last[0].length;
                newContent = content.slice(0, insertIdx) + '\n' + presetImport + content.slice(insertIdx);
            } else {
                newContent = presetImport + '\n' + content;
            }
        }

        tree.overwrite(stylePath, newContent);
        context.logger.info(` Imported @gacc-ng/ui/preset.css into ${stylePath}`);
    };
}

function addProviderRule(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (options.setupProvider === false) {
            return;
        }

        return async () => {
            const workspace = await getWorkspace(tree);
            const projectName =
                options.project ||
                (workspace.extensions['defaultProject'] as string | undefined) ||
                workspace.projects.keys().next().value;

            if (!projectName) {
                return;
            }

            const project = workspace.projects.get(projectName);
            const sourceRoot = project?.sourceRoot || `projects/${projectName}/src`;
            const possibleConfigFiles = [`${sourceRoot}/app/app.config.ts`, `${sourceRoot}/main.ts`];

            for (const file of possibleConfigFiles) {
                if (tree.exists(file)) {
                    const content = tree.readText(file);
                    if (content.includes('provideGaccUi') || content.includes('provideSpartanHlm')) {
                        context.logger.info(`provideGaccUi is already registered in ${file}.`);
                        return;
                    }
                }
            }

            try {
                return addRootProvider(
                    projectName,
                    ({ code, external }) => code`${external('provideGaccUi', '@gacc-ng/ui/utils')}()`,
                );
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : String(err);
                context.logger.warn(`Could not automatically register provideGaccUi(): ${message}`);
                context.logger.info(
                    'For NgModule or custom setups, please add provideGaccUi() from "@gacc-ng/ui/utils" to your providers manually.',
                );
            }
        };
    };
}

export default function (options: Schema): Rule {
    return chain([addDependenciesRule(), addStylesRule(options), addProviderRule(options)]);
}
