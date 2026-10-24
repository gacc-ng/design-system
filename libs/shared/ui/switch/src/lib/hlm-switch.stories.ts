import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmSwitch } from './hlm-switch';
import { HlmSwitchThumb } from './hlm-switch-thumb';

interface SwitchStoryArgs {
    checked: boolean;
    disabled: boolean;
    size: 'default' | 'sm';
}

const meta: Meta<SwitchStoryArgs> = {
    title: 'Primitives/Switch',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSwitch, HlmSwitchThumb, HlmLabel],
        }),
    ],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'The checked on/off state of the switch',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the switch is interactively disabled',
        },
        size: {
            control: 'select',
            options: ['default', 'sm'],
            description: 'The physical size dimension of the switch toggle',
        },
    },
    args: {
        checked: false,
        disabled: false,
        size: 'default',
    },
};

export default meta;
type Story = StoryObj<SwitchStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-switch [checked]="checked" [disabled]="disabled" [size]="size" />
        `,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        template: `
            <div class="flex items-center space-x-3">
                <hlm-switch id="airplane-mode" />
                <label hlmLabel for="airplane-mode">Airplane Mode</label>
            </div>
        `,
    }),
};

export const AllSizes: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex items-center space-x-3">
                    <hlm-switch id="switch-default" size="default" [checked]="true" />
                    <label hlmLabel for="switch-default">Default Size (checked)</label>
                </div>
                <div class="flex items-center space-x-3">
                    <hlm-switch id="switch-sm" size="sm" [checked]="true" />
                    <label hlmLabel for="switch-sm">Small Size (checked)</label>
                </div>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    args: {
        disabled: true,
        checked: true,
    },
    render: (args) => ({
        props: args,
        template: `
            <div class="flex flex-col gap-3">
                <div class="flex items-center space-x-3">
                    <hlm-switch id="disabled-checked" [checked]="true" [disabled]="true" />
                    <label hlmLabel for="disabled-checked" class="text-muted-foreground">Disabled (checked)</label>
                </div>
                <div class="flex items-center space-x-3">
                    <hlm-switch id="disabled-unchecked" [checked]="false" [disabled]="true" />
                    <label hlmLabel for="disabled-unchecked" class="text-muted-foreground">Disabled (unchecked)</label>
                </div>
            </div>
        `,
    }),
};
