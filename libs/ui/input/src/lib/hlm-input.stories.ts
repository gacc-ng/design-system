import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmInput, type InputVariants } from './hlm-input';

interface InputStoryArgs {
    size: NonNullable<InputVariants['size']>;
    placeholder: string;
    disabled: boolean;
    type: string;
}

const meta: Meta<InputStoryArgs> = {
    title: 'Primitives/Input',
    component: HlmInput,
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
            description: 'The height and typography dimension size of the input field.',
            table: {
                category: 'Inputs',
                type: { summary: 'InputVariants["size"]' },
                defaultValue: { summary: "'default'" },
            },
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text displayed when the input is empty.',
            table: {
                category: 'Inputs',
                type: { summary: 'string' },
                defaultValue: { summary: "'Enter text...'" },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the input field is interactively disabled.',
            table: {
                category: 'Inputs',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'file'],
            description: 'Native HTML input type.',
            table: {
                category: 'Inputs',
                type: { summary: 'string' },
                defaultValue: { summary: "'text'" },
            },
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
            <div class="flex flex-col gap-1.5 w-80">
                <label hlmLabel for="email-field">Email address</label>
                <input hlmInput id="email-field" type="email" placeholder="user@example.com" />
                <p class="text-xs text-muted-foreground">We will never share your email with third parties.</p>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-1.5 w-80">
                <label hlmLabel for="disabled-input">Disabled Field</label>
                <input hlmInput id="disabled-input" disabled value="Readonly content" />
            </div>
        `,
    }),
};

export const File: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-1.5 w-80">
                <label hlmLabel for="file-upload">Resume Attachment</label>
                <input hlmInput id="file-upload" type="file" />
            </div>
        `,
    }),
};
