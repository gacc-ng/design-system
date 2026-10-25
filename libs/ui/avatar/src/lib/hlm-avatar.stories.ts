import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmAvatar } from './hlm-avatar';
import { HlmAvatarBadge } from './hlm-avatar-badge';
import { HlmAvatarFallback } from './hlm-avatar-fallback';
import { HlmAvatarGroup } from './hlm-avatar-group';
import { HlmAvatarGroupCount } from './hlm-avatar-group-count';
import { HlmAvatarImage } from './hlm-avatar-image';

interface AvatarStoryArgs {
    size: 'default' | 'sm' | 'lg';
}

const meta: Meta<AvatarStoryArgs> = {
    title: 'Primitives/Avatar',
    component: HlmAvatar,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                HlmAvatar,
                HlmAvatarImage,
                HlmAvatarFallback,
                HlmAvatarBadge,
                HlmAvatarGroup,
                HlmAvatarGroupCount,
            ],
        }),
    ],
    argTypes: {
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg'],
            description: 'The size dimension scale of the avatar component.',
            table: {
                category: 'Inputs',
                type: { summary: "'default' | 'sm' | 'lg'" },
                defaultValue: { summary: "'default'" },
            },
        },
    },
    args: {
        size: 'default',
    },
};

export default meta;
type Story = StoryObj<AvatarStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-avatar [size]="size">
                <img
                    hlmAvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="User profile avatar"
                />
                <span hlmAvatarFallback>GC</span>
            </hlm-avatar>
        `,
    }),
};

export const AllSizes: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-4">
                <hlm-avatar size="sm">
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar small" />
                    <span hlmAvatarFallback>SM</span>
                </hlm-avatar>
                <hlm-avatar size="default">
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar default" />
                    <span hlmAvatarFallback>MD</span>
                </hlm-avatar>
                <hlm-avatar size="lg">
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar large" />
                    <span hlmAvatarFallback>LG</span>
                </hlm-avatar>
            </div>
        `,
    }),
};

export const FallbackOnly: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-4">
                <hlm-avatar>
                    <span hlmAvatarFallback>AG</span>
                </hlm-avatar>
                <hlm-avatar>
                    <span hlmAvatarFallback class="bg-primary text-primary-foreground">SP</span>
                </hlm-avatar>
                <hlm-avatar>
                    <span hlmAvatarFallback class="bg-muted text-muted-foreground">CN</span>
                </hlm-avatar>
            </div>
        `,
    }),
};

export const WithBadge: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-4">
                <hlm-avatar size="sm">
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" />
                    <span hlmAvatarFallback>SM</span>
                    <span hlmAvatarBadge class="bg-emerald-500"></span>
                </hlm-avatar>
                <hlm-avatar size="default">
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" />
                    <span hlmAvatarFallback>GC</span>
                    <span hlmAvatarBadge class="bg-amber-500"></span>
                </hlm-avatar>
                <hlm-avatar size="lg">
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" />
                    <span hlmAvatarFallback>LG</span>
                    <span hlmAvatarBadge class="bg-rose-500"></span>
                </hlm-avatar>
            </div>
        `,
    }),
};

export const AvatarGroup: Story = {
    render: () => ({
        template: `
            <div hlmAvatarGroup>
                <hlm-avatar>
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="User 1" />
                    <span hlmAvatarFallback>U1</span>
                </hlm-avatar>
                <hlm-avatar>
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" alt="User 2" />
                    <span hlmAvatarFallback>U2</span>
                </hlm-avatar>
                <hlm-avatar>
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="User 3" />
                    <span hlmAvatarFallback>U3</span>
                </hlm-avatar>
                <span hlmAvatarGroupCount>+4</span>
            </div>
        `,
    }),
};
