import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmRadio } from './hlm-radio';
import { HlmRadioGroup } from './hlm-radio-group';
import { HlmRadioIndicator } from './hlm-radio-indicator';

interface RadioGroupStoryArgs {
    defaultValue: string;
    disabled: boolean;
}

const meta: Meta<RadioGroupStoryArgs> = {
    title: 'Forms/Radio Group',
    component: HlmRadioGroup,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmRadioGroup, HlmRadio, HlmRadioIndicator, HlmLabel],
        }),
    ],
    argTypes: {
        defaultValue: {
            control: 'text',
            description: 'The initially selected radio value.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: "'default'" },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the entire radio group is interactively disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
    args: {
        defaultValue: 'default',
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<RadioGroupStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-radio-group [value]="defaultValue" [disabled]="disabled">
                <div class="flex items-center space-x-2">
                    <hlm-radio value="default" inputId="r-default">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <label hlmLabel for="r-default">Default (compact spacing)</label>
                </div>
                <div class="flex items-center space-x-2">
                    <hlm-radio value="comfortable" inputId="r-comfortable">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <label hlmLabel for="r-comfortable">Comfortable (balanced)</label>
                </div>
                <div class="flex items-center space-x-2">
                    <hlm-radio value="compact" inputId="r-compact">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <label hlmLabel for="r-compact">Compact (dense table view)</label>
                </div>
            </hlm-radio-group>
        `,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        template: `
            <hlm-radio-group value="card">
                <div class="flex items-start space-x-3">
                    <hlm-radio value="card" inputId="pay-card" class="mt-0.5">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <div class="grid gap-1">
                        <label hlmLabel for="pay-card" class="font-medium cursor-pointer">Credit or Debit Card</label>
                        <p class="text-xs text-muted-foreground">Pay with Visa, Mastercard, or American Express.</p>
                    </div>
                </div>
                <div class="flex items-start space-x-3 mt-4">
                    <hlm-radio value="paypal" inputId="pay-paypal" class="mt-0.5">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <div class="grid gap-1">
                        <label hlmLabel for="pay-paypal" class="font-medium cursor-pointer">PayPal Account</label>
                        <p class="text-xs text-muted-foreground">Redirect to PayPal to authenticate your transaction.</p>
                    </div>
                </div>
            </hlm-radio-group>
        `,
    }),
};

export const DisabledItem: Story = {
    render: () => ({
        template: `
            <hlm-radio-group value="starter">
                <div class="flex items-center space-x-2">
                    <hlm-radio value="starter" inputId="plan-starter">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <label hlmLabel for="plan-starter">Starter Plan (Free)</label>
                </div>
                <div class="flex items-center space-x-2">
                    <hlm-radio value="pro" inputId="plan-pro">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <label hlmLabel for="plan-pro">Pro Plan ($29/mo)</label>
                </div>
                <div class="flex items-center space-x-2 opacity-50">
                    <hlm-radio value="enterprise" inputId="plan-ent" [disabled]="true">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <label hlmLabel for="plan-ent" class="cursor-not-allowed text-muted-foreground">Enterprise (Sold Out)</label>
                </div>
            </hlm-radio-group>
        `,
    }),
};
