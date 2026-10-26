import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmSwitch } from './hlm-switch';
import { HlmSwitchThumb } from './hlm-switch-thumb';

interface SwitchStoryArgs {
    checked: boolean;
    disabled: boolean;
    size: 'default' | 'sm';
}

const meta: Meta<SwitchStoryArgs> = {
    title: 'Forms/Switch',
    component: HlmSwitch,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSwitch, HlmSwitchThumb, HlmLabel],
        }),
    ],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'The checked active state of the toggle switch.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the switch is interactively disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        size: {
            control: 'select',
            options: ['default', 'sm'],
            description: 'The physical size dimension of the switch.',
            table: {
                type: { summary: "'default' | 'sm'" },
                defaultValue: { summary: "'default'" },
            },
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
            <hlm-switch [checked]="checked" [disabled]="disabled" [size]="size">
                <hlm-switch-thumb />
            </hlm-switch>
        `,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        template: `
            <div class="flex items-center space-x-3">
                <hlm-switch id="airplane-mode">
                    <hlm-switch-thumb />
                </hlm-switch>
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
                    <hlm-switch id="switch-default" size="default" [checked]="true">
                        <hlm-switch-thumb />
                    </hlm-switch>
                    <label hlmLabel for="switch-default">Default Size (checked)</label>
                </div>
                <div class="flex items-center space-x-3">
                    <hlm-switch id="switch-sm" size="sm" [checked]="true">
                        <hlm-switch-thumb />
                    </hlm-switch>
                    <label hlmLabel for="switch-sm">Small Size (checked)</label>
                </div>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-4">
                <div class="flex items-center space-x-3">
                    <hlm-switch id="switch-disabled-off" [disabled]="true" [checked]="false">
                        <hlm-switch-thumb />
                    </hlm-switch>
                    <label hlmLabel for="switch-disabled-off" class="text-muted-foreground">Disabled (Off)</label>
                </div>
                <div class="flex items-center space-x-3">
                    <hlm-switch id="switch-disabled-on" [disabled]="true" [checked]="true">
                        <hlm-switch-thumb />
                    </hlm-switch>
                    <label hlmLabel for="switch-disabled-on" class="text-muted-foreground">Disabled (On)</label>
                </div>
            </div>
        `,
    }),
};
