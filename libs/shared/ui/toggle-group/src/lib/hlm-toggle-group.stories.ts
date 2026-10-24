import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmToggleGroup } from './hlm-toggle-group';
import { HlmToggleGroupItem } from './hlm-toggle-group-item';

interface ToggleGroupStoryArgs {
    variant: 'default' | 'outline';
    size: 'default' | 'sm' | 'lg';
    orientation: 'horizontal' | 'vertical';
    spacing: number;
}

const meta: Meta<ToggleGroupStoryArgs> = {
    title: 'Primitives/ToggleGroup',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmToggleGroup, HlmToggleGroupItem],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline'],
            description: 'Visual variant for the whole group',
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg'],
            description: 'Size of the toggle items',
        },
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Layout orientation',
        },
        spacing: {
            control: 'number',
            description: 'Spacing between items',
        },
    },
    args: {
        variant: 'default',
        size: 'default',
        orientation: 'horizontal',
        spacing: 0,
    },
};

export default meta;
type Story = StoryObj<ToggleGroupStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-toggle-group [variant]="variant" [size]="size" [orientation]="orientation" [spacing]="spacing" value="bold">
                <button hlmToggleGroupItem value="bold" aria-label="Toggle bold">
                    <span class="font-bold">B</span>
                </button>
                <button hlmToggleGroupItem value="italic" aria-label="Toggle italic">
                    <span class="italic">I</span>
                </button>
                <button hlmToggleGroupItem value="underline" aria-label="Toggle underline">
                    <span class="underline">U</span>
                </button>
            </hlm-toggle-group>
        `,
    }),
};

export const Outline: Story = {
    args: {
        variant: 'outline',
    },
    render: (args) => ({
        props: args,
        template: `
            <hlm-toggle-group [variant]="variant" [size]="size" [orientation]="orientation" [spacing]="spacing" value="center">
                <button hlmToggleGroupItem value="left" aria-label="Align left">Left</button>
                <button hlmToggleGroupItem value="center" aria-label="Align center">Center</button>
                <button hlmToggleGroupItem value="right" aria-label="Align right">Right</button>
                <button hlmToggleGroupItem value="justify" aria-label="Align justify">Justify</button>
            </hlm-toggle-group>
        `,
    }),
};

export const WithSpacing: Story = {
    args: {
        variant: 'outline',
        spacing: 2,
    },
    render: (args) => ({
        props: args,
        template: `
            <hlm-toggle-group [variant]="variant" [size]="size" [orientation]="orientation" [spacing]="spacing" value="day">
                <button hlmToggleGroupItem value="day">Day</button>
                <button hlmToggleGroupItem value="week">Week</button>
                <button hlmToggleGroupItem value="month">Month</button>
                <button hlmToggleGroupItem value="year">Year</button>
            </hlm-toggle-group>
        `,
    }),
};

export const Vertical: Story = {
    args: {
        variant: 'outline',
        orientation: 'vertical',
    },
    render: (args) => ({
        props: args,
        template: `
            <hlm-toggle-group [variant]="variant" [size]="size" [orientation]="orientation" [spacing]="spacing" value="top">
                <button hlmToggleGroupItem value="top">Top</button>
                <button hlmToggleGroupItem value="middle">Middle</button>
                <button hlmToggleGroupItem value="bottom">Bottom</button>
            </hlm-toggle-group>
        `,
    }),
};
