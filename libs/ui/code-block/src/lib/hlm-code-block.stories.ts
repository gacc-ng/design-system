import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload, lucideTerminal, lucideWrapText } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmCodeBlock, HlmCodeBlockImports } from './hlm-code-block';

const meta: Meta<HlmCodeBlock> = {
    title: 'Media & Display/Code Block',
    component: HlmCodeBlock,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmCodeBlockImports, HlmButton, NgIcon],
            providers: [provideIcons({ lucideTerminal, lucideWrapText, lucideDownload })],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm'],
        },
    },
};

export default meta;
type Story = StoryObj<HlmCodeBlock>;

export const Default: Story = {
    render: () => ({
        props: {
            command: 'pnpm add @gacc-ng/ui',
        },
        template: `
            <div class="max-w-md p-4">
                <hlm-code-block>
                    <pre hlmCodeBlockContent>{{ command }}</pre>
                </hlm-code-block>
            </div>
        `,
    }),
};

export const HeaderWithCopy: Story = {
    render: () => ({
        props: {
            code: `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  template: '<h1>Hello World</h1>',\n})\nexport class AppComponent {}`,
        },
        template: `
            <div class="max-w-lg p-4">
                <hlm-code-block>
                    <hlm-code-block-header>
                        <hlm-code-block-title>
                            <ng-icon name="lucideTerminal" />
                            app.component.ts
                        </hlm-code-block-title>
                        <hlm-code-block-actions>
                            <button hlmCodeBlockCopyButton [value]="code"></button>
                        </hlm-code-block-actions>
                    </hlm-code-block-header>
                    <pre hlmCodeBlockContent [code]="code" lineNumbers></pre>
                    <hlm-code-block-footer>TypeScript · 142 B</hlm-code-block-footer>
                </hlm-code-block>
            </div>
        `,
    }),
};

export const DiffView: Story = {
    render: () => ({
        props: {
            code: `export class Greeter {\n  // removed\n  // added\n  name = 'Angular';\n}`,
        },
        template: `
            <div class="max-w-md p-4">
                <hlm-code-block>
                    <hlm-code-block-header>
                        <hlm-code-block-title>greeter.ts (Git Diff)</hlm-code-block-title>
                    </hlm-code-block-header>
                    <pre hlmCodeBlockContent lineNumbers>
                        <span hlmCodeBlockLine>export class Greeter &#123;</span>
                        <span hlmCodeBlockLine variant="removed">-  readonly greeting = 'Hello';</span>
                        <span hlmCodeBlockLine variant="added">+  readonly greeting = signal('Hello World');</span>
                        <span hlmCodeBlockLine variant="highlighted">   readonly version = 22;</span>
                        <span hlmCodeBlockLine>&#125;</span>
                    </pre>
                </hlm-code-block>
            </div>
        `,
    }),
};

export const Destructive: Story = {
    render: () => ({
        props: {
            error: `TypeError: Cannot read properties of undefined (reading 'subscribe')\n    at UserProfileComponent.ngOnInit (app/user-profile.ts:24:12)\n    at callHook (core.mjs:16305:18)`,
        },
        template: `
            <div class="max-w-md p-4">
                <hlm-code-block variant="destructive">
                    <hlm-code-block-header>
                        <hlm-code-block-title>Runtime Error (500)</hlm-code-block-title>
                        <hlm-code-block-actions>
                            <button hlmCodeBlockCopyButton [value]="error"></button>
                        </hlm-code-block-actions>
                    </hlm-code-block-header>
                    <pre hlmCodeBlockContent [code]="error" wrap></pre>
                </hlm-code-block>
            </div>
        `,
    }),
};
