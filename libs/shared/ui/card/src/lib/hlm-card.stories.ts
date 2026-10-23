import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmButton } from '../../../button/src/hlm-button';
import { HlmInput } from '../../../input/src/hlm-input';
import { HlmLabel } from '../../../label/src/hlm-label';

import { HlmCard } from './hlm-card';
import { HlmCardAction } from './hlm-card-action';
import { HlmCardContent } from './hlm-card-content';
import { HlmCardDescription } from './hlm-card-description';
import { HlmCardFooter } from './hlm-card-footer';
import { HlmCardHeader } from './hlm-card-header';
import { HlmCardTitle } from './hlm-card-title';

interface CardStoryArgs {
    title: string;
    description: string;
    content: string;
}

const meta: Meta<CardStoryArgs> = {
    title: 'Primitives/Card',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                HlmCard,
                HlmCardHeader,
                HlmCardTitle,
                HlmCardDescription,
                HlmCardAction,
                HlmCardContent,
                HlmCardFooter,
                HlmButton,
                HlmInput,
                HlmLabel,
            ],
        }),
    ],
    argTypes: {
        title: {
            control: 'text',
            description: 'Card title heading',
        },
        description: {
            control: 'text',
            description: 'Card subtitle / description text',
        },
        content: {
            control: 'text',
            description: 'Card main body content',
        },
    },
    args: {
        title: 'Notification Preferences',
        description: 'Choose what you want to receive and how you want to be notified.',
        content: 'Your notifications will appear here based on your account activity.',
    },
};

export default meta;
type Story = StoryObj<CardStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-card class="w-96">
                <hlm-card-header>
                    <h3 hlmCardTitle>{{ title }}</h3>
                    <p hlmCardDescription>{{ description }}</p>
                </hlm-card-header>
                <div hlmCardContent>
                    <p class="text-sm text-muted-foreground">{{ content }}</p>
                </div>
                <hlm-card-footer class="flex justify-between">
                    <button hlmBtn variant="outline">Cancel</button>
                    <button hlmBtn variant="default">Save</button>
                </hlm-card-footer>
            </hlm-card>
        `,
    }),
};

export const LoginForm: Story = {
    render: () => ({
        template: `
            <hlm-card class="w-96">
                <hlm-card-header>
                    <h3 hlmCardTitle>Sign in</h3>
                    <p hlmCardDescription>Enter your email below to access your account</p>
                </hlm-card-header>
                <div hlmCardContent class="space-y-4">
                    <div class="space-y-1.5">
                        <label hlmLabel for="login-email">Email</label>
                        <input hlmInput id="login-email" type="email" placeholder="m@example.com" />
                    </div>
                    <div class="space-y-1.5">
                        <label hlmLabel for="login-password">Password</label>
                        <input hlmInput id="login-password" type="password" />
                    </div>
                </div>
                <hlm-card-footer>
                    <button hlmBtn class="w-full">Sign in</button>
                </hlm-card-footer>
            </hlm-card>
        `,
    }),
};

export const SmallSize: Story = {
    render: () => ({
        template: `
            <hlm-card size="sm" class="w-80">
                <hlm-card-header>
                    <h4 hlmCardTitle>Quick Stats</h4>
                    <p hlmCardDescription>Monthly overview</p>
                </hlm-card-header>
                <div hlmCardContent>
                    <span class="text-2xl font-bold">+12,234</span>
                    <p class="text-xs text-muted-foreground mt-1">+19% from last month</p>
                </div>
            </hlm-card>
        `,
    }),
};
