import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy, lucideSearch } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButtonGroupImports } from '@gacc-ng/ui/button-group';

import { HlmInputGroupImports } from '../index';

import { HlmInputGroup } from './hlm-input-group';

const meta: Meta<HlmInputGroup> = {
    title: 'Forms/Input Group',
    component: HlmInputGroup,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmInputGroupImports, HlmButtonGroupImports, NgIcon],
            providers: [provideIcons({ lucideSearch, lucideCopy, lucideCheck })],
        }),
    ],
};

export default meta;
type Story = StoryObj<HlmInputGroup>;

export const Default: Story = {
    render: () => ({
        template: `
            <div hlmInputGroup class="max-w-sm">
                <div hlmInputGroupAddon align="inline-start">
                    <ng-icon name="lucideSearch" />
                </div>
                <input hlmInputGroupInput placeholder="Search components..." />
            </div>
        `,
    }),
};

export const WithTextAddon: Story = {
    render: () => ({
        template: `
            <div hlmInputGroup class="max-w-sm">
                <span hlmInputGroupText>https://</span>
                <input hlmInputGroupInput placeholder="example.com" />
                <div hlmInputGroupAddon align="inline-end">
                    <span hlmInputGroupText>.org</span>
                </div>
            </div>
        `,
    }),
};

export const WithActionButton: Story = {
    render: () => ({
        template: `
            <div hlmInputGroup class="max-w-sm">
                <input hlmInputGroupInput placeholder="Copy referral code..." value="SPARTAN-2026" readonly />
                <div hlmInputGroupAddon align="inline-end">
                    <button hlmInputGroupButton size="xs" aria-label="Copy code">
                        <ng-icon name="lucideCopy" />
                        Copy
                    </button>
                </div>
            </div>
        `,
    }),
};

export const WithTextarea: Story = {
    render: () => ({
        template: `
            <div hlmInputGroup class="max-w-md">
                <textarea hlmInputGroupTextarea placeholder="Type your comment here..." rows="3"></textarea>
                <div hlmInputGroupAddon align="block-end" class="border-t border-border flex justify-between">
                    <span hlmInputGroupText class="text-xs">Max 280 characters</span>
                    <button hlmInputGroupButton size="xs" variant="default">Post</button>
                </div>
            </div>
        `,
    }),
};
