import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAlertCircle, lucideTerminal } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmAlert } from './hlm-alert';
import { HlmAlertAction } from './hlm-alert-action';
import { HlmAlertDescription } from './hlm-alert-description';
import { HlmAlertTitle } from './hlm-alert-title';

interface AlertStoryArgs {
    variant: 'default' | 'destructive';
    title: string;
    description: string;
}

const meta: Meta<AlertStoryArgs> = {
    title: 'Overlays/Alert',
    component: HlmAlert,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmAlert, HlmAlertTitle, HlmAlertDescription, HlmAlertAction, HlmButton, NgIcon],
            providers: [provideIcons({ lucideTerminal, lucideAlertCircle })],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive'],
            description: 'The visual severity styling of the alert box.',
            table: {
                type: { summary: "'default' | 'destructive'" },
                defaultValue: { summary: "'default'" },
            },
        },
        title: {
            control: 'text',
            description: 'The heading title of the alert.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Heads up!'" },
            },
        },
        description: {
            control: 'text',
            description: 'The explanatory body message of the alert.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'You can add components to your app using the cli.'" },
            },
        },
    },
    args: {
        variant: 'default',
        title: 'Heads up!',
        description: 'You can add components to your app using the Spartan CLI.',
    },
};

export default meta;
type Story = StoryObj<AlertStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="w-full max-w-lg">
                <hlm-alert [variant]="variant">
                    <h5 hlmAlertTitle>{{ title }}</h5>
                    <div hlmAlertDescription>{{ description }}</div>
                </hlm-alert>
            </div>
        `,
    }),
};

export const Destructive: Story = {
    render: () => ({
        template: `
            <div class="w-full max-w-lg">
                <hlm-alert variant="destructive">
                    <ng-icon name="lucideAlertCircle" class="size-4" />
                    <h5 hlmAlertTitle>Error Encountered</h5>
                    <div hlmAlertDescription>Your session has expired. Please log in again to continue editing.</div>
                </hlm-alert>
            </div>
        `,
    }),
};

export const WithIcon: Story = {
    render: () => ({
        template: `
            <div class="w-full max-w-lg">
                <hlm-alert variant="default">
                    <ng-icon name="lucideTerminal" class="size-4" />
                    <h5 hlmAlertTitle>CLI Installed</h5>
                    <div hlmAlertDescription>Run pnpm nx g @spartan-ng/cli:ui to scaffold new components.</div>
                    <div hlmAlertAction>
                        <button hlmBtn variant="outline" size="sm">Learn More</button>
                    </div>
                </hlm-alert>
            </div>
        `,
    }),
};
