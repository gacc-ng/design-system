import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmBadge } from '../../../badge/src/hlm-badge';
import { HlmAccordionImports } from '../index';

const meta: Meta = {
    title: 'Primitives/Accordion',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmAccordionImports, HlmBadge],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-accordion class="w-[500px]">
                    <hlm-accordion-item value="item-1">
                        <button hlmAccordionTrigger>Is it accessible?</button>
                        <hlm-accordion-content>
                            Yes. It adheres to the WAI-ARIA design pattern with full keyboard navigation and screen reader support.
                        </hlm-accordion-content>
                    </hlm-accordion-item>

                    <hlm-accordion-item value="item-2">
                        <button hlmAccordionTrigger>Is it styled with the Maia preset?</button>
                        <hlm-accordion-content>
                            Yes. It features generous rounded corners, crisp subtle border tokens, and smooth height transitions.
                        </hlm-accordion-content>
                    </hlm-accordion-item>

                    <hlm-accordion-item value="item-3">
                        <button hlmAccordionTrigger>Is it animated?</button>
                        <hlm-accordion-content>
                            Yes. It's animated by default with hardware-accelerated transitions, but can be disabled via motion preferences.
                        </hlm-accordion-content>
                    </hlm-accordion-item>
                </hlm-accordion>
            </div>
        `,
    }),
};

export const Multiple: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-accordion type="multiple" class="w-[500px]">
                    <hlm-accordion-item value="item-1">
                        <button hlmAccordionTrigger>
                            <span class="flex items-center gap-2">
                                Workspace Billing
                                <span hlmBadge variant="secondary" size="sm">Active</span>
                            </span>
                        </button>
                        <hlm-accordion-content>
                            Your workspace is on the Pro Plan. Next billing date is November 1, 2026.
                        </hlm-accordion-content>
                    </hlm-accordion-item>

                    <hlm-accordion-item value="item-2">
                        <button hlmAccordionTrigger>
                            <span class="flex items-center gap-2">
                                Team Members
                                <span hlmBadge variant="outline" size="sm">12 seats</span>
                            </span>
                        </button>
                        <hlm-accordion-content>
                            Manage roles, permissions, and invite links for developers and reviewers.
                        </hlm-accordion-content>
                    </hlm-accordion-item>

                    <hlm-accordion-item value="item-3">
                        <button hlmAccordionTrigger>
                            <span class="flex items-center gap-2">
                                Security & Compliance
                                <span hlmBadge variant="destructive" size="sm">Action needed</span>
                            </span>
                        </button>
                        <hlm-accordion-content>
                            Enforce mandatory 2FA and configure Single Sign-On (SSO) SAML identity providers.
                        </hlm-accordion-content>
                    </hlm-accordion-item>
                </hlm-accordion>
            </div>
        `,
    }),
};
