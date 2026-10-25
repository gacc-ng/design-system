import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmSelectImports } from '../index';

import { HlmSelect } from './hlm-select';

interface SelectStoryArgs {
    placeholder: string;
    disabled: boolean;
}

const meta: Meta<SelectStoryArgs> = {
    title: 'Primitives/Select',
    component: HlmSelect,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSelectImports],
        }),
    ],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Placeholder label rendered when no option is chosen.',
            table: {
                category: 'Inputs',
                type: { summary: 'string' },
                defaultValue: { summary: "'Select a fruit'" },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the select component is interactively disabled.',
            table: {
                category: 'Inputs',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
    args: {
        placeholder: 'Select a fruit',
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<SelectStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: {
            ...args,
            items: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Blueberry', value: 'blueberry' },
                { label: 'Grapes', value: 'grapes' },
                { label: 'Pineapple', value: 'pineapple' },
            ],
            itemToString: (value: string) =>
                ({
                    apple: 'Apple',
                    banana: 'Banana',
                    blueberry: 'Blueberry',
                    grapes: 'Grapes',
                    pineapple: 'Pineapple',
                })[value] ?? '',
        },
        template: `
            <div class="p-8 flex justify-center">
                <hlm-select [itemToString]="itemToString" [disabled]="disabled">
                    <hlm-select-trigger class="w-56">
                        <hlm-select-value [placeholder]="placeholder" />
                    </hlm-select-trigger>
                    <hlm-select-content *hlmSelectPortal>
                        <hlm-select-group>
                            <hlm-select-label>Fruits</hlm-select-label>
                            @for (item of items; track item.value) {
                                <hlm-select-item [value]="item.value">{{ item.label }}</hlm-select-item>
                            }
                        </hlm-select-group>
                    </hlm-select-content>
                </hlm-select>
            </div>
        `,
    }),
};

export const Small: Story = {
    render: () => ({
        props: {
            items: [
                { label: 'Small Option 1', value: 'opt1' },
                { label: 'Small Option 2', value: 'opt2' },
            ],
            itemToString: (v: string) => v,
        },
        template: `
            <div class="p-8 flex justify-center">
                <hlm-select [itemToString]="itemToString">
                    <hlm-select-trigger size="sm" class="w-48">
                        <hlm-select-value placeholder="Compact Select" />
                    </hlm-select-trigger>
                    <hlm-select-content *hlmSelectPortal>
                        <hlm-select-group>
                            @for (item of items; track item.value) {
                                <hlm-select-item [value]="item.value">{{ item.label }}</hlm-select-item>
                            }
                        </hlm-select-group>
                    </hlm-select-content>
                </hlm-select>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        props: {
            itemToString: (v: string) => v,
        },
        template: `
            <div class="p-8 flex justify-center">
                <hlm-select [itemToString]="itemToString" [disabled]="true">
                    <hlm-select-trigger class="w-56 opacity-50 cursor-not-allowed">
                        <hlm-select-value placeholder="Disabled select" />
                    </hlm-select-trigger>
                </hlm-select>
            </div>
        `,
    }),
};
