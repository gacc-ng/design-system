import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmDropdownMenuImports } from '@gacc-ng/ui/dropdown-menu';

import { HlmContextMenuImports, HlmContextMenuTrigger } from '../index';

@Component({
    selector: 'gacc-context-menu-demo',
    standalone: true,
    imports: [HlmContextMenuImports, HlmDropdownMenuImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            [hlmContextMenuTrigger]="menu"
            class="flex aspect-video w-full max-w-md items-center justify-center rounded-xl border border-dashed text-sm"
        >
            Right click or long press here
        </div>

        <ng-template #menu>
            <hlm-dropdown-menu class="w-64">
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuItem>
                        Back
                        <hlm-dropdown-menu-shortcut>⌘[</hlm-dropdown-menu-shortcut>
                    </button>
                    <button hlmDropdownMenuItem disabled>
                        Forward
                        <hlm-dropdown-menu-shortcut>⌘]</hlm-dropdown-menu-shortcut>
                    </button>
                    <button hlmDropdownMenuItem>
                        Reload
                        <hlm-dropdown-menu-shortcut>⌘R</hlm-dropdown-menu-shortcut>
                    </button>
                    <button hlmDropdownMenuItem [hlmDropdownMenuSubTrigger]="moreTools" align="start" side="right">
                        More Tools
                        <hlm-dropdown-menu-item-sub-indicator />
                    </button>
                </hlm-dropdown-menu-group>
                <hlm-dropdown-menu-separator />
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuCheckbox checked>
                        Show Bookmarks Bar
                        <hlm-dropdown-menu-checkbox-indicator />
                    </button>
                    <button hlmDropdownMenuCheckbox>
                        Show full URLs
                        <hlm-dropdown-menu-checkbox-indicator />
                    </button>
                </hlm-dropdown-menu-group>
                <hlm-dropdown-menu-separator />
                <hlm-dropdown-menu-group>
                    <hlm-dropdown-menu-label>People</hlm-dropdown-menu-label>
                    <button hlmDropdownMenuRadio checked>
                        <hlm-dropdown-menu-radio-indicator />
                        Alex Johnson
                    </button>
                    <button hlmDropdownMenuRadio>
                        <hlm-dropdown-menu-radio-indicator />
                        Sarah Connor
                    </button>
                </hlm-dropdown-menu-group>
            </hlm-dropdown-menu>
        </ng-template>

        <ng-template #moreTools>
            <hlm-dropdown-menu-sub class="w-48">
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuItem>Save Page As...</button>
                    <button hlmDropdownMenuItem>Create Shortcut...</button>
                    <button hlmDropdownMenuItem>Name Window...</button>
                </hlm-dropdown-menu-group>
                <hlm-dropdown-menu-separator />
                <hlm-dropdown-menu-group>
                    <button hlmDropdownMenuItem>Developer Tools</button>
                </hlm-dropdown-menu-group>
            </hlm-dropdown-menu-sub>
        </ng-template>
    `,
})
class ContextMenuDemoComponent {}

const meta: Meta = {
    title: 'Overlays/Context Menu',
    component: HlmContextMenuTrigger,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ContextMenuDemoComponent],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: '<gacc-context-menu-demo />',
    }),
};
