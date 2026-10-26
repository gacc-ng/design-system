import { FormsModule } from '@angular/forms';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmNativeSelectImports } from '../index';

import { HlmNativeSelect } from './hlm-native-select';

interface NativeSelectStoryArgs {
    size: 'default' | 'sm';
    disabled: boolean;
}

const meta: Meta<NativeSelectStoryArgs> = {
    title: 'Forms/Native Select',
    component: HlmNativeSelect,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmNativeSelectImports, FormsModule],
        }),
    ],
    argTypes: {
        size: {
            control: 'radio',
            options: ['default', 'sm'],
            description: 'The visual size of the native select.',
            table: {
                type: { summary: "'default' | 'sm'" },
                defaultValue: { summary: "'default'" },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the select is disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
    args: {
        size: 'default',
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<NativeSelectStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-native-select [size]="size" [disabled]="disabled">
                <option hlmNativeSelectOption value="">Select a framework</option>
                <option hlmNativeSelectOption value="angular">Angular</option>
                <option hlmNativeSelectOption value="react">React</option>
                <option hlmNativeSelectOption value="vue">Vue</option>
                <option hlmNativeSelectOption value="svelte">Svelte</option>
            </hlm-native-select>
        `,
    }),
};

export const WithOptGroup: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-native-select [size]="size" [disabled]="disabled">
                <option hlmNativeSelectOption value="">Select an option</option>
                <optgroup hlmNativeSelectOptGroup label="Frontend">
                    <option hlmNativeSelectOption value="angular">Angular</option>
                    <option hlmNativeSelectOption value="react">React</option>
                </optgroup>
                <optgroup hlmNativeSelectOptGroup label="Backend">
                    <option hlmNativeSelectOption value="nest">NestJS</option>
                    <option hlmNativeSelectOption value="fastify">Fastify</option>
                </optgroup>
            </hlm-native-select>
        `,
    }),
};

export const Small: Story = {
    args: {
        size: 'sm',
    },
    render: (args) => ({
        props: args,
        template: `
            <hlm-native-select [size]="size" [disabled]="disabled">
                <option hlmNativeSelectOption value="">Compact select</option>
                <option hlmNativeSelectOption value="1">Option 1</option>
                <option hlmNativeSelectOption value="2">Option 2</option>
            </hlm-native-select>
        `,
    }),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: (args) => ({
        props: args,
        template: `
            <hlm-native-select [size]="size" [disabled]="disabled">
                <option hlmNativeSelectOption value="locked">Disabled selection</option>
            </hlm-native-select>
        `,
    }),
};
