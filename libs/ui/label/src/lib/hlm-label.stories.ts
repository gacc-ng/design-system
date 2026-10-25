import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmInput } from '@gacc-ng/ui/input';

import { HlmLabel } from './hlm-label';

interface LabelStoryArgs {
    text: string;
}

const meta: Meta<LabelStoryArgs> = {
    title: 'Primitives/Label',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmLabel, HlmInput],
        }),
    ],
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
        template: `
            <label hlmLabel>
                {{ text }}
            </label>
        `,
    }),
};

export const WithInput: Story = {
    render: () => ({
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
