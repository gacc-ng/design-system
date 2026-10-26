import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmCardImports } from '@gacc-ng/ui/card';

import { HlmCarousel, HlmCarouselImports } from './hlm-carousel';

const meta: Meta<HlmCarousel> = {
    title: 'Media & Display/Carousel',
    component: HlmCarousel,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmCarouselImports, HlmCardImports],
        }),
    ],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Orientation axis of the carousel slides',
        },
    },
};

export default meta;
type Story = StoryObj<HlmCarousel>;

export const Default: Story = {
    args: {
        orientation: 'horizontal',
    },
    render: (args) => ({
        props: {
            ...args,
            items: [1, 2, 3, 4, 5],
        },
        template: `
            <div class="flex w-full items-center justify-center p-8">
                <hlm-carousel class="w-full max-w-xs" [orientation]="orientation">
                    <hlm-carousel-content>
                        @for (item of items; track item) {
                            <hlm-carousel-item>
                                <div class="p-1">
                                    <section hlmCard>
                                        <p hlmCardContent class="flex aspect-square items-center justify-center p-6">
                                            <span class="text-4xl font-semibold">{{ item }}</span>
                                        </p>
                                    </section>
                                </div>
                            </hlm-carousel-item>
                        }
                    </hlm-carousel-content>
                    <button hlm-carousel-previous></button>
                    <button hlm-carousel-next></button>
                </hlm-carousel>
            </div>
        `,
    }),
};

export const MultiItemSizes: Story = {
    render: () => ({
        props: {
            items: [1, 2, 3, 4, 5, 6],
        },
        template: `
            <div class="flex w-full items-center justify-center p-8">
                <hlm-carousel class="w-full max-w-sm">
                    <hlm-carousel-content>
                        @for (item of items; track item) {
                            <hlm-carousel-item class="basis-1/2 lg:basis-1/3">
                                <div class="p-1">
                                    <section hlmCard>
                                        <p hlmCardContent class="flex aspect-square items-center justify-center p-4">
                                            <span class="text-2xl font-bold">{{ item }}</span>
                                        </p>
                                    </section>
                                </div>
                            </hlm-carousel-item>
                        }
                    </hlm-carousel-content>
                    <button hlm-carousel-previous></button>
                    <button hlm-carousel-next></button>
                </hlm-carousel>
            </div>
        `,
    }),
};

export const Vertical: Story = {
    render: () => ({
        props: {
            items: ['A', 'B', 'C', 'D'],
        },
        template: `
            <div class="flex w-full items-center justify-center p-8">
                <hlm-carousel class="w-full max-w-xs" orientation="vertical">
                    <hlm-carousel-content class="-mt-1 h-[260px]">
                        @for (item of items; track item) {
                            <hlm-carousel-item class="basis-1/2 pt-1">
                                <div class="p-1">
                                    <section hlmCard>
                                        <p hlmCardContent class="flex aspect-square items-center justify-center p-4">
                                            <span class="text-3xl font-semibold">{{ item }}</span>
                                        </p>
                                    </section>
                                </div>
                            </hlm-carousel-item>
                        }
                    </hlm-carousel-content>
                    <button hlm-carousel-previous></button>
                    <button hlm-carousel-next></button>
                </hlm-carousel>
            </div>
        `,
    }),
};

export const WithSlideDisplay: Story = {
    render: () => ({
        props: {
            items: ['Step 1: Ideation', 'Step 2: Prototype', 'Step 3: Verification', 'Step 4: Release'],
        },
        template: `
            <div class="flex w-full items-center justify-center p-8">
                <hlm-carousel class="w-full max-w-xs">
                    <hlm-carousel-content>
                        @for (item of items; track item) {
                            <hlm-carousel-item>
                                <div class="p-1">
                                    <section hlmCard>
                                        <p hlmCardContent class="flex aspect-video items-center justify-center p-4 text-center font-medium">
                                            {{ item }}
                                        </p>
                                    </section>
                                </div>
                            </hlm-carousel-item>
                        }
                    </hlm-carousel-content>
                    <button hlm-carousel-previous></button>
                    <button hlm-carousel-next></button>
                    <hlm-carousel-slide-display class="mt-2 flex justify-end" />
                </hlm-carousel>
            </div>
        `,
    }),
};
