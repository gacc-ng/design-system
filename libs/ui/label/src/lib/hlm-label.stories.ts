import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmInput } from '@gacc-ng/ui/input';

import { HlmLabel } from './hlm-label';

interface LabelStoryArgs {
    text: string;
    for: string;
}

const meta: Meta<LabelStoryArgs> = {
    title: 'Primitives/Label',
    component: HlmLabel,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmLabel, HlmInput],
        }),
    ],
    argTypes: {
        text: {
            control: 'text',
            description: 'The projected label text content.',
            table: {
                category: 'Slots',
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Label text'" },
            },
        },
        for: {
            control: 'text',
            description: 'The id of the target form element this label associates with.',
            table: {
                category: 'Brain Primitives',
                type: { summary: 'string' },
                defaultValue: { summary: "''" },
            },
        },
    },
    args: {
        text: 'Label text',
        for: 'username',
    },
};

export default meta;
type Story = StoryObj<LabelStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <label hlmLabel [attr.for]="for">
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

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-1.5 w-80">
                <label hlmLabel for="disabled-input">Disabled Field</label>
                <input hlmInput id="disabled-input" disabled placeholder="Cannot edit..." />
            </div>
        `,
    }),
};
