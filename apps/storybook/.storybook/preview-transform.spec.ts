import { describe, expect, it } from 'vitest';

import { formatStandaloneComponentSource } from './preview-transform';

describe('formatStandaloneComponentSource', () => {
    it('returns original code if no template is found', () => {
        const input = 'const x = 42;';
        expect(formatStandaloneComponentSource(input)).toBe(input);
    });

    it('synthesizes universal Hlm*Imports for standard primitives', () => {
        const code = `
            render: (args) => ({
                template: \`
                    <button hlmBtn variant="default">Button</button>
                \`,
            })
        `;
        const result = formatStandaloneComponentSource(code, { title: 'Primitives/Button' });

        expect(result).toContain("import { Component } from '@angular/core';");
        expect(result).toContain("import { HlmButtonImports } from '@gacc-ng/ui/button';");
        expect(result).toContain("selector: 'app-button-demo'");
        expect(result).toContain('imports: [HlmButtonImports]');
        expect(result).toContain('<button hlmBtn variant="default">Button</button>');
        expect(result).toContain('export class ButtonDemoComponent {}');
        expect(result).not.toContain('provideIcons');
    });

    it('synthesizes universal Hlm*Imports for multi-part primitives like Accordion', () => {
        const code = `
            render: () => ({
                template: \`
                    <div hlmAccordion>
                        <div hlmAccordionItem>Item</div>
                    </div>
                \`,
            })
        `;
        const result = formatStandaloneComponentSource(code, { title: 'Primitives/Accordion' });

        expect(result).toContain("import { HlmAccordionImports } from '@gacc-ng/ui/accordion';");
        expect(result).toContain('imports: [HlmAccordionImports]');
        expect(result).toContain('export class AccordionDemoComponent {}');
    });

    it('detects ng-icon usage and synthesizes icon provider imports and configuration', () => {
        const code = `
            render: () => ({
                template: \`
                    <button hlmBtn>
                        <ng-icon name="lucideMail" class="size-4" />
                        Login with Email
                    </button>
                \`,
            })
        `;
        const result = formatStandaloneComponentSource(code, { title: 'Primitives/Button' });

        expect(result).toContain("import { NgIcon, provideIcons } from '@ng-icons/core';");
        expect(result).toContain("import { lucideMail } from '@ng-icons/lucide';");
        expect(result).toContain('imports: [HlmButtonImports, NgIcon]');
        expect(result).toContain('providers: [provideIcons({ lucideMail })]');
    });

    it('deduplicates multiple icons and registers all of them', () => {
        const code = `
            render: () => ({
                template: \`
                    <div>
                        <ng-icon name="lucideLoader2" class="animate-spin" />
                        <ng-icon name="lucideCheck" />
                        <ng-icon name="lucideLoader2" />
                    </div>
                \`,
            })
        `;
        const result = formatStandaloneComponentSource(code, { title: 'Primitives/Spinner' });

        expect(result).toContain("import { lucideCheck, lucideLoader2 } from '@ng-icons/lucide';");
        expect(result).toContain('imports: [HlmSpinnerImports, NgIcon]');
        expect(result).toContain('providers: [provideIcons({ lucideCheck, lucideLoader2 })]');
    });
});
