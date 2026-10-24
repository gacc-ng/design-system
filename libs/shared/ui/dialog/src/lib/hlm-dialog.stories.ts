import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmButton } from '../../../button/src/hlm-button';
import { HlmInput } from '../../../input/src/hlm-input';
import { HlmLabel } from '../../../label/src/hlm-label';

import { HlmDialogImports } from './hlm-dialog';

const meta: Meta = {
    title: 'Primitives/Dialog',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmDialogImports, HlmButton, HlmInput, HlmLabel],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-dialog>
                    <button hlmBtn hlmDialogTrigger variant="outline">Edit Profile</button>
                    <hlm-dialog-content *hlmDialogPortal="let ctx">
                        <hlm-dialog-header>
                            <h3 hlmDialogTitle>Edit Profile</h3>
                            <p hlmDialogDescription>Make changes to your profile here. Click save when you're done.</p>
                        </hlm-dialog-header>
                        <div class="space-y-4 py-2">
                            <div class="space-y-1.5">
                                <label hlmLabel for="dialog-name">Full Name</label>
                                <input hlmInput id="dialog-name" value="Gustavo Caqui" />
                            </div>
                            <div class="space-y-1.5">
                                <label hlmLabel for="dialog-username">Username</label>
                                <input hlmInput id="dialog-username" value="@gcaqui" />
                            </div>
                        </div>
                        <hlm-dialog-footer>
                            <button hlmBtn variant="outline" hlmDialogClose>Cancel</button>
                            <button hlmBtn>Save changes</button>
                        </hlm-dialog-footer>
                    </hlm-dialog-content>
                </hlm-dialog>
            </div>
        `,
    }),
};

export const CustomContent: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-dialog>
                    <button hlmBtn hlmDialogTrigger variant="default">Share Project</button>
                    <hlm-dialog-content *hlmDialogPortal="let ctx">
                        <hlm-dialog-header>
                            <h3 hlmDialogTitle>Share Design System</h3>
                            <p hlmDialogDescription>Anyone with this link will be able to view and inspect components.</p>
                        </hlm-dialog-header>
                        <div class="flex items-center space-x-2 py-3">
                            <input hlmInput readonly value="https://design.gacc.dev/preview/share/29401" class="font-mono text-xs" />
                            <button hlmBtn size="sm">Copy</button>
                        </div>
                        <hlm-dialog-footer>
                            <button hlmBtn variant="outline" hlmDialogClose>Done</button>
                        </hlm-dialog-footer>
                    </hlm-dialog-content>
                </hlm-dialog>
            </div>
        `,
    }),
};
