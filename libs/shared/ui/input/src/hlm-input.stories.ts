import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmLabel } from '../../label/src/hlm-label';

import { HlmInput, type InputVariants } from './hlm-input';

interface InputStoryArgs {
    size: NonNullable<InputVariants['size']>;
    placeholder: string;
    disabled: boolean;
    type: string;
}

const meta: Meta<InputStoryArgs> = {
    title: 'Primitives/Input',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmInput, HlmLabel],
        }),
    ],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg'],
            description: 'The height and typography size of the input field',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text displayed when the input is empty',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the input field is interactively disabled',
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number'],
            description: 'Native HTML input type',
        },
    },
    args: {
        size: 'default',
        placeholder: 'Enter text...',
        disabled: false,
        type: 'text',
    },
};

export default meta;
type Story = StoryObj<InputStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="w-80">
                <input
                    hlmInput
                    [type]="type"
                    [size]="size"
                    [placeholder]="placeholder"
                    [disabled]="disabled"
                />
            </div>
        `,
    }),
};

export const AllSizes: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-4 w-80">
                <div>
                    <span class="text-xs text-muted-foreground mb-1 block">Small (h-8)</span>
                    <input hlmInput size="sm" placeholder="Small input..." />
                </div>
                <div>
                    <span class="text-xs text-muted-foreground mb-1 block">Default (h-9)</span>
                    <input hlmInput size="default" placeholder="Default input..." />
                </div>
                <div>
                    <span class="text-xs text-muted-foreground mb-1 block">Large (h-10)</span>
                    <input hlmInput size="lg" placeholder="Large input..." />
                </div>
            </div>
        `,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-2 w-80">
                <label hlmLabel for="email-input">Email address</label>
                <input hlmInput id="email-input" type="email" placeholder="john@example.com" />
                <p class="text-xs text-muted-foreground">We will never share your email with anyone else.</p>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled input field',
    },
    render: (args) => ({
        props: args,
        template: `
            <div class="w-80">
                <input
                    hlmInput
                    [type]="type"
                    [size]="size"
                    [placeholder]="placeholder"
                    [disabled]="disabled"
                />
            </div>
        `,
    }),
};
