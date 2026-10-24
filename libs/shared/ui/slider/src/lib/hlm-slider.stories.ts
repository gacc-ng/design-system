import { signal } from '@angular/core';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmSliderImports } from '../index';

const meta: Meta = {
    title: 'Primitives/Slider',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSliderImports],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        props: {
            value: signal([50]),
        },
        template: `
            <div class="p-8 flex justify-center w-full max-w-md mx-auto">
                <hlm-slider [value]="value()" />
            </div>
        `,
    }),
};

export const Range: Story = {
    render: () => ({
        props: {
            value: signal([25, 75]),
        },
        template: `
            <div class="p-8 flex justify-center w-full max-w-md mx-auto">
                <hlm-slider [value]="value()" />
            </div>
        `,
    }),
};

export const WithTicks: Story = {
    render: () => ({
        props: {
            value: signal([60]),
        },
        template: `
            <div class="p-8 flex justify-center w-full max-w-md mx-auto">
                <hlm-slider [value]="value()" [showTicks]="true" [step]="20" />
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        props: {
            value: signal([40]),
        },
        template: `
            <div class="p-8 flex justify-center w-full max-w-md mx-auto">
                <hlm-slider [value]="value()" [disabled]="true" />
            </div>
        `,
    }),
};

export const Vertical: Story = {
    render: () => ({
        props: {
            value: signal([70]),
        },
        template: `
            <div class="p-8 flex justify-center h-64">
                <hlm-slider [value]="value()" orientation="vertical" />
            </div>
        `,
    }),
};
