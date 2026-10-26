import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmDrawerImports } from '../index';

import { HlmDrawer } from './hlm-drawer.component';

const meta: Meta = {
    title: 'Layout/Drawer',
    component: HlmDrawer,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmDrawerImports, HlmButton, HlmInput, HlmLabel],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="flex items-center justify-center p-8">
                <hlm-drawer>
                    <button hlmBtn hlmDrawerTrigger variant="outline">Open Bottom Drawer</button>
                    <hlm-drawer-content *hlmDrawerPortal="let ctx">
                        <hlm-drawer-header>
                            <h3 hlmDrawerTitle>Move Goal</h3>
                            <p hlmDrawerDescription>Set your daily activity goal and monitor progress.</p>
                        </hlm-drawer-header>
                        <div class="p-4 flex flex-col items-center justify-center space-y-2">
                            <div class="text-6xl font-bold tracking-tighter">350</div>
                            <div class="text-muted-foreground text-xs uppercase tracking-wider">Calories/day</div>
                        </div>
                        <hlm-drawer-footer>
                            <button hlmBtn>Submit Goal</button>
                            <button hlmBtn hlmDrawerClose variant="outline">Cancel</button>
                        </hlm-drawer-footer>
                    </hlm-drawer-content>
                </hlm-drawer>
            </div>
        `,
    }),
};

export const Positions: Story = {
    render: () => ({
        template: `
            <div class="flex flex-wrap gap-4 items-center justify-center p-8">
                <!-- Top -->
                <hlm-drawer>
                    <button hlmBtn hlmDrawerTrigger direction="top" variant="outline">Top Drawer</button>
                    <hlm-drawer-content *hlmDrawerPortal="let ctx">
                        <hlm-drawer-header>
                            <h3 hlmDrawerTitle>Top Notification</h3>
                            <p hlmDrawerDescription>System alerts and announcements from above.</p>
                        </hlm-drawer-header>
                        <div class="p-4 text-sm">Review recently deployed features and release notes.</div>
                        <hlm-drawer-footer>
                            <button hlmBtn hlmDrawerClose variant="outline">Acknowledge</button>
                        </hlm-drawer-footer>
                    </hlm-drawer-content>
                </hlm-drawer>

                <!-- Right -->
                <hlm-drawer>
                    <button hlmBtn hlmDrawerTrigger direction="right" variant="outline">Right Drawer</button>
                    <hlm-drawer-content *hlmDrawerPortal="let ctx">
                        <hlm-drawer-header>
                            <h3 hlmDrawerTitle>Right Panel</h3>
                            <p hlmDrawerDescription>Side navigation and secondary tools.</p>
                        </hlm-drawer-header>
                        <div class="p-4 text-sm">Configure drawer preferences and display options.</div>
                        <hlm-drawer-footer>
                            <button hlmBtn hlmDrawerClose variant="outline">Done</button>
                        </hlm-drawer-footer>
                    </hlm-drawer-content>
                </hlm-drawer>

                <!-- Left -->
                <hlm-drawer>
                    <button hlmBtn hlmDrawerTrigger direction="left" variant="outline">Left Drawer</button>
                    <hlm-drawer-content *hlmDrawerPortal="let ctx">
                        <hlm-drawer-header>
                            <h3 hlmDrawerTitle>Left Sidebar</h3>
                            <p hlmDrawerDescription>Primary workspace navigation links.</p>
                        </hlm-drawer-header>
                        <div class="p-4 text-sm">Dashboard, Projects, Analytics, Settings.</div>
                        <hlm-drawer-footer>
                            <button hlmBtn hlmDrawerClose variant="outline">Close</button>
                        </hlm-drawer-footer>
                    </hlm-drawer-content>
                </hlm-drawer>

                <!-- Bottom -->
                <hlm-drawer>
                    <button hlmBtn hlmDrawerTrigger direction="bottom" variant="outline">Bottom Drawer</button>
                    <hlm-drawer-content *hlmDrawerPortal="let ctx">
                        <hlm-drawer-header>
                            <h3 hlmDrawerTitle>Bottom Actions</h3>
                            <p hlmDrawerDescription>Quick action sheet with drag handle.</p>
                        </hlm-drawer-header>
                        <div class="p-4 text-sm">Swipe down or click close to dismiss.</div>
                        <hlm-drawer-footer>
                            <button hlmBtn hlmDrawerClose variant="outline">Dismiss</button>
                        </hlm-drawer-footer>
                    </hlm-drawer-content>
                </hlm-drawer>
            </div>
        `,
    }),
};

export const WithFormInputs: Story = {
    render: () => ({
        template: `
            <div class="flex items-center justify-center p-8">
                <hlm-drawer>
                    <button hlmBtn hlmDrawerTrigger variant="outline">Edit Profile</button>
                    <hlm-drawer-content *hlmDrawerPortal="let ctx">
                        <hlm-drawer-header>
                            <h3 hlmDrawerTitle>Edit Profile</h3>
                            <p hlmDrawerDescription>Make changes to your profile details here.</p>
                        </hlm-drawer-header>
                        <div class="space-y-4 px-4 py-2">
                            <div class="space-y-1.5">
                                <label hlmLabel for="drawer-name">Full Name</label>
                                <input hlmInput id="drawer-name" value="Jane Doe" />
                            </div>
                            <div class="space-y-1.5">
                                <label hlmLabel for="drawer-username">Username</label>
                                <input hlmInput id="drawer-username" value="@janedoe" />
                            </div>
                        </div>
                        <hlm-drawer-footer>
                            <button hlmBtn>Save Changes</button>
                            <button hlmBtn hlmDrawerClose variant="outline">Cancel</button>
                        </hlm-drawer-footer>
                    </hlm-drawer-content>
                </hlm-drawer>
            </div>
        `,
    }),
};

export const NestedScroll: Story = {
    render: () => ({
        template: `
            <div class="flex items-center justify-center p-8">
                <hlm-drawer>
                    <button hlmBtn hlmDrawerTrigger variant="outline">Terms & Conditions</button>
                    <hlm-drawer-content *hlmDrawerPortal="let ctx">
                        <hlm-drawer-header>
                            <h3 hlmDrawerTitle>Terms of Service</h3>
                            <p hlmDrawerDescription>Please read carefully before agreeing.</p>
                        </hlm-drawer-header>
                        <div class="max-h-[300px] overflow-y-auto px-4 py-2 text-sm space-y-3">
                            <p>
                                1. Acceptance of Terms: By accessing this service, you agree to comply with and be bound
                                by these terms and conditions.
                            </p>
                            <p>
                                2. User Obligations: You are responsible for maintaining the confidentiality of your account
                                credentials and all activities occurring under your account.
                            </p>
                            <p>
                                3. Intellectual Property: All materials, trademarks, and intellectual property remain the
                                exclusive property of their respective owners.
                            </p>
                            <p>
                                4. Privacy Policy: We take your data privacy seriously and adhere strictly to enterprise
                                data protection regulations.
                            </p>
                            <p>
                                5. Termination: We reserve the right to suspend or terminate accounts that violate our code
                                of conduct or terms of service.
                            </p>
                        </div>
                        <hlm-drawer-footer>
                            <button hlmBtn>I Agree</button>
                            <button hlmBtn hlmDrawerClose variant="outline">Decline</button>
                        </hlm-drawer-footer>
                    </hlm-drawer-content>
                </hlm-drawer>
            </div>
        `,
    }),
};
