import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmAlertDialogImports } from '../index';

import { HlmAlertDialog } from './hlm-alert-dialog';

interface AlertDialogStoryArgs {
    title: string;
    description: string;
}

const meta: Meta<AlertDialogStoryArgs> = {
    title: 'Overlays/Alert Dialog',
    component: HlmAlertDialog,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmAlertDialogImports, HlmButton],
        }),
    ],
    argTypes: {
        title: {
            control: 'text',
            description: 'The critical alert heading question.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Are you absolutely sure?'" },
            },
        },
        description: {
            control: 'text',
            description: 'The explanatory warning text describing consequences.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'This action cannot be undone.'" },
            },
        },
    },
    args: {
        title: 'Are you absolutely sure?',
        description:
            'This action cannot be undone. This will permanently delete your account and remove your personal tokens from our servers.',
    },
};

export default meta;
type Story = StoryObj<AlertDialogStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 flex justify-center">
                <hlm-alert-dialog>
                    <button hlmBtn hlmAlertDialogTrigger variant="destructive">Delete Account</button>
                    <hlm-alert-dialog-content *hlmAlertDialogPortal="let ctx">
                        <hlm-alert-dialog-header>
                            <h2 hlmAlertDialogTitle>{{ title }}</h2>
                            <p hlmAlertDialogDescription>{{ description }}</p>
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
