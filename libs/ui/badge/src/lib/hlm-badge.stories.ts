import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideSparkles } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { type BadgeVariants, HlmBadge } from './hlm-badge';

interface BadgeStoryArgs {
    variant: NonNullable<BadgeVariants['variant']>;
    text: string;
}

const meta: Meta<BadgeStoryArgs> = {
    title: 'Primitives/Badge',
    component: HlmBadge,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmBadge, NgIcon],
            providers: [provideIcons({ lucideCheck, lucideSparkles })],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
            description: 'The visual style variant of the badge.',
            table: {
                type: { summary: 'BadgeVariants["variant"]' },
                defaultValue: { summary: "'default'" },
            },
        },
        text: {
            control: 'text',
            description: 'The projected label content inside the badge.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Badge'" },
            },
        },
    },
    args: {
        variant: 'default',
        text: 'Badge',
    },
};

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <span hlmBadge [variant]="variant">
                {{ text }}
            </span>
        `,
    }),
};

export const AllVariants: Story = {
    render: () => ({
        template: `
            <div class="flex flex-wrap items-center gap-3">
                <span hlmBadge variant="default">Default</span>
                <span hlmBadge variant="secondary">Secondary</span>
                <span hlmBadge variant="outline">Outline</span>
                <span hlmBadge variant="destructive">Destructive</span>
                <span hlmBadge variant="ghost">Ghost</span>
                <span hlmBadge variant="link">Link</span>
            </div>
        `,
    }),
};

export const WithIcon: Story = {
    render: () => ({
        template: `
            <div class="flex flex-wrap items-center gap-3">
                <span hlmBadge variant="default">
                    <ng-icon name="lucideSparkles" class="size-3.5 mr-1" />
                    Featured
                </span>
                <span hlmBadge variant="secondary">
                    <ng-icon name="lucideCheck" class="size-3.5 mr-1" />
                    Verified
                </span>
                <span hlmBadge variant="outline">
                    <ng-icon name="lucideSparkles" class="size-3.5 mr-1 text-primary" />
                    Pro
                </span>
            </div>
        `,
    }),
};

export const Pill: Story = {
    render: () => ({
        template: `
            <div class="flex flex-wrap items-center gap-3">
                <span hlmBadge variant="default" class="rounded-full px-3">Active</span>
                <span hlmBadge variant="secondary" class="rounded-full px-3">Pending</span>
                <span hlmBadge variant="outline" class="rounded-full px-3">Draft</span>
            </div>
        `,
    }),
};
