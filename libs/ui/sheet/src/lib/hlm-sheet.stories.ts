import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmButton } from '@gacc-ng/ui/button';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmSheetImports } from '../index';

const meta: Meta = {
    title: 'Primitives/Sheet',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSheetImports, HlmButton, HlmInput, HlmLabel],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-sheet>
                    <button hlmBtn hlmSheetTrigger variant="outline">Open Sheet (Right)</button>
                    <hlm-sheet-content *hlmSheetPortal="let ctx" side="right">
                        <hlm-sheet-header>
                            <h3 hlmSheetTitle>Edit Profile</h3>
                            <p hlmSheetDescription>Make changes to your profile here. Click save when you're done.</p>
                        </hlm-sheet-header>
                        <div class="space-y-4 py-4">
                            <div class="space-y-1.5">
                                <label hlmLabel for="sheet-name">Name</label>
                                <input hlmInput id="sheet-name" value="Gustavo Caqui" />
                            </div>
                            <div class="space-y-1.5">
                                <label hlmLabel for="sheet-username">Username</label>
                                <input hlmInput id="sheet-username" value="@gcaqui" />
                            </div>
                        </div>
                        <hlm-sheet-footer>
                            <button hlmBtn hlmSheetClose variant="outline">Cancel</button>
                            <button hlmBtn>Save changes</button>
                        </hlm-sheet-footer>
                    </hlm-sheet-content>
                </hlm-sheet>
            </div>
        `,
    }),
};

export const LeftSide: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-sheet>
                    <button hlmBtn hlmSheetTrigger variant="outline">Open Navigation (Left)</button>
                    <hlm-sheet-content *hlmSheetPortal="let ctx" side="left">
                        <hlm-sheet-header>
                            <h3 hlmSheetTitle>Navigation Menu</h3>
                            <p hlmSheetDescription>Access workspace projects and settings.</p>
                        </hlm-sheet-header>
                        <div class="flex flex-col gap-2 py-4 text-sm">
                            <a href="#" class="rounded-md px-3 py-2 hover:bg-muted font-medium">Dashboard</a>
                            <a href="#" class="rounded-md px-3 py-2 hover:bg-muted font-medium">Design Tokens</a>
                            <a href="#" class="rounded-md px-3 py-2 hover:bg-muted font-medium">Components</a>
                            <a href="#" class="rounded-md px-3 py-2 hover:bg-muted font-medium">Settings</a>
                        </div>
                        <hlm-sheet-footer>
                            <button hlmBtn hlmSheetClose variant="ghost" class="w-full">Close Menu</button>
                        </hlm-sheet-footer>
                    </hlm-sheet-content>
                </hlm-sheet>
            </div>
        `,
    }),
};
