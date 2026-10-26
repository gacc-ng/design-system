import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideCog, lucideSmile, lucideUser, lucideWallet } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmCommandImports } from '../index';

import { HlmCommand } from './hlm-command';

interface CommandStoryArgs {
    placeholder: string;
}

const meta: Meta<CommandStoryArgs> = {
    title: 'Primitives/Command',
    component: HlmCommand,
    tags: ['autodocs'],
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
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Placeholder string for the search command input.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: "'Type a command or search...'" },
            },
        },
    },
    args: {
        placeholder: 'Type a command or search...',
    },
};

export default meta;
type Story = StoryObj<CommandStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 max-w-md mx-auto">
                <div class="rounded-xl border shadow-md">
                    <hlm-command>
                        <hlm-command-input [placeholder]="placeholder" />
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

export const EmptyState: Story = {
    render: () => ({
        template: `
            <div class="p-8 max-w-md mx-auto">
                <div class="rounded-xl border shadow-md">
                    <hlm-command>
                        <hlm-command-input value="nonexistent-query" placeholder="Type a command or search..." />
                        <hlm-command-list>
                            <div hlmCommandEmpty class="py-6 text-center text-sm text-muted-foreground">
                                No matching commands or shortcuts found.
                            </div>
                        </hlm-command-list>
                    </hlm-command>
                </div>
            </div>
        `,
    }),
};
