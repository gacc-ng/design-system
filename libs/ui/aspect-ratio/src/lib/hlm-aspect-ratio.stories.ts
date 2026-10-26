import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmAspectRatio } from './hlm-aspect-ratio.directive';

interface AspectRatioStoryArgs {
    ratio: string | number;
}

const meta: Meta<AspectRatioStoryArgs> = {
    title: 'Layout/Aspect Ratio',
    component: HlmAspectRatio,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmAspectRatio],
        }),
    ],
    argTypes: {
        ratio: {
            control: 'text',
            description: 'The desired aspect ratio expressed as a number (e.g. 16/9) or divided string (e.g. "16/9").',
            table: {
                type: { summary: 'string | number' },
                defaultValue: { summary: '16/9' },
            },
        },
    },
    args: {
        ratio: '16/9',
    },
};

export default meta;
type Story = StoryObj<AspectRatioStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="w-[450px] overflow-hidden rounded-md border shadow-sm">
                <div [hlmAspectRatio]="ratio">
                    <img
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop&q=80"
                        alt="Landscape showcase"
                        class="size-full object-cover"
                    />
                </div>
            </div>
        `,
    }),
};

export const Square: Story = {
    render: () => ({
        template: `
            <div class="w-[250px] overflow-hidden rounded-md border shadow-sm">
                <div hlmAspectRatio="1/1">
                    <img
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop&q=80"
                        alt="Square landscape"
                        class="size-full object-cover"
                    />
                </div>
            </div>
        `,
    }),
};

export const Portrait: Story = {
    render: () => ({
        template: `
            <div class="w-[250px] overflow-hidden rounded-md border shadow-sm">
                <div hlmAspectRatio="9/16">
                    <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                        alt="Portrait portrait"
                        class="size-full object-cover"
                    />
                </div>
            </div>
        `,
    }),
};

export const Banner: Story = {
    render: () => ({
        template: `
            <div class="w-[600px] overflow-hidden rounded-md border shadow-sm">
                <div hlmAspectRatio="21/9">
                    <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80"
                        alt="Panoramic banner"
                        class="size-full object-cover"
                    />
                </div>
            </div>
        `,
    }),
};
