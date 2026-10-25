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
            description: 'Size of the avatar component',
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

export const FallbackOnly: Story = {
    render: () => ({
        template: `
            <hlm-avatar>
                <span hlmAvatarFallback>AG</span>
            </hlm-avatar>
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
                    <span hlmAvatarFallback>DF</span>
                    <span hlmAvatarBadge class="bg-emerald-500"></span>
                </hlm-avatar>
                <hlm-avatar size="lg">
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Avatar" />
                    <span hlmAvatarFallback>LG</span>
                    <span hlmAvatarBadge class="bg-emerald-500"></span>
                </hlm-avatar>
            </div>
        `,
    }),
};

export const Sizes: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-4">
                <hlm-avatar size="sm">
                    <span hlmAvatarFallback>SM</span>
                </hlm-avatar>
                <hlm-avatar size="default">
                    <span hlmAvatarFallback>DF</span>
                </hlm-avatar>
                <hlm-avatar size="lg">
                    <span hlmAvatarFallback>LG</span>
                </hlm-avatar>
            </div>
        `,
    }),
};

export const AvatarGroup: Story = {
    render: () => ({
        template: `
            <hlm-avatar-group>
                <hlm-avatar>
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80" alt="User 1" />
                    <span hlmAvatarFallback>U1</span>
                </hlm-avatar>
                <hlm-avatar>
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" alt="User 2" />
                    <span hlmAvatarFallback>U2</span>
                </hlm-avatar>
                <hlm-avatar>
                    <img hlmAvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="User 3" />
                    <span hlmAvatarFallback>U3</span>
                </hlm-avatar>
                <span hlmAvatarGroupCount>+4</span>
            </hlm-avatar-group>
        `,
    }),
};
