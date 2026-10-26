import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';
import {
    HlmCard,
    HlmCardContent,
    HlmCardDescription,
    HlmCardFooter,
    HlmCardHeader,
    HlmCardTitle,
} from '@gacc-ng/ui/card';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmTabsImports } from '../index';

import { HlmTabs } from './hlm-tabs';

interface TabsStoryArgs {
    orientation: 'horizontal' | 'vertical';
    tab: string;
}

const meta: Meta<TabsStoryArgs> = {
    title: 'Layout/Tabs',
    component: HlmTabs,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                HlmTabsImports,
                HlmCard,
                HlmCardHeader,
                HlmCardTitle,
                HlmCardDescription,
                HlmCardContent,
                HlmCardFooter,
                HlmButton,
                HlmInput,
                HlmLabel,
            ],
        }),
    ],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'The layout axis orientation for the tabs list and content.',
            table: {
                type: { summary: "'horizontal' | 'vertical'" },
                defaultValue: { summary: "'horizontal'" },
            },
        },
        tab: {
            control: 'text',
            description: 'The initially selected active tab identifier.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: "'account'" },
            },
        },
    },
    args: {
        orientation: 'horizontal',
        tab: 'account',
    },
};

export default meta;
type Story = StoryObj<TabsStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 flex justify-center">
                <hlm-tabs [tab]="tab" [orientation]="orientation" class="w-105">
                    <hlm-tabs-list class="grid w-full grid-cols-2">
                        <button hlmTabsTrigger="account">Account</button>
                        <button hlmTabsTrigger="password">Password</button>
                    </hlm-tabs-list>

                    <div hlmTabsContent="account">
                        <hlm-card class="mt-2">
                            <hlm-card-header>
                                <h3 hlmCardTitle>Account Details</h3>
                                <p hlmCardDescription>Make changes to your account settings here.</p>
                            </hlm-card-header>
                            <div hlmCardContent class="space-y-3">
                                <div class="space-y-1">
                                    <label hlmLabel for="tab-name">Name</label>
                                    <input hlmInput id="tab-name" value="Gustavo Caqui" />
                                </div>
                                <div class="space-y-1">
                                    <label hlmLabel for="tab-handle">Username</label>
                                    <input hlmInput id="tab-handle" value="@gcaqui" />
                                </div>
                            </div>
                            <hlm-card-footer>
                                <button hlmBtn>Save Changes</button>
                            </hlm-card-footer>
                        </hlm-card>
                    </div>

                    <div hlmTabsContent="password">
                        <hlm-card class="mt-2">
                            <hlm-card-header>
                                <h3 hlmCardTitle>Password</h3>
                                <p hlmCardDescription>Change your authentication password.</p>
                            </hlm-card-header>
                            <div hlmCardContent class="space-y-3">
                                <div class="space-y-1">
                                    <label hlmLabel for="tab-curr">Current Password</label>
                                    <input hlmInput id="tab-curr" type="password" />
                                </div>
                                <div class="space-y-1">
                                    <label hlmLabel for="tab-new">New Password</label>
                                    <input hlmInput id="tab-new" type="password" />
                                </div>
                            </div>
                            <hlm-card-footer>
                                <button hlmBtn>Update Password</button>
                            </hlm-card-footer>
                        </hlm-card>
                    </div>
                </hlm-tabs>
            </div>
        `,
    }),
};

export const Vertical: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-tabs tab="general" orientation="vertical" class="flex gap-6 w-120">
                    <hlm-tabs-list class="flex flex-col h-auto w-36 space-y-1">
                        <button hlmTabsTrigger="general" class="justify-start">General</button>
                        <button hlmTabsTrigger="billing" class="justify-start">Billing</button>
                        <button hlmTabsTrigger="security" class="justify-start">Security</button>
                    </hlm-tabs-list>

                    <div class="flex-1">
                        <div hlmTabsContent="general" class="rounded-xl border border-border p-4">
                            <h4 class="font-medium text-sm">General Workspace Settings</h4>
                            <p class="text-xs text-muted-foreground mt-1">Manage team members, organization slug, and integrations.</p>
                        </div>
                        <div hlmTabsContent="billing" class="rounded-xl border border-border p-4">
                            <h4 class="font-medium text-sm">Subscription & Invoices</h4>
                            <p class="text-xs text-muted-foreground mt-1">Manage tier plans and payment payment method profiles.</p>
                        </div>
                        <div hlmTabsContent="security" class="rounded-xl border border-border p-4">
                            <h4 class="font-medium text-sm">Security & SSO</h4>
                            <p class="text-xs text-muted-foreground mt-1">Enforce SAML authentication and session token expiry.</p>
                        </div>
                    </div>
                </hlm-tabs>
            </div>
        `,
    }),
};

export const DisabledTab: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-tabs tab="active" class="w-105">
                    <hlm-tabs-list class="grid w-full grid-cols-3">
                        <button hlmTabsTrigger="active">Active</button>
                        <button hlmTabsTrigger="pending">Pending</button>
                        <button hlmTabsTrigger="archived" [disabled]="true" class="opacity-50 cursor-not-allowed">Archived</button>
                    </hlm-tabs-list>
                    <div hlmTabsContent="active" class="p-4 text-sm text-muted-foreground">Active items view</div>
                    <div hlmTabsContent="pending" class="p-4 text-sm text-muted-foreground">Pending items view</div>
                </hlm-tabs>
            </div>
        `,
    }),
};
