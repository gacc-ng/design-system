import type { Meta, StoryObj } from '@storybook/angular';

import { type ButtonVariants, HlmButton } from './hlm-button';

interface ButtonStoryArgs {
    variant: NonNullable<ButtonVariants['variant']>;
    size: NonNullable<ButtonVariants['size']>;
    disabled: boolean;
    text: string;
}

const meta: Meta<ButtonStoryArgs> = {
    title: 'Primitives/Button',
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            description: 'The visual style variant of the button',
        },
        size: {
            control: 'select',
            options: ['default', 'xs', 'sm', 'lg', 'icon'],
            description: 'The size dimension of the button',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the button is interactively disabled',
        },
        text: {
            control: 'text',
            description: 'The text label content inside the button',
        },
    },
    args: {
        variant: 'default',
        size: 'default',
        disabled: false,
        text: 'Button',
    },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        imports: [HlmButton],
        template: `
            <button hlmBtn [variant]="variant" [size]="size" [disabled]="disabled">
                {{ text }}
            </button>
        `,
    }),
};

export const AllVariants: Story = {
    render: () => ({
        imports: [HlmButton],
        template: `
            <div class="flex flex-wrap items-center gap-3">
                <button hlmBtn variant="default">Default</button>
                <button hlmBtn variant="secondary">Secondary</button>
                <button hlmBtn variant="outline">Outline</button>
                <button hlmBtn variant="destructive">Destructive</button>
                <button hlmBtn variant="ghost">Ghost</button>
                <button hlmBtn variant="link">Link</button>
            </div>
        `,
    }),
};

export const AllSizes: Story = {
    render: () => ({
        imports: [HlmButton],
        template: `
            <div class="flex flex-wrap items-center gap-3">
                <button hlmBtn size="xs">Extra Small</button>
                <button hlmBtn size="sm">Small</button>
                <button hlmBtn size="default">Default</button>
                <button hlmBtn size="lg">Large</button>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    args: {
        disabled: true,
        text: 'Disabled Button',
    },
    render: (args) => ({
        props: args,
        imports: [HlmButton],
        template: `
            <button hlmBtn [variant]="variant" [size]="size" [disabled]="disabled">
                {{ text }}
            </button>
        `,
    }),
};
