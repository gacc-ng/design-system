import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideLoader2, lucideMail } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { type ButtonVariants, HlmButton } from './hlm-button';

interface ButtonStoryArgs {
    variant: NonNullable<ButtonVariants['variant']>;
    size: NonNullable<ButtonVariants['size']>;
    disabled: boolean;
    text: string;
    clicked?: (event: MouseEvent) => void;
}

const meta: Meta<ButtonStoryArgs> = {
    title: 'Primitives/Button',
    component: HlmButton,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmButton, NgIcon],
            providers: [provideIcons({ lucideLoader2, lucideMail, lucideChevronRight })],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            description: 'The visual style variant of the button.',
            table: {
                category: 'Inputs',
                type: { summary: 'ButtonVariants["variant"]' },
                defaultValue: { summary: "'default'" },
            },
        },
        size: {
            control: 'select',
            options: ['default', 'xs', 'sm', 'lg', 'icon'],
            description: 'The size dimension of the button.',
            table: {
                category: 'Inputs',
                type: { summary: 'ButtonVariants["size"]' },
                defaultValue: { summary: "'default'" },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the button is interactively disabled.',
            table: {
                category: 'Inputs',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        text: {
            control: 'text',
            description: 'The projected label content displayed inside the button.',
            table: {
                category: 'Slots',
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Button'" },
            },
        },
        clicked: {
            action: 'clicked',
            description: 'Native DOM click event emitted when the user activates the button.',
            table: {
                category: 'Events',
                type: { summary: 'MouseEvent' },
            },
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
        template: `
            <button hlmBtn [variant]="variant" [size]="size" [disabled]="disabled" (click)="clicked?.($event)">
                {{ text }}
            </button>
        `,
    }),
};

export const AllVariants: Story = {
    render: () => ({
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
        template: `
            <div class="flex flex-wrap items-center gap-3">
                <button hlmBtn size="xs">Extra Small</button>
                <button hlmBtn size="sm">Small</button>
                <button hlmBtn size="default">Default</button>
                <button hlmBtn size="lg">Large</button>
                <button hlmBtn size="icon" aria-label="Mail icon">
                    <ng-icon name="lucideMail" class="size-4" />
                </button>
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
        template: `
            <button hlmBtn [variant]="variant" [size]="size" [disabled]="disabled">
                {{ text }}
            </button>
        `,
    }),
};

export const Loading: Story = {
    render: () => ({
        template: `
            <button hlmBtn disabled aria-busy="true">
                <ng-icon name="lucideLoader2" class="size-4 animate-spin mr-2" />
                Please wait
            </button>
        `,
    }),
};

export const WithIcon: Story = {
    render: () => ({
        template: `
            <div class="flex flex-wrap items-center gap-3">
                <button hlmBtn variant="default">
                    <ng-icon name="lucideMail" class="size-4 mr-2" />
                    Login with Email
                </button>
                <button hlmBtn variant="secondary">
                    Next step
                    <ng-icon name="lucideChevronRight" class="size-4 ml-2" />
                </button>
                <button hlmBtn variant="outline" size="icon" aria-label="Send email">
                    <ng-icon name="lucideMail" class="size-4" />
                </button>
            </div>
        `,
    }),
};
