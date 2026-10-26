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
    component: HlmCheckbox,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmCheckbox, HlmLabel],
        }),
    ],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Whether the checkbox is checked.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is interactively disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        indeterminate: {
            control: 'boolean',
            description: 'Whether the checkbox is rendered in an indeterminate tri-state.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        required: {
            control: 'boolean',
            description: 'Whether the checkbox is required for form submission.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
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
                <hlm-checkbox inputId="parent-select" [indeterminate]="true" />
                <label hlmLabel for="parent-select">Select all permissions (partially selected)</label>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-3">
                <div class="flex items-center space-x-2">
                    <hlm-checkbox inputId="disabled-unchecked" [disabled]="true" [checked]="false" />
                    <label hlmLabel for="disabled-unchecked" class="text-muted-foreground">Disabled unchecked</label>
                </div>
                <div class="flex items-center space-x-2">
                    <hlm-checkbox inputId="disabled-checked" [disabled]="true" [checked]="true" />
                    <label hlmLabel for="disabled-checked" class="text-muted-foreground">Disabled checked</label>
                </div>
            </div>
        `,
    }),
};

export const CardSelection: Story = {
    render: () => ({
        template: `
            <div class="w-80 rounded-xl border border-border p-4 flex items-start space-x-3 bg-card shadow-xs">
                <hlm-checkbox inputId="newsletter" class="mt-0.5" />
                <div class="grid gap-1">
                    <label hlmLabel for="newsletter" class="font-medium cursor-pointer">Security Announcements</label>
                    <p class="text-xs text-muted-foreground">Receive zero-day vulnerability alerts and release notices directly.</p>
                </div>
            </div>
        `,
    }),
};
