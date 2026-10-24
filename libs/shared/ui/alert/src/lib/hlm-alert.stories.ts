import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmButton } from '../../../button/src/hlm-button';

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
    title: 'Primitives/Alert',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmAlert, HlmAlertTitle, HlmAlertDescription, HlmAlertAction, HlmButton],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive'],
            description: 'The visual severity styling of the alert',
        },
        title: {
            control: 'text',
            description: 'The heading title of the alert',
        },
        description: {
            control: 'text',
            description: 'The body message of the alert',
        },
    },
    args: {
        variant: 'default',
        title: 'Heads up!',
        description: 'You can add components to your app using the cli.',
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
    args: {
        variant: 'destructive',
        title: 'Session Expired',
        description: 'Your authentication token has expired. Please sign in again to continue.',
    },
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

export const WithAction: Story = {
    render: () => ({
        template: `
            <div class="w-full max-w-lg">
                <hlm-alert>
                    <h5 hlmAlertTitle>New version available</h5>
                    <div hlmAlertDescription>Spartan NG 0.0.1-alpha.375 is now published.</div>
                    <div hlmAlertAction>
                        <button hlmBtn variant="outline" size="sm">Upgrade</button>
                    </div>
                </hlm-alert>
            </div>
        `,
    }),
};
