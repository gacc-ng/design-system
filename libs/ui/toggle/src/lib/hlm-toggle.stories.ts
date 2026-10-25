import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBold, lucideItalic, lucideUnderline } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmToggle } from './hlm-toggle';

interface ToggleStoryArgs {
    variant: 'default' | 'outline';
    size: 'default' | 'sm' | 'lg';
    disabled: boolean;
}

const meta: Meta<ToggleStoryArgs> = {
    title: 'Primitives/Toggle',
    component: HlmToggle,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmToggle, NgIcon],
            providers: [provideIcons({ lucideBold, lucideItalic, lucideUnderline })],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline'],
            description: 'The visual style variant of the toggle button.',
            table: {
                category: 'Inputs',
                type: { summary: "'default' | 'outline'" },
                defaultValue: { summary: "'default'" },
            },
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg'],
            description: 'The size dimension scale of the toggle button.',
            table: {
                category: 'Inputs',
                type: { summary: "'default' | 'sm' | 'lg'" },
                defaultValue: { summary: "'default'" },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the toggle button is interactively disabled.',
            table: {
                category: 'Inputs',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
    args: {
        variant: 'default',
        size: 'default',
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<ToggleStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <button hlmToggle [variant]="variant" [size]="size" [disabled]="disabled" aria-label="Toggle bold">
                <ng-icon name="lucideBold" class="size-4" />
            </button>
        `,
    }),
};

export const AllVariants: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-3">
                <button hlmToggle variant="default" aria-label="Default toggle">
                    <ng-icon name="lucideBold" class="size-4" />
                </button>
                <button hlmToggle variant="outline" aria-label="Outline toggle">
                    <ng-icon name="lucideItalic" class="size-4" />
                </button>
            </div>
        `,
    }),
};

export const AllSizes: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-3">
                <button hlmToggle size="sm" aria-label="Small toggle">
                    <ng-icon name="lucideBold" class="size-3.5" />
                </button>
                <button hlmToggle size="default" aria-label="Default toggle">
                    <ng-icon name="lucideBold" class="size-4" />
                </button>
                <button hlmToggle size="lg" aria-label="Large toggle">
                    <ng-icon name="lucideBold" class="size-5" />
                </button>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-3">
                <button hlmToggle [disabled]="true" aria-label="Disabled toggle">
                    <ng-icon name="lucideBold" class="size-4" />
                </button>
                <button hlmToggle variant="outline" [disabled]="true" aria-label="Disabled outline toggle">
                    <ng-icon name="lucideItalic" class="size-4" />
                </button>
            </div>
        `,
    }),
};

export const WithIcon: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-2 rounded-lg border border-border p-1 bg-background">
                <button hlmToggle variant="default" size="sm" aria-label="Toggle bold">
                    <ng-icon name="lucideBold" class="size-4" />
                </button>
                <button hlmToggle variant="default" size="sm" aria-label="Toggle italic">
                    <ng-icon name="lucideItalic" class="size-4" />
                </button>
                <button hlmToggle variant="default" size="sm" aria-label="Toggle underline">
                    <ng-icon name="lucideUnderline" class="size-4" />
                </button>
            </div>
        `,
    }),
};
