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

const meta: Meta = {
    title: 'Primitives/Tabs',
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
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-tabs tab="account" class="w-105">
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
                                    <label hlmLabel for="tab-username">Username</label>
                                    <input hlmInput id="tab-username" value="@gcaqui" />
                                </div>
                            </div>
                            <hlm-card-footer>
                                <button hlmBtn>Save changes</button>
                            </hlm-card-footer>
                        </hlm-card>
                    </div>

                    <div hlmTabsContent="password">
                        <hlm-card class="mt-2">
                            <hlm-card-header>
                                <h3 hlmCardTitle>Password</h3>
                                <p hlmCardDescription>Change your password here. After saving, you will be logged out.</p>
                            </hlm-card-header>
                            <div hlmCardContent class="space-y-3">
                                <div class="space-y-1">
                                    <label hlmLabel for="current-pass">Current password</label>
                                    <input hlmInput id="current-pass" type="password" />
                                </div>
                                <div class="space-y-1">
                                    <label hlmLabel for="new-pass">New password</label>
                                    <input hlmInput id="new-pass" type="password" />
                                </div>
                            </div>
                            <hlm-card-footer>
                                <button hlmBtn>Update password</button>
                            </hlm-card-footer>
                        </hlm-card>
                    </div>
                </hlm-tabs>
            </div>
        `,
    }),
};

export const SolidVariant: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-tabs tab="all" class="w-100">
                    <hlm-tabs-list variant="solid" class="grid w-full grid-cols-3">
                        <button hlmTabsTrigger="all">All</button>
                        <button hlmTabsTrigger="unread">Unread</button>
                        <button hlmTabsTrigger="archived">Archived</button>
                    </hlm-tabs-list>

                    <div hlmTabsContent="all" class="p-4 text-sm text-muted-foreground">
                        Showing all notifications and system messages.
                    </div>
                    <div hlmTabsContent="unread" class="p-4 text-sm text-muted-foreground">
                        You have 3 unread messages waiting for review.
                    </div>
                    <div hlmTabsContent="archived" class="p-4 text-sm text-muted-foreground">
                        No archived messages found in this mailbox.
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
                <hlm-tabs tab="general" orientation="vertical" class="flex gap-6 w-125">
                    <hlm-tabs-list orientation="vertical" class="w-40 flex flex-col justify-start">
                        <button hlmTabsTrigger="general" class="w-full justify-start">General</button>
                        <button hlmTabsTrigger="security" class="w-full justify-start">Security</button>
                        <button hlmTabsTrigger="billing" class="w-full justify-start">Billing</button>
                    </hlm-tabs-list>

                    <div class="flex-1">
                        <div hlmTabsContent="general" class="space-y-2">
                            <h4 class="font-semibold text-foreground">General Settings</h4>
                            <p class="text-sm text-muted-foreground">Manage your workspace name and appearance.</p>
                        </div>
                        <div hlmTabsContent="security" class="space-y-2">
                            <h4 class="font-semibold text-foreground">Security</h4>
                            <p class="text-sm text-muted-foreground">Configure two-factor authentication and session timeouts.</p>
                        </div>
                        <div hlmTabsContent="billing" class="space-y-2">
                            <h4 class="font-semibold text-foreground">Billing</h4>
                            <p class="text-sm text-muted-foreground">Review your subscription plan and payment methods.</p>
                        </div>
                    </div>
                </hlm-tabs>
            </div>
        `,
    }),
};

export const Paginated: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-tabs tab="tab1" class="w-125">
                    <hlm-tabs-paginated-list>
                        <button hlmTabsTrigger="tab1">Overview</button>
                        <button hlmTabsTrigger="tab2">Analytics</button>
                        <button hlmTabsTrigger="tab3">Reports</button>
                        <button hlmTabsTrigger="tab4">Notifications</button>
                        <button hlmTabsTrigger="tab5">Integrations</button>
                        <button hlmTabsTrigger="tab6">API Keys</button>
                        <button hlmTabsTrigger="tab7">Audit Logs</button>
                        <button hlmTabsTrigger="tab8">Preferences</button>
                    </hlm-tabs-paginated-list>

                    <div hlmTabsContent="tab1" class="p-4 text-sm text-muted-foreground">Overview content panel.</div>
                    <div hlmTabsContent="tab2" class="p-4 text-sm text-muted-foreground">Analytics charts and metrics.</div>
                    <div hlmTabsContent="tab3" class="p-4 text-sm text-muted-foreground">Downloadable compliance reports.</div>
                    <div hlmTabsContent="tab4" class="p-4 text-sm text-muted-foreground">Real-time notification preferences.</div>
                    <div hlmTabsContent="tab5" class="p-4 text-sm text-muted-foreground">Connected third-party tools.</div>
                    <div hlmTabsContent="tab6" class="p-4 text-sm text-muted-foreground">API key management.</div>
                    <div hlmTabsContent="tab7" class="p-4 text-sm text-muted-foreground">System audit activity logs.</div>
                    <div hlmTabsContent="tab8" class="p-4 text-sm text-muted-foreground">User custom preferences.</div>
                </hlm-tabs>
            </div>
        `,
    }),
};
