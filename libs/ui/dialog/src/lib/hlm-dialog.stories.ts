import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmDialogImports } from '../index';

import { HlmDialog } from './hlm-dialog';

interface DialogStoryArgs {
    title: string;
    description: string;
}

const meta: Meta<DialogStoryArgs> = {
    title: 'Overlays/Dialog',
    component: HlmDialog,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmDialogImports, HlmButton, HlmInput, HlmLabel],
        }),
    ],
    argTypes: {
        title: {
            control: 'text',
            description: 'The heading title displayed inside the dialog header.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Edit Profile'" },
            },
        },
        description: {
            control: 'text',
            description: 'The subtitle or instruction text inside the dialog header.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Make changes to your profile here.'" },
            },
        },
    },
    args: {
        title: 'Edit Profile',
        description: 'Make changes to your profile here. Click save when you are done.',
    },
};

export default meta;
type Story = StoryObj<DialogStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 flex justify-center">
                <hlm-dialog>
                    <button hlmBtn hlmDialogTrigger variant="outline">Edit Profile</button>
                    <hlm-dialog-content *hlmDialogPortal="let ctx">
                        <hlm-dialog-header>
                            <h3 hlmDialogTitle>{{ title }}</h3>
                            <p hlmDialogDescription>{{ description }}</p>
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
                            <h3 hlmDialogTitle>Share Access</h3>
                            <p hlmDialogDescription>Anyone with this secure link will be granted read access to the workspace.</p>
                        </hlm-dialog-header>
                        <div class="flex items-center space-x-2 py-3">
                            <input hlmInput value="https://design-system.gacc.dev/project/ds-82" readonly class="flex-1" />
                            <button hlmBtn size="sm">Copy Link</button>
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

export const Scrollable: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-dialog>
                    <button hlmBtn hlmDialogTrigger variant="outline">Terms of Service</button>
                    <hlm-dialog-content *hlmDialogPortal="let ctx" class="max-h-[85vh] overflow-y-auto">
                        <hlm-dialog-header>
                            <h3 hlmDialogTitle>Terms and Conditions</h3>
                            <p hlmDialogDescription>Please review the agreement before proceeding.</p>
                        </hlm-dialog-header>
                        <div class="space-y-4 py-4 text-sm text-muted-foreground leading-relaxed">
                            <p>1. Acceptance of Terms: By accessing this service, you agree to comply with all applicable laws and regulations.</p>
                            <p>2. Enterprise License: The design system is licensed under Apache 2.0 with proprietary brand assets reserved.</p>
                            <p>3. Privacy Policy: We do not track or sell behavioral analytics data.</p>
                            <p>4. Liability: The software is provided as-is without express warranties of merchantability or fitness for purpose.</p>
                        </div>
                        <hlm-dialog-footer>
                            <button hlmBtn variant="outline" hlmDialogClose>Decline</button>
                            <button hlmBtn hlmDialogClose>I Agree</button>
                        </hlm-dialog-footer>
                    </hlm-dialog-content>
                </hlm-dialog>
            </div>
        `,
    }),
};
