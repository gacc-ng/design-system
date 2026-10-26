import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmBadge } from '@gacc-ng/ui/badge';
import { HlmButton } from '@gacc-ng/ui/button';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';
import { HlmSwitch, HlmSwitchThumb } from '@gacc-ng/ui/switch';

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
    title: 'Layout/Card',
    component: HlmCard,
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
                HlmBadge,
                HlmSwitch,
                HlmSwitchThumb,
            ],
        }),
    ],
    argTypes: {
        title: {
            control: 'text',
            description: 'The heading content projected into the card title slot.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Notification Preferences'" },
            },
        },
        description: {
            control: 'text',
            description: 'The subtitle content projected into the card description slot.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Choose what you want to receive and how you want to be notified.'" },
            },
        },
        content: {
            control: 'text',
            description: 'The main body content projected into the card content slot.',
            table: {
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Your notifications will appear here based on your account activity.'" },
            },
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

export const WithHeaderAction: Story = {
    render: () => ({
        template: `
            <hlm-card class="w-96">
                <hlm-card-header>
                    <h3 hlmCardTitle>API Access</h3>
                    <p hlmCardDescription>Manage keys and webhooks for your workspace</p>
                    <div hlmCardAction>
                        <button hlmBtn variant="outline" size="sm">Rotate Key</button>
                    </div>
                </hlm-card-header>
                <div hlmCardContent class="space-y-2">
                    <div class="rounded-lg bg-muted p-2.5 font-mono text-xs">
                        pk_live_51MszXXXXX293410
                    </div>
                    <p class="text-xs text-muted-foreground">Created 14 days ago · Last used 2 hours ago</p>
                </div>
                <hlm-card-footer class="justify-end gap-2">
                    <button hlmBtn variant="ghost" size="sm">Documentation</button>
                    <button hlmBtn variant="default" size="sm">Generate New</button>
                </hlm-card-footer>
            </hlm-card>
        `,
    }),
};

export const WithImageCover: Story = {
    render: () => ({
        template: `
            <hlm-card class="w-96 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60"
                    alt="Abstract cover"
                    class="h-44 w-full object-cover"
                />
                <hlm-card-header>
                    <div class="flex items-center gap-2">
                        <span hlmBadge variant="secondary">Architecture</span>
                        <span class="text-xs text-muted-foreground">5 min read</span>
                    </div>
                    <h3 hlmCardTitle class="mt-1">Modern Micro-Frontends</h3>
                    <p hlmCardDescription>Scaling Angular design systems in enterprise monorepos.</p>
                </hlm-card-header>
                <div hlmCardContent>
                    <p class="text-sm text-muted-foreground">
                        Learn how module federation, isolated build pipelines, and headless tokens create reliable component libraries.
                    </p>
                </div>
                <hlm-card-footer class="justify-between">
                    <button hlmBtn variant="ghost" size="sm">Save for later</button>
                    <button hlmBtn size="sm">Read Article</button>
                </hlm-card-footer>
            </hlm-card>
        `,
    }),
};

export const WithSettingsSwitch: Story = {
    render: () => ({
        template: `
            <hlm-card class="w-96">
                <hlm-card-header>
                    <h3 hlmCardTitle>Security Settings</h3>
                    <p hlmCardDescription>Configure two-factor authentication and session limits</p>
                </hlm-card-header>
                <div hlmCardContent class="space-y-4">
                    <div class="flex items-center justify-between space-x-3">
                        <div class="space-y-0.5">
                            <label hlmLabel for="mfa-toggle" class="font-medium text-sm">Two-Factor Auth</label>
                            <p class="text-xs text-muted-foreground">Require an authenticator app code on login</p>
                        </div>
                        <hlm-switch id="mfa-toggle" [checked]="true">
                            <hlm-switch-thumb />
                        </hlm-switch>
                    </div>
                    <div class="flex items-center justify-between space-x-3">
                        <div class="space-y-0.5">
                            <label hlmLabel for="session-toggle" class="font-medium text-sm">Session Timeout</label>
                            <p class="text-xs text-muted-foreground">Auto logout after 15 minutes of inactivity</p>
                        </div>
                        <hlm-switch id="session-toggle" [checked]="false">
                            <hlm-switch-thumb />
                        </hlm-switch>
                    </div>
                </div>
                <hlm-card-footer class="justify-end">
                    <button hlmBtn size="sm">Save Changes</button>
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
