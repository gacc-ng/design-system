import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmToggle } from './hlm-toggle';

interface ToggleStoryArgs {
    variant: 'default' | 'outline';
    size: 'default' | 'sm' | 'lg';
    disabled: boolean;
}

const meta: Meta<ToggleStoryArgs> = {
    title: 'Primitives/Toggle',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmToggle],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline'],
            description: 'Visual variant of the toggle',
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg'],
            description: 'Size of the toggle',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the toggle is disabled',
        },
    },
    args: {
        variant: 'default',
        size: 'default',
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<ToggleStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <button hlmToggle [variant]="variant" [size]="size" [disabled]="disabled" aria-label="Toggle bold">
                <span class="font-bold">B</span>
            </button>
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
            <button hlmToggle [variant]="variant" [size]="size" [disabled]="disabled" aria-label="Toggle italic">
                <span class="italic">I</span>
            </button>
        `,
    }),
};

export const Sizes: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-3">
                <button hlmToggle size="sm" aria-label="Small">
                    <span>SM</span>
                </button>
                <button hlmToggle size="default" aria-label="Default">
                    <span>Default</span>
                </button>
                <button hlmToggle size="lg" aria-label="Large">
                    <span>LG</span>
                </button>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-3">
                <button hlmToggle disabled aria-label="Disabled default">
                    <span>Off</span>
                </button>
                <button hlmToggle variant="outline" disabled aria-label="Disabled outline">
                    <span>Outline</span>
                </button>
            </div>
        `,
    }),
};
