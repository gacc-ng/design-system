import type { Meta, StoryObj } from '@storybook/angular';

import { HlmInput } from '../../input/src/hlm-input';

import { HlmLabel } from './hlm-label';

interface LabelStoryArgs {
    text: string;
}

const meta: Meta<LabelStoryArgs> = {
    title: 'Primitives/Label',
    tags: ['autodocs'],
    argTypes: {
        text: {
            control: 'text',
            description: 'The text label content',
        },
    },
    args: {
        text: 'Label text',
    },
};

export default meta;
type Story = StoryObj<LabelStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        imports: [HlmLabel],
        template: `
            <label hlmLabel>
                {{ text }}
            </label>
        `,
    }),
};

export const WithInput: Story = {
    render: () => ({
        imports: [HlmLabel, HlmInput],
        template: `
            <div class="flex flex-col gap-1.5 w-80">
                <label hlmLabel for="username">Username</label>
                <input hlmInput id="username" placeholder="Type your username..." />
            </div>
        `,
    }),
};

export const Required: Story = {
    render: () => ({
        imports: [HlmLabel, HlmInput],
        template: `
            <div class="flex flex-col gap-1.5 w-80">
                <label hlmLabel for="required-field">
                    Full Name <span class="text-destructive">*</span>
                </label>
                <input hlmInput id="required-field" placeholder="John Doe" />
            </div>
        `,
    }),
};
