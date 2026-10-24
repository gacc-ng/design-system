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
                <hlm-accordion class="w-125">
                    <hlm-accordion-item>
                        <hlm-accordion-trigger>How does billing work?</hlm-accordion-trigger>
                        <hlm-accordion-content>
                            Billing is processed automatically on a monthly or annual cycle. You can update payment methods and invoice details at any time from your settings.
                        </hlm-accordion-content>
                    </hlm-accordion-item>

                    <hlm-accordion-item>
                        <hlm-accordion-trigger>Is my data secure?</hlm-accordion-trigger>
                        <hlm-accordion-content>
                            Yes. All data is encrypted in transit and at rest using industry-standard protocols, regular audits, and SOC-2 Type II compliance.
                        </hlm-accordion-content>
                    </hlm-accordion-item>

                    <hlm-accordion-item>
                        <hlm-accordion-trigger>What integrations do you support?</hlm-accordion-trigger>
                        <hlm-accordion-content>
                            We provide native integrations with GitHub, GitLab, Slack, Linear, Jira, and custom webhook dispatchers for automated workflows.
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
                <hlm-accordion type="multiple" class="w-125">
                    <hlm-accordion-item>
                        <hlm-accordion-trigger>
                            <span class="flex items-center gap-2">
                                Workspace Billing
                                <span hlmBadge variant="secondary" size="sm">Active</span>
                            </span>
                        </hlm-accordion-trigger>
                        <hlm-accordion-content>
                            Your workspace is on the Pro Plan. Next billing date is November 1, 2026.
                        </hlm-accordion-content>
                    </hlm-accordion-item>

                    <hlm-accordion-item>
                        <hlm-accordion-trigger>
                            <span class="flex items-center gap-2">
                                Team Members
                                <span hlmBadge variant="outline" size="sm">12 seats</span>
                            </span>
                        </hlm-accordion-trigger>
                        <hlm-accordion-content>
                            Manage roles, permissions, and invite links for developers and reviewers.
                        </hlm-accordion-content>
                    </hlm-accordion-item>

                    <hlm-accordion-item>
                        <hlm-accordion-trigger>
                            <span class="flex items-center gap-2">
                                Security & Compliance
                                <span hlmBadge variant="destructive" size="sm">Action needed</span>
                            </span>
                        </hlm-accordion-trigger>
                        <hlm-accordion-content>
                            Enforce mandatory 2FA and configure Single Sign-On (SSO) SAML identity providers.
                        </hlm-accordion-content>
                    </hlm-accordion-item>
                </hlm-accordion>
            </div>
        `,
    }),
};
