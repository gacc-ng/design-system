import { describe, expect, it } from 'vitest';

import { formatStandaloneComponentSource } from './preview-transform';

describe('formatStandaloneComponentSource', () => {
    it('returns original code if no template is found', () => {
        const input = 'const x = 42;';
        expect(formatStandaloneComponentSource(input)).toBe(input);
    });

    it('returns original code if already a complete @Component class', () => {
        const componentCode = `
@Component({
    selector: 'app-custom-demo',
    template: '<div>Custom</div>',
})
export class CustomDemoComponent {}
`;
        expect(formatStandaloneComponentSource(componentCode)).toBe(componentCode);
    });

    it('synthesizes standalone component for single directives like Button with OnPush', () => {
        const code = `
            render: (args) => ({
                template: \`
                    <button hlmBtn variant="default">Button</button>
                \`,
            })
        `;
        const result = formatStandaloneComponentSource(code, { title: 'Primitives/Button' });

        expect(result).toContain("import { ChangeDetectionStrategy, Component } from '@angular/core';");
        expect(result).toContain("import { HlmButton } from '@gacc-ng/ui/button';");
        expect(result).toContain("selector: 'app-button-demo'");
        expect(result).toContain('imports: [HlmButton]');
        expect(result).toContain('changeDetection: ChangeDetectionStrategy.OnPush,');
        expect(result).toContain('<button hlmBtn variant="default">Button</button>');
        expect(result).toContain('export class ButtonDemoComponent {}');
        expect(result).not.toContain('provideIcons');
    });

    it('synthesizes Hlm*Imports barrel for multi-part primitives like Accordion', () => {
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
        expect(result).toContain('changeDetection: ChangeDetectionStrategy.OnPush,');
        expect(result).toContain('export class AccordionDemoComponent {}');
    });

    it('synthesizes standalone component across arbitrary category prefixes in title', () => {
        const layoutCode = `
            render: () => ({
                template: \`
                    <div hlmCard>
                        <div hlmCardHeader>Title</div>
                    </div>
                \`,
            })
        `;
        const layoutResult = formatStandaloneComponentSource(layoutCode, { title: 'Layout/Card' });
        expect(layoutResult).toContain("import { HlmCardImports } from '@gacc-ng/ui/card';");
        expect(layoutResult).toContain("selector: 'app-card-demo'");
        expect(layoutResult).toContain('export class CardDemoComponent {}');

        const formCode = `
            render: () => ({
                template: \`
                    <input hlmInput placeholder="Email" />
                \`,
            })
        `;
        const formResult = formatStandaloneComponentSource(formCode, { title: 'Forms/Input' });
        expect(formResult).toContain("import { HlmInput } from '@gacc-ng/ui/input';");
        expect(formResult).toContain("selector: 'app-input-demo'");
        expect(formResult).toContain('export class InputDemoComponent {}');

        const overlayCode = `
            render: () => ({
                template: \`
                    <hlm-dialog>
                        <div hlmDialogContent>Modal Content</div>
                    </hlm-dialog>
                \`,
            })
        `;
        const overlayResult = formatStandaloneComponentSource(overlayCode, { title: 'Overlays/Dialog' });
        expect(overlayResult).toContain("import { HlmDialogImports } from '@gacc-ng/ui/dialog';");
        expect(overlayResult).toContain("selector: 'app-dialog-demo'");
        expect(overlayResult).toContain('export class DialogDemoComponent {}');
    });

    it('resolves component names from category-prefixed story IDs', () => {
        const cardHtml = `<div hlmCard>Card content</div>`;
        const cardResult = formatStandaloneComponentSource(cardHtml, { id: 'layout-card--default' });
        expect(cardResult).toContain("import { HlmCardImports } from '@gacc-ng/ui/card';");
        expect(cardResult).toContain("selector: 'app-card-demo'");

        const inputOtpHtml = `<hlm-input-otp>OTP</hlm-input-otp>`;
        const inputOtpResult = formatStandaloneComponentSource(inputOtpHtml, { id: 'forms-input-otp--default' });
        expect(inputOtpResult).toContain("import { HlmInputOtpImports } from '@gacc-ng/ui/input-otp';");
        expect(inputOtpResult).toContain("selector: 'app-input-otp-demo'");

        const dialogHtml = `<hlm-dialog>Dialog</hlm-dialog>`;
        const dialogResult = formatStandaloneComponentSource(dialogHtml, { id: 'overlays-dialog--default' });
        expect(dialogResult).toContain("import { HlmDialogImports } from '@gacc-ng/ui/dialog';");
        expect(dialogResult).toContain("selector: 'app-dialog-demo'");
    });

    it('handles raw HTML template strings passed directly by Storybook docs addon', () => {
        const rawHtml = `
            <div class="p-16">
                <button hlmBtn>Click me</button>
            </div>
        `;
        const result = formatStandaloneComponentSource(rawHtml, { id: 'primitives-button--default' });

        expect(result).toContain("import { HlmButton } from '@gacc-ng/ui/button';");
        expect(result).toContain("selector: 'app-button-demo'");
        expect(result).toContain('imports: [HlmButton]');
        expect(result).toContain('<button hlmBtn>Click me</button>');
        expect(result).toContain('export class ButtonDemoComponent {}');
    });

    it('detects secondary dependencies in template (e.g. hlmBtn inside dropdown menu)', () => {
        const rawHtml = `
            <button hlmBtn [hlmDropdownMenuTrigger]="menu">Open</button>
            <hlm-dropdown-menu #menu>
                <button hlmDropdownMenuItem>Profile</button>
            </hlm-dropdown-menu>
        `;
        const result = formatStandaloneComponentSource(rawHtml, { title: 'Primitives/Dropdown Menu' });

        expect(result).toContain("import { HlmButton } from '@gacc-ng/ui/button';");
        expect(result).toContain("import { HlmDropdownMenuImports } from '@gacc-ng/ui/dropdown-menu';");
        expect(result).toContain('imports: [HlmDropdownMenuImports, HlmButton]');
        expect(result).toContain("selector: 'app-dropdown-menu-demo'");
        expect(result).toContain('export class DropdownMenuDemoComponent {}');
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
        expect(result).toContain('imports: [HlmButton, NgIcon]');
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
        expect(result).toContain('imports: [HlmSpinner, NgIcon]');
        expect(result).toContain('providers: [provideIcons({ lucideCheck, lucideLoader2 })]');
    });

    it('synthesizes class fields for template interpolation variables from args and defaults', () => {
        const rawHtml = `
            <div hlmCard>
                <h2>{{ title }}</h2>
                <p>{{ description }}</p>
            </div>
        `;
        const result = formatStandaloneComponentSource(rawHtml, {
            title: 'Primitives/Card',
            args: { title: 'Custom Card Title' },
        });

        expect(result).toContain("protected readonly title = 'Custom Card Title';");
        expect(result).toContain("protected readonly description = 'Configure what you want to receive.';");
        expect(result).toContain('export class CardDemoComponent {');
    });
});
