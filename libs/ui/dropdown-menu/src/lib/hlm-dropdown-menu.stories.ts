import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmDropdownMenuImports } from '../index';

import { HlmDropdownMenu } from './hlm-dropdown-menu';

interface DropdownMenuStoryArgs {
    label: string;
}

const meta: Meta<DropdownMenuStoryArgs> = {
    title: 'Primitives/DropdownMenu',
    component: HlmDropdownMenu,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmDropdownMenuImports, HlmButton],
        }),
    ],
    argTypes: {
        label: {
            control: 'text',
            description: 'The heading label for the first dropdown menu section.',
            table: {
                category: 'Slots',
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'My Account'" },
            },
        },
    },
    args: {
        label: 'My Account',
    },
};

export default meta;
type Story = StoryObj<DropdownMenuStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-16 flex justify-center">
                <button type="button" hlmBtn variant="outline" [hlmDropdownMenuTrigger]="menu">
                    Open Actions Menu
                </button>
                <ng-template #menu>
                    <hlm-dropdown-menu class="w-56">
                        <hlm-dropdown-menu-group>
                            <hlm-dropdown-menu-label>{{ label }}</hlm-dropdown-menu-label>
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
                                Team Members
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

export const WithCheckboxItems: Story = {
    render: () => ({
        template: `
            <div class="p-16 flex justify-center">
                <button type="button" hlmBtn variant="outline" [hlmDropdownMenuTrigger]="optionsMenu">
                    View Options
                </button>
                <ng-template #optionsMenu>
                    <hlm-dropdown-menu class="w-56">
                        <hlm-dropdown-menu-group>
                            <hlm-dropdown-menu-label>Appearance</hlm-dropdown-menu-label>
                            <button type="button" hlmDropdownMenuItemCheckbox [checked]="true">
                                Status Bar
                            </button>
                            <button type="button" hlmDropdownMenuItemCheckbox [checked]="false">
                                Activity Bar
                            </button>
                            <button type="button" hlmDropdownMenuItemCheckbox [checked]="true">
                                Panel Dock
                            </button>
                        </hlm-dropdown-menu-group>
                    </hlm-dropdown-menu>
                </ng-template>
            </div>
        `,
    }),
};
