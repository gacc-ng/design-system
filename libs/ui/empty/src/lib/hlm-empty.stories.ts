import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight, lucideFolderCode, lucideSearch } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmEmptyImports } from '../index';

interface EmptyStoryArgs {
    title: string;
    description: string;
}

const meta: Meta<EmptyStoryArgs> = {
    title: 'Layout/Empty',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmEmptyImports, HlmButton, NgIcon],
            providers: [provideIcons({ lucideFolderCode, lucideArrowUpRight, lucideSearch })],
        }),
    ],
    argTypes: {
        title: {
            control: 'text',
            description: 'Title text for the empty state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: "'No Projects Yet'" },
            },
        },
        description: {
            control: 'text',
            description: 'Supporting description explaining the empty state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: "'You have not created any projects yet.'" },
            },
        },
    },
    args: {
        title: 'No Projects Yet',
        description: "You haven't created any projects yet. Get started by creating your first project.",
    },
};

export default meta;
type Story = StoryObj<EmptyStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-empty class="max-w-md mx-auto">
                <hlm-empty-header>
                    <hlm-empty-media variant="icon">
                        <ng-icon name="lucideFolderCode" />
                    </hlm-empty-media>
                    <div hlmEmptyTitle>{{ title }}</div>
                    <div hlmEmptyDescription>{{ description }}</div>
                </hlm-empty-header>
                <hlm-empty-content class="flex-row justify-center gap-2">
                    <button hlmBtn>Create Project</button>
                    <button hlmBtn variant="outline">Import Project</button>
                </hlm-empty-content>
            </hlm-empty>
        `,
    }),
};

export const SearchNotFound: Story = {
    render: () => ({
        template: `
            <hlm-empty class="max-w-md mx-auto">
                <hlm-empty-header>
                    <hlm-empty-media variant="icon">
                        <ng-icon name="lucideSearch" />
                    </hlm-empty-media>
                    <div hlmEmptyTitle>No Results Found</div>
                    <div hlmEmptyDescription>We couldn't find any items matching your search criteria.</div>
                </hlm-empty-header>
                <hlm-empty-content>
                    <button hlmBtn variant="outline" size="sm">Clear Filters</button>
                </hlm-empty-content>
            </hlm-empty>
        `,
    }),
};

export const Minimal: Story = {
    render: () => ({
        template: `
            <hlm-empty class="max-w-sm mx-auto">
                <hlm-empty-header>
                    <div hlmEmptyTitle>No Notifications</div>
                    <div hlmEmptyDescription>You are all caught up!</div>
                </hlm-empty-header>
            </hlm-empty>
        `,
    }),
};
