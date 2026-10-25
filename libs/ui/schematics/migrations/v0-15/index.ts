import { type Rule, type SchematicContext, type Tree } from '@angular-devkit/schematics';

import ts from 'typescript';

interface TextEdit {
    start: number;
    end: number;
    replacement: string;
}

export function migrateSourceFile(content: string): { updated: string; changed: boolean } {
    if (!content.includes('provideSpartanHlm')) {
        return { updated: content, changed: false };
    }

    let sourceFile: ts.SourceFile;
    try {
        sourceFile = ts.createSourceFile('file.ts', content, ts.ScriptTarget.Latest, true);
    } catch {
        const fallback = content.replace(/\bprovideSpartanHlm\b/g, 'provideGaccUi');
        return { updated: fallback, changed: fallback !== content };
    }

    const edits: TextEdit[] = [];

    for (const stmt of sourceFile.statements) {
        if (!ts.isImportDeclaration(stmt)) {
            continue;
        }

        const moduleSpecifier = (stmt.moduleSpecifier as ts.StringLiteral).text;
        const namedBindings = stmt.importClause?.namedBindings;

        if (!namedBindings || !ts.isNamedImports(namedBindings)) {
            continue;
        }

        const elements = namedBindings.elements;
        const spartanElem = elements.find((el) => el.name.text === 'provideSpartanHlm');
        const hasGaccUi = elements.some((el) => el.name.text === 'provideGaccUi');

        if (!spartanElem) {
            continue;
        }

        if (moduleSpecifier === '@gacc-ng/ui/utils' || moduleSpecifier === '@gacc-ng/ui') {
            if (hasGaccUi) {
                const idx = elements.indexOf(spartanElem);
                if (elements.length === 1) {
                    edits.push({ start: stmt.getStart(sourceFile), end: stmt.getEnd(), replacement: '' });
                } else if (idx === 0) {
                    const next = elements[1];
                    edits.push({
                        start: spartanElem.getStart(sourceFile),
                        end: next.getStart(sourceFile),
                        replacement: '',
                    });
                } else {
                    const prev = elements[idx - 1];
                    edits.push({
                        start: prev.getEnd(),
                        end: spartanElem.getEnd(),
                        replacement: '',
                    });
                }
            } else {
                edits.push({
                    start: spartanElem.name.getStart(sourceFile),
                    end: spartanElem.name.getEnd(),
                    replacement: 'provideGaccUi',
                });
            }
        } else if (moduleSpecifier === '@spartan-ng/helm/utils') {
            if (elements.length === 1) {
                edits.push({
                    start: stmt.getStart(sourceFile),
                    end: stmt.getEnd(),
                    replacement: "import { provideGaccUi } from '@gacc-ng/ui/utils';",
                });
            } else {
                const idx = elements.indexOf(spartanElem);
                if (idx === 0) {
                    const next = elements[1];
                    edits.push({
                        start: spartanElem.getStart(sourceFile),
                        end: next.getStart(sourceFile),
                        replacement: '',
                    });
                } else {
                    const prev = elements[idx - 1];
                    edits.push({
                        start: prev.getEnd(),
                        end: spartanElem.getEnd(),
                        replacement: '',
                    });
                }
                edits.push({
                    start: stmt.getEnd(),
                    end: stmt.getEnd(),
                    replacement: "\nimport { provideGaccUi } from '@gacc-ng/ui/utils';",
                });
            }
        }
    }

    function checkIdentifiers(node: ts.Node) {
        if (ts.isIdentifier(node) && node.text === 'provideSpartanHlm') {
            if (!ts.isImportSpecifier(node.parent)) {
                edits.push({
                    start: node.getStart(sourceFile),
                    end: node.getEnd(),
                    replacement: 'provideGaccUi',
                });
            }
        }
        ts.forEachChild(node, checkIdentifiers);
    }
    checkIdentifiers(sourceFile);

    if (edits.length === 0) {
        return { updated: content, changed: false };
    }

    edits.sort((a, b) => b.start - a.start);

    let updated = content;
    for (const edit of edits) {
        updated = updated.slice(0, edit.start) + edit.replacement + updated.slice(edit.end);
    }

    return { updated, changed: true };
}

export default function (): Rule {
    return (tree: Tree, context: SchematicContext) => {
        let filesMigrated = 0;

        tree.visit((filePath) => {
            if (!filePath.endsWith('.ts')) {
                return;
            }
            if (
                filePath.includes('/node_modules/') ||
                filePath.includes('/dist/') ||
                filePath.includes('/.angular/') ||
                filePath.endsWith('.d.ts')
            ) {
                return;
            }

            const content = tree.readText(filePath);
            if (!content.includes('provideSpartanHlm')) {
                return;
            }

            const { updated, changed } = migrateSourceFile(content);
            if (changed) {
                tree.overwrite(filePath, updated);
                filesMigrated++;
                context.logger.info(` Migrated deprecated provideSpartanHlm -> provideGaccUi in ${filePath}`);
            }
        });

        if (filesMigrated > 0) {
            context.logger.info(` Successfully migrated ${filesMigrated} file(s) to provideGaccUi.`);
        } else {
            context.logger.info(' No usages of provideSpartanHlm found to migrate.');
        }
    };
}
