import type { Meta, StoryObj } from '@storybook/angular';

import { type BadgeVariants, HlmBadge } from './hlm-badge';

interface BadgeStoryArgs {
    variant: NonNullable<BadgeVariants['variant']>;
    text: string;
}

const meta: Meta<BadgeStoryArgs> = {
    title: 'Primitives/Badge',
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
            description: 'The visual style variant of the badge',
        },
        text: {
            control: 'text',
            description: 'The text label content inside the badge',
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
        imports: [HlmBadge],
        template: `
            <span hlmBadge [variant]="variant">
                {{ text }}
            </span>
        `,
    }),
};

export const AllVariants: Story = {
    render: () => ({
        imports: [HlmBadge],
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
