import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideChevronRight } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmItemImports } from '../index';

interface ItemStoryArgs {
    title: string;
    description: string;
    variant: 'default' | 'outline' | 'muted';
    size: 'default' | 'sm' | 'xs';
}

const meta: Meta<ItemStoryArgs> = {
    title: 'Primitives/Item',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmItemImports, HlmButton, NgIcon],
            providers: [provideIcons({ lucideBadgeCheck, lucideChevronRight })],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline', 'muted'],
            description: 'The visual variant of the item.',
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'xs'],
            description: 'The size of the item.',
        },
        title: {
            control: 'text',
            description: 'The title of the item.',
        },
        description: {
            control: 'text',
            description: 'The description of the item.',
        },
    },
    args: {
        variant: 'outline',
        size: 'default',
        title: 'Project Setup Complete',
        description: 'All workspace packages and dependencies have been initialized.',
    },
};

export default meta;
type Story = StoryObj<ItemStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="max-w-md w-full">
                <hlm-item [variant]="variant" [size]="size">
                    <hlm-item-content>
                        <hlm-item-title>{{ title }}</hlm-item-title>
                        <p hlmItemDescription>{{ description }}</p>
                    </hlm-item-content>
                    <hlm-item-actions>
                        <button hlmBtn variant="outline" size="sm">Details</button>
                    </hlm-item-actions>
                </hlm-item>
            </div>
        `,
    }),
};

export const WithIconMedia: Story = {
    render: () => ({
        template: `
            <div class="max-w-md w-full">
                <a hlmItem href="#" variant="outline">
                    <hlm-item-media>
                        <ng-icon name="lucideBadgeCheck" class="text-primary text-xl" />
                    </hlm-item-media>
                    <hlm-item-content>
                        <hlm-item-title>Your profile has been verified</hlm-item-title>
                        <p hlmItemDescription>Access enterprise dashboard features now.</p>
                    </hlm-item-content>
                    <hlm-item-actions>
                        <ng-icon name="lucideChevronRight" class="text-muted-foreground" />
                    </hlm-item-actions>
                </a>
            </div>
        `,
    }),
};

export const ItemGroup: Story = {
    render: () => ({
        template: `
            <div class="max-w-md w-full">
                <hlm-item-group>
                    <hlm-item variant="outline">
                        <hlm-item-content>
                            <hlm-item-title>First Task</hlm-item-title>
                            <p hlmItemDescription>Configure database and authentication.</p>
                        </hlm-item-content>
                        <hlm-item-actions>
                            <button hlmBtn size="sm">Start</button>
                        </hlm-item-actions>
                    </hlm-item>
                    <hlm-item-separator />
                    <hlm-item variant="outline">
                        <hlm-item-content>
                            <hlm-item-title>Second Task</hlm-item-title>
                            <p hlmItemDescription>Scaffold UI component library and tests.</p>
                        </hlm-item-content>
                        <hlm-item-actions>
                            <button hlmBtn variant="outline" size="sm">Pending</button>
                        </hlm-item-actions>
                    </hlm-item>
                </hlm-item-group>
            </div>
        `,
    }),
};
