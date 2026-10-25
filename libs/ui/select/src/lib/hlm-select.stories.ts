import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmSelectImports } from '../index';

const meta: Meta = {
    title: 'Primitives/Select',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSelectImports],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        props: {
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
                <hlm-select [itemToString]="itemToString">
                    <hlm-select-trigger class="w-56">
                        <hlm-select-value placeholder="Select a fruit" />
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
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
                { label: 'System', value: 'system' },
            ],
            itemToString: (value: string) =>
                ({
                    light: 'Light',
                    dark: 'Dark',
                    system: 'System',
                })[value] ?? '',
        },
        template: `
            <div class="p-8 flex justify-center">
                <hlm-select [itemToString]="itemToString">
                    <hlm-select-trigger size="sm" class="w-48">
                        <hlm-select-value placeholder="Select theme" />
                    </hlm-select-trigger>
                    <hlm-select-content *hlmSelectPortal>
                        <hlm-select-group>
                            <hlm-select-label>Theme</hlm-select-label>
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
        template: `
            <div class="p-8 flex justify-center">
                <hlm-select [disabled]="true">
                    <hlm-select-trigger class="w-56">
                        <hlm-select-value placeholder="Select option" />
                    </hlm-select-trigger>
                    <hlm-select-content *hlmSelectPortal>
                        <hlm-select-group>
                            <hlm-select-item value="1">Disabled</hlm-select-item>
                        </hlm-select-group>
                    </hlm-select-content>
                </hlm-select>
            </div>
        `,
    }),
};

export const Invalid: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <hlm-select>
                    <hlm-select-trigger [forceInvalid]="true" class="w-56">
                        <hlm-select-value placeholder="Required option" />
                    </hlm-select-trigger>
                    <hlm-select-content *hlmSelectPortal>
                        <hlm-select-group>
                            <hlm-select-item value="1">First option</hlm-select-item>
                        </hlm-select-group>
                    </hlm-select-content>
                </hlm-select>
            </div>
        `,
    }),
};
