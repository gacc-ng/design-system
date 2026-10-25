import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmCheckbox } from './hlm-checkbox';

interface CheckboxStoryArgs {
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;
    required: boolean;
}

const meta: Meta<CheckboxStoryArgs> = {
    title: 'Primitives/Checkbox',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmCheckbox, HlmLabel],
        }),
    ],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Whether the checkbox is checked',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is interactively disabled',
        },
        indeterminate: {
            control: 'boolean',
            description: 'Whether the checkbox is in an indeterminate tri-state',
        },
        required: {
            control: 'boolean',
            description: 'Whether the checkbox is required in a form',
        },
    },
    args: {
        checked: false,
        disabled: false,
        indeterminate: false,
        required: false,
    },
};

export default meta;
type Story = StoryObj<CheckboxStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-checkbox
                [checked]="checked"
                [disabled]="disabled"
                [indeterminate]="indeterminate"
                [required]="required"
                aria-label="Toggle setting"
            />
        `,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        template: `
            <div class="flex items-center space-x-2">
                <hlm-checkbox inputId="terms" />
                <label hlmLabel for="terms">Accept terms and conditions</label>
            </div>
        `,
    }),
};

export const Indeterminate: Story = {
    render: () => ({
        template: `
            <div class="flex items-center space-x-2">
                <hlm-checkbox inputId="select-all" [indeterminate]="true" />
                <label hlmLabel for="select-all">Select all items</label>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-3">
                <div class="flex items-center space-x-2">
                    <hlm-checkbox inputId="dis-checked" [checked]="true" [disabled]="true" />
                    <label hlmLabel for="dis-checked" class="text-muted-foreground">Disabled checked</label>
                </div>
                <div class="flex items-center space-x-2">
                    <hlm-checkbox inputId="dis-unchecked" [checked]="false" [disabled]="true" />
                    <label hlmLabel for="dis-unchecked" class="text-muted-foreground">Disabled unchecked</label>
                </div>
            </div>
        `,
    }),
};
