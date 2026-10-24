import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmLabel } from '../../../label/src/hlm-label';

import { HlmRadio } from './hlm-radio';
import { HlmRadioGroup } from './hlm-radio-group';
import { HlmRadioIndicator } from './hlm-radio-indicator';

interface RadioGroupStoryArgs {
    defaultValue: string;
}

const meta: Meta<RadioGroupStoryArgs> = {
    title: 'Primitives/RadioGroup',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmRadioGroup, HlmRadio, HlmRadioIndicator, HlmLabel],
        }),
    ],
    argTypes: {
        defaultValue: {
            control: 'text',
            description: 'Selected value',
        },
    },
    args: {
        defaultValue: 'default',
    },
};

export default meta;
type Story = StoryObj<RadioGroupStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-radio-group [value]="defaultValue">
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

export const WithCardLayout: Story = {
    render: () => ({
        template: `
            <hlm-radio-group value="pro" class="max-w-md">
                <label for="plan-free" class="flex cursor-pointer items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <hlm-radio value="free" inputId="plan-free" class="mt-0.5">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <div class="space-y-1">
                        <div class="font-medium text-sm">Free Plan</div>
                        <div class="text-xs text-muted-foreground">Up to 3 projects, community support, 1 GB storage.</div>
                    </div>
                </label>
                <label for="plan-pro" class="flex cursor-pointer items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <hlm-radio value="pro" inputId="plan-pro" class="mt-0.5">
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <div class="space-y-1">
                        <div class="font-medium text-sm">Pro Plan ($20/mo)</div>
                        <div class="text-xs text-muted-foreground">Unlimited projects, priority SLA support, 100 GB storage.</div>
                    </div>
                </label>
            </hlm-radio-group>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <hlm-radio-group value="disabled-opt" disabled>
                <div class="flex items-center space-x-2">
                    <hlm-radio value="disabled-opt" inputId="r-disabled" disabled>
                        <hlm-radio-indicator />
                    </hlm-radio>
                    <label hlmLabel for="r-disabled" class="text-muted-foreground">Disabled Option</label>
                </div>
            </hlm-radio-group>
        `,
    }),
};
