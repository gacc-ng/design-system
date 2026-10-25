import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideCog, lucideSmile, lucideUser, lucideWallet } from '@ng-icons/lucide';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { HlmCommandImports } from '../index';

const meta: Meta = {
    title: 'UI/Command',
    decorators: [
        moduleMetadata({
            imports: [HlmCommandImports, NgIcon],
            providers: [
                provideIcons({
                    lucideCalendar,
                    lucideSmile,
                    lucideUser,
                    lucideWallet,
                    lucideCog,
                }),
            ],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 max-w-md mx-auto">
                <div class="rounded-xl border shadow-md">
                    <hlm-command>
                        <hlm-command-input placeholder="Type a command or search..." />
                        <hlm-command-list>
                            <div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
                            <hlm-command-group>
                                <hlm-command-group-label>Suggestions</hlm-command-group-label>
                                <button hlmCommandItem value="calendar">
                                    <ng-icon name="lucideCalendar" class="mr-2 size-4" />
                                    <span>Calendar</span>
                                </button>
                                <button hlmCommandItem value="emoji">
                                    <ng-icon name="lucideSmile" class="mr-2 size-4" />
                                    <span>Search Emoji</span>
                                </button>
                            </hlm-command-group>
                            <hlm-command-separator />
                            <hlm-command-group>
                                <hlm-command-group-label>Settings</hlm-command-group-label>
                                <button hlmCommandItem value="profile">
                                    <ng-icon name="lucideUser" class="mr-2 size-4" />
                                    <span>Profile</span>
                                    <hlm-command-shortcut>⌘P</hlm-command-shortcut>
                                </button>
                                <button hlmCommandItem value="billing">
                                    <ng-icon name="lucideWallet" class="mr-2 size-4" />
                                    <span>Billing</span>
                                    <hlm-command-shortcut>⌘B</hlm-command-shortcut>
                                </button>
                                <button hlmCommandItem value="settings">
                                    <ng-icon name="lucideCog" class="mr-2 size-4" />
                                    <span>Settings</span>
                                    <hlm-command-shortcut>⌘S</hlm-command-shortcut>
                                </button>
                            </hlm-command-group>
                        </hlm-command-list>
                    </hlm-command>
                </div>
            </div>
        `,
    }),
};
