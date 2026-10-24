import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmDropdownMenuImports } from '../index';

const meta: Meta = {
    title: 'Primitives/DropdownMenu',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmDropdownMenuImports, HlmButton],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-16 flex justify-center">
                <button type="button" hlmBtn variant="outline" [hlmDropdownMenuTrigger]="menu">
                    Open Actions Menu
                </button>
                <ng-template #menu>
                    <hlm-dropdown-menu class="w-56">
                        <hlm-dropdown-menu-group>
                            <hlm-dropdown-menu-label>My Account</hlm-dropdown-menu-label>
                            <button type="button" hlmDropdownMenuItem>
                                Profile
                                <hlm-dropdown-menu-shortcut>⇧⌘P</hlm-dropdown-menu-shortcut>
                            </button>
                            <button type="button" hlmDropdownMenuItem>
                                Billing
                                <hlm-dropdown-menu-shortcut>⌘B</hlm-dropdown-menu-shortcut>
                            </button>
                            <button type="button" hlmDropdownMenuItem>
                                Settings
                                <hlm-dropdown-menu-shortcut>⌘S</hlm-dropdown-menu-shortcut>
                            </button>
                        </hlm-dropdown-menu-group>
                        <hlm-dropdown-menu-separator />
                        <hlm-dropdown-menu-group>
                            <button type="button" hlmDropdownMenuItem>
                                Team
                            </button>
                            <button type="button" hlmDropdownMenuItem>
                                Invite Users
                            </button>
                        </hlm-dropdown-menu-group>
                        <hlm-dropdown-menu-separator />
                        <hlm-dropdown-menu-group>
                            <button type="button" hlmDropdownMenuItem variant="destructive">
                                Log out
                                <hlm-dropdown-menu-shortcut>⇧⌘Q</hlm-dropdown-menu-shortcut>
                            </button>
                        </hlm-dropdown-menu-group>
                    </hlm-dropdown-menu>
                </ng-template>
            </div>
        `,
    }),
};

export const WithCheckboxes: Story = {
    render: () => ({
        template: `
            <div class="p-16 flex justify-center">
                <button type="button" hlmBtn variant="outline" [hlmDropdownMenuTrigger]="checkboxMenu">
                    View Options
                </button>
                <ng-template #checkboxMenu>
                    <hlm-dropdown-menu class="w-56">
                        <hlm-dropdown-menu-label>Appearance</hlm-dropdown-menu-label>
                        <hlm-dropdown-menu-separator />
                        <button type="button" hlmDropdownMenuCheckbox [checked]="true">
                            <hlm-dropdown-menu-checkbox-indicator />
                            Status Bar
                        </button>
                        <button type="button" hlmDropdownMenuCheckbox [checked]="true">
                            <hlm-dropdown-menu-checkbox-indicator />
                            Activity Bar
                        </button>
                        <button type="button" hlmDropdownMenuCheckbox [checked]="false">
                            <hlm-dropdown-menu-checkbox-indicator />
                            Mini Map
                        </button>
                    </hlm-dropdown-menu>
                </ng-template>
            </div>
        `,
    }),
};

export const WithRadios: Story = {
    render: () => ({
        template: `
            <div class="p-16 flex justify-center">
                <button type="button" hlmBtn variant="outline" [hlmDropdownMenuTrigger]="radioMenu">
                    Select Theme
                </button>
                <ng-template #radioMenu>
                    <hlm-dropdown-menu class="w-56">
                        <hlm-dropdown-menu-label>Color Theme</hlm-dropdown-menu-label>
                        <hlm-dropdown-menu-separator />
                        <button type="button" hlmDropdownMenuRadio [checked]="true">
                            <hlm-dropdown-menu-radio-indicator />
                            System Default
                        </button>
                        <button type="button" hlmDropdownMenuRadio [checked]="false">
                            <hlm-dropdown-menu-radio-indicator />
                            Light Mode
                        </button>
                        <button type="button" hlmDropdownMenuRadio [checked]="false">
                            <hlm-dropdown-menu-radio-indicator />
                            Dark Mode
                        </button>
                    </hlm-dropdown-menu>
                </ng-template>
            </div>
        `,
    }),
};

export const WithSubmenu: Story = {
    render: () => ({
        template: `
            <div class="p-16 flex justify-center">
                <button type="button" hlmBtn variant="outline" [hlmDropdownMenuTrigger]="mainMenu">
                    More Options
                </button>
                <ng-template #mainMenu>
                    <hlm-dropdown-menu class="w-56">
                        <button type="button" hlmDropdownMenuItem>
                            New Tab
                            <hlm-dropdown-menu-shortcut>⌘T</hlm-dropdown-menu-shortcut>
                        </button>
                        <button type="button" hlmDropdownMenuItem>
                            New Window
                            <hlm-dropdown-menu-shortcut>⌘N</hlm-dropdown-menu-shortcut>
                        </button>
                        <hlm-dropdown-menu-separator />
                        <button type="button" hlmDropdownMenuItem [hlmDropdownMenuSubTrigger]="shareSubmenu">
                            Share
                            <hlm-dropdown-menu-item-sub-indicator class="ml-auto" />
                        </button>
                        <hlm-dropdown-menu-separator />
                        <button type="button" hlmDropdownMenuItem variant="destructive">
                            Close
                        </button>
                    </hlm-dropdown-menu>
                </ng-template>

                <ng-template #shareSubmenu>
                    <hlm-dropdown-menu hlmDropdownMenuSub class="w-48">
                        <button type="button" hlmDropdownMenuItem>Email Link</button>
                        <button type="button" hlmDropdownMenuItem>Messages</button>
                        <button type="button" hlmDropdownMenuItem>Slack</button>
                    </hlm-dropdown-menu>
                </ng-template>
            </div>
        `,
    }),
};
