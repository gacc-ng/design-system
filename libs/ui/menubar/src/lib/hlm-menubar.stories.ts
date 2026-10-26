import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmDropdownMenuImports } from '@gacc-ng/ui/dropdown-menu';

import { HlmMenubar, HlmMenubarImports } from '../index';

@Component({
    selector: 'gacc-menubar-demo',
    standalone: true,
    imports: [HlmMenubarImports, HlmDropdownMenuImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div hlmMenubar class="w-fit">
            <button [hlmMenubarTrigger]="fileMenu" hlmMenubarTrigger>File</button>
            <button [hlmMenubarTrigger]="editMenu" hlmMenubarTrigger>Edit</button>
            <button [hlmMenubarTrigger]="viewMenu" hlmMenubarTrigger>View</button>
            <button [hlmMenubarTrigger]="profilesMenu" hlmMenubarTrigger>Profiles</button>
        </div>

        <ng-template #fileMenu>
            <hlm-dropdown-menu class="w-56">
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuItem>
                        New Tab
                        <hlm-dropdown-menu-shortcut>⌘T</hlm-dropdown-menu-shortcut>
                    </button>
                    <button hlmDropdownMenuItem>
                        New Window
                        <hlm-dropdown-menu-shortcut>⌘N</hlm-dropdown-menu-shortcut>
                    </button>
                    <button hlmDropdownMenuItem disabled>New Incognito Window</button>
                </hlm-dropdown-menu-group>
                <hlm-dropdown-menu-separator />
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuItem>Print...</button>
                </hlm-dropdown-menu-group>
            </hlm-dropdown-menu>
        </ng-template>

        <ng-template #editMenu>
            <hlm-dropdown-menu class="w-48">
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuItem>
                        Undo
                        <hlm-dropdown-menu-shortcut>⌘Z</hlm-dropdown-menu-shortcut>
                    </button>
                    <button hlmDropdownMenuItem>
                        Redo
                        <hlm-dropdown-menu-shortcut>⇧⌘Z</hlm-dropdown-menu-shortcut>
                    </button>
                </hlm-dropdown-menu-group>
                <hlm-dropdown-menu-separator />
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuItem>Cut</button>
                    <button hlmDropdownMenuItem>Copy</button>
                    <button hlmDropdownMenuItem>Paste</button>
                </hlm-dropdown-menu-group>
            </hlm-dropdown-menu>
        </ng-template>

        <ng-template #viewMenu>
            <hlm-dropdown-menu class="w-56">
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuCheckbox checked>
                        Always Show Bookmarks Bar
                        <hlm-dropdown-menu-checkbox-indicator />
                    </button>
                    <button hlmDropdownMenuCheckbox>
                        Always Show Full URLs
                        <hlm-dropdown-menu-checkbox-indicator />
                    </button>
                </hlm-dropdown-menu-group>
                <hlm-dropdown-menu-separator />
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuItem>Reload</button>
                    <button hlmDropdownMenuItem>Force Reload</button>
                </hlm-dropdown-menu-group>
            </hlm-dropdown-menu>
        </ng-template>

        <ng-template #profilesMenu>
            <hlm-dropdown-menu class="w-48">
                <hlm-dropdown-menu-group>
                    <hlm-dropdown-menu-label>Profiles</hlm-dropdown-menu-label>
                    <button hlmDropdownMenuRadio checked>
                        <hlm-dropdown-menu-radio-indicator />
                        Work
                    </button>
                    <button hlmDropdownMenuRadio>
                        <hlm-dropdown-menu-radio-indicator />
                        Personal
                    </button>
                </hlm-dropdown-menu-group>
            </hlm-dropdown-menu>
        </ng-template>
    `,
})
class MenubarDemoComponent {}

const meta: Meta = {
    title: 'Overlays/Menubar',
    component: HlmMenubar,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [MenubarDemoComponent],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: '<gacc-menubar-demo />',
    }),
};
