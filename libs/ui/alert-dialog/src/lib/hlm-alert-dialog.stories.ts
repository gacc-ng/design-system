import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmAlertDialogImports } from '../index';

const meta: Meta = {
    title: 'Primitives/AlertDialog',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmAlertDialogImports, HlmButton],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-alert-dialog>
                    <button hlmBtn hlmAlertDialogTrigger variant="destructive">Delete Account</button>
                    <hlm-alert-dialog-content *hlmAlertDialogPortal="let ctx">
                        <hlm-alert-dialog-header>
                            <h2 hlmAlertDialogTitle>Are you absolutely sure?</h2>
                            <p hlmAlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your personal tokens from our servers.
                            </p>
                        </hlm-alert-dialog-header>
                        <hlm-alert-dialog-footer>
                            <button hlmBtn variant="outline" hlmAlertDialogCancel>Cancel</button>
                            <button hlmBtn variant="destructive" hlmAlertDialogAction>Yes, delete account</button>
                        </hlm-alert-dialog-footer>
                    </hlm-alert-dialog-content>
                </hlm-alert-dialog>
            </div>
        `,
    }),
};

export const SmallConfirmation: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-alert-dialog>
                    <button hlmBtn hlmAlertDialogTrigger variant="outline">Discard Draft</button>
                    <hlm-alert-dialog-content *hlmAlertDialogPortal="let ctx" size="sm">
                        <hlm-alert-dialog-header>
                            <h2 hlmAlertDialogTitle>Discard changes?</h2>
                            <p hlmAlertDialogDescription>Any unsaved changes will be lost.</p>
                        </hlm-alert-dialog-header>
                        <hlm-alert-dialog-footer>
                            <button hlmBtn variant="outline" hlmAlertDialogCancel>Keep editing</button>
                            <button hlmBtn variant="destructive" hlmAlertDialogAction>Discard</button>
                        </hlm-alert-dialog-footer>
                    </hlm-alert-dialog-content>
                </hlm-alert-dialog>
            </div>
        `,
    }),
};
