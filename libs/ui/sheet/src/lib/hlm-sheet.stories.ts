import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmSheetImports } from '../index';

import { HlmSheet } from './hlm-sheet';

interface SheetStoryArgs {
    side: 'top' | 'bottom' | 'left' | 'right';
}

const meta: Meta<SheetStoryArgs> = {
    title: 'Primitives/Sheet',
    component: HlmSheet,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSheetImports, HlmButton, HlmInput, HlmLabel],
        }),
    ],
    argTypes: {
        side: {
            control: 'inline-radio',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'The edge of the viewport where the sheet slides in from.',
            table: {
                type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
                defaultValue: { summary: "'right'" },
            },
        },
    },
    args: {
        side: 'right',
    },
};

export default meta;
type Story = StoryObj<SheetStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 flex justify-center">
                <hlm-sheet>
                    <button hlmBtn hlmSheetTrigger variant="outline">Open Sheet ({{ side }})</button>
                    <hlm-sheet-content *hlmSheetPortal="let ctx" [side]="side">
                        <hlm-sheet-header>
                            <h3 hlmSheetTitle>Edit Profile</h3>
                            <p hlmSheetDescription>Make changes to your profile here. Click save when you are done.</p>
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
                            <p hlmSheetDescription>Browse design system documentation and component specs.</p>
                        </hlm-sheet-header>
                        <div class="flex flex-col gap-2 py-4">
                            <a href="#" class="px-3 py-2 rounded-lg hover:bg-muted font-medium text-sm">Getting Started</a>
                            <a href="#" class="px-3 py-2 rounded-lg hover:bg-muted font-medium text-sm">Architecture RFCs</a>
                            <a href="#" class="px-3 py-2 rounded-lg hover:bg-muted font-medium text-sm">Components Matrix</a>
                            <a href="#" class="px-3 py-2 rounded-lg hover:bg-muted font-medium text-sm">Accessibility Gates</a>
                        </div>
                    </hlm-sheet-content>
                </hlm-sheet>
            </div>
        `,
    }),
};

export const AllSides: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex flex-wrap justify-center gap-4">
                <hlm-sheet>
                    <button hlmBtn hlmSheetTrigger variant="outline">Top Sheet</button>
                    <hlm-sheet-content *hlmSheetPortal="let ctx" side="top">
                        <h4 class="font-semibold text-sm">Top Notification Banner</h4>
                    </hlm-sheet-content>
                </hlm-sheet>
                <hlm-sheet>
                    <button hlmBtn hlmSheetTrigger variant="outline">Right Sheet</button>
                    <hlm-sheet-content *hlmSheetPortal="let ctx" side="right">
                        <h4 class="font-semibold text-sm">Right Drawer</h4>
                    </hlm-sheet-content>
                </hlm-sheet>
                <hlm-sheet>
                    <button hlmBtn hlmSheetTrigger variant="outline">Bottom Sheet</button>
                    <hlm-sheet-content *hlmSheetPortal="let ctx" side="bottom">
                        <h4 class="font-semibold text-sm">Bottom Action Panel</h4>
                    </hlm-sheet-content>
                </hlm-sheet>
                <hlm-sheet>
                    <button hlmBtn hlmSheetTrigger variant="outline">Left Sheet</button>
                    <hlm-sheet-content *hlmSheetPortal="let ctx" side="left">
                        <h4 class="font-semibold text-sm">Left Sidebar</h4>
                    </hlm-sheet-content>
                </hlm-sheet>
            </div>
        `,
    }),
};
