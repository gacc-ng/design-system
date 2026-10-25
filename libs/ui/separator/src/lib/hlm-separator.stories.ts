import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmSeparator } from './hlm-separator';

interface SeparatorStoryArgs {
    orientation: 'horizontal' | 'vertical';
    decorative: boolean;
}

const meta: Meta<SeparatorStoryArgs> = {
    title: 'Primitives/Separator',
    component: HlmSeparator,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSeparator],
        }),
    ],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'The orientation dimension of the separator divider.',
            table: {
                type: { summary: "'horizontal' | 'vertical'" },
                defaultValue: { summary: "'horizontal'" },
            },
        },
        decorative: {
            control: 'boolean',
            description: 'Whether the separator is purely decorative without semantic role.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
    },
    args: {
        orientation: 'horizontal',
        decorative: true,
    },
};

export default meta;
type Story = StoryObj<SeparatorStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="w-80 space-y-4">
                <div>
                    <h4 class="text-sm font-semibold leading-none">Spartan NG</h4>
                    <p class="text-xs text-muted-foreground mt-1">An accessible UI primitives library for Angular.</p>
                </div>
                <hlm-separator [orientation]="orientation" [decorative]="decorative" />
                <div class="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Docs</span>
                    <hlm-separator orientation="vertical" class="h-4" />
                    <span>Source</span>
                    <hlm-separator orientation="vertical" class="h-4" />
                    <span>Releases</span>
                </div>
            </div>
        `,
    }),
};

export const Vertical: Story = {
    render: () => ({
        template: `
            <div class="flex h-6 items-center space-x-4 text-sm">
                <span>Blog</span>
                <hlm-separator orientation="vertical" />
                <span>Docs</span>
                <hlm-separator orientation="vertical" />
                <span>Components</span>
            </div>
        `,
    }),
};

export const WithText: Story = {
    render: () => ({
        template: `
            <div class="relative w-80">
                <div class="absolute inset-0 flex items-center">
                    <hlm-separator />
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
        `,
    }),
};
