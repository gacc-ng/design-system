import { signal } from '@angular/core';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmSliderImports } from '../index';

import { HlmSlider } from './hlm-slider';

interface SliderStoryArgs {
    disabled: boolean;
    showTicks: boolean;
    step: number;
}

const meta: Meta<SliderStoryArgs> = {
    title: 'Forms/Slider',
    component: HlmSlider,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSliderImports],
        }),
    ],
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'Whether the slider is interactively disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        showTicks: {
            control: 'boolean',
            description: 'Whether step tick indicators are displayed along the track.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        step: {
            control: 'number',
            description: 'The stepping interval for slider value increments.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '10' },
            },
        },
    },
    args: {
        disabled: false,
        showTicks: false,
        step: 10,
    },
};

export default meta;
type Story = StoryObj<SliderStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: {
            ...args,
            value: signal([50]),
        },
        template: `
            <div class="p-8 flex justify-center w-full max-w-md mx-auto">
                <hlm-slider [value]="value()" [disabled]="disabled" [showTicks]="showTicks" [step]="step" />
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
