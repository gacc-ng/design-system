import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmTooltip } from './hlm-tooltip';

interface TooltipStoryArgs {
    content: string;
    position: 'top' | 'bottom' | 'left' | 'right';
}

const meta: Meta<TooltipStoryArgs> = {
    title: 'Primitives/Tooltip',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmTooltip, HlmButton],
        }),
    ],
    argTypes: {
        content: {
            control: 'text',
            description: 'Tooltip textual content',
        },
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Tooltip placement relative to trigger',
        },
    },
    args: {
        content: 'Add to favorites',
        position: 'top',
    },
};

export default meta;
type Story = StoryObj<TooltipStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-12 flex justify-center">
                <button hlmBtn variant="outline" [hlmTooltip]="content" [position]="position">
                    Hover over me
                </button>
            </div>
        `,
    }),
};

export const AllPositions: Story = {
    render: () => ({
        template: `
            <div class="p-16 flex flex-wrap items-center justify-center gap-6">
                <button hlmBtn variant="outline" hlmTooltip="Tooltip on top" position="top">
                    Top
                </button>
                <button hlmBtn variant="outline" hlmTooltip="Tooltip on right" position="right">
                    Right
                </button>
                <button hlmBtn variant="outline" hlmTooltip="Tooltip on bottom" position="bottom">
                    Bottom
                </button>
                <button hlmBtn variant="outline" hlmTooltip="Tooltip on left" position="left">
                    Left
                </button>
            </div>
        `,
    }),
};
