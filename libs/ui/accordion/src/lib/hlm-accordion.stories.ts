import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmBadge } from '@gacc-ng/ui/badge';

import { HlmAccordionImports } from '../index';

import { HlmAccordion } from './hlm-accordion';

interface AccordionStoryArgs {
    type: 'single' | 'multiple';
}

const meta: Meta<AccordionStoryArgs> = {
    title: 'Primitives/Accordion',
    component: HlmAccordion,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmAccordionImports, HlmBadge],
        }),
    ],
    argTypes: {
        type: {
            control: 'inline-radio',
            options: ['single', 'multiple'],
            description: 'Whether single or multiple accordion items can be open concurrently.',
            table: {
                type: { summary: "'single' | 'multiple'" },
                defaultValue: { summary: "'single'" },
            },
        },
    },
    args: {
        type: 'single',
    },
};

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 flex justify-center">
                <hlm-accordion [type]="type" class="w-125">
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
                                <span hlmBadge variant="secondary">Active</span>
                            </span>
                        </hlm-accordion-trigger>
                        <hlm-accordion-content>
                            Your workspace is currently on the Enterprise plan with 45 active seats.
                        </hlm-accordion-content>
                    </hlm-accordion-item>

                    <hlm-accordion-item>
                        <hlm-accordion-trigger>
                            <span class="flex items-center gap-2">
                                Team Permissions
                                <span hlmBadge variant="outline">2 Admins</span>
                            </span>
                        </hlm-accordion-trigger>
                        <hlm-accordion-content>
                            Role-based access control is enabled with mandatory multi-factor authentication.
                        </hlm-accordion-content>
                    </hlm-accordion-item>
                </hlm-accordion>
            </div>
        `,
    }),
};

export const DisabledItem: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-accordion class="w-125">
                    <hlm-accordion-item>
                        <hlm-accordion-trigger>Available Feature</hlm-accordion-trigger>
                        <hlm-accordion-content>
                            This item can be toggled normally.
                        </hlm-accordion-content>
                    </hlm-accordion-item>
                    <hlm-accordion-item [disabled]="true">
                        <hlm-accordion-trigger [disabled]="true" class="cursor-not-allowed opacity-50">
                            Locked Enterprise Feature
                        </hlm-accordion-trigger>
                        <hlm-accordion-content>
                            Upgrade your plan to unlock this setting.
                        </hlm-accordion-content>
                    </hlm-accordion-item>
                </hlm-accordion>
            </div>
        `,
    }),
};
