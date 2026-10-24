import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmSkeleton } from './hlm-skeleton';

interface SkeletonStoryArgs {
    width: string;
    height: string;
}

const meta: Meta<SkeletonStoryArgs> = {
    title: 'Primitives/Skeleton',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSkeleton],
        }),
    ],
    argTypes: {
        width: {
            control: 'text',
            description: 'Custom width class for the skeleton placeholder',
        },
        height: {
            control: 'text',
            description: 'Custom height class for the skeleton placeholder',
        },
    },
    args: {
        width: 'w-48',
        height: 'h-4',
    },
};

export default meta;
type Story = StoryObj<SkeletonStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-skeleton [class]="height + ' ' + width" />
        `,
    }),
};

export const Preview: Story = {
    name: 'Official Preview',
    render: () => ({
        template: `
            <div class="flex items-center gap-4">
                <hlm-skeleton class="size-12 rounded-full" />
                <div class="space-y-2">
                    <hlm-skeleton class="h-4 w-[250px]" />
                    <hlm-skeleton class="h-4 w-[200px]" />
                </div>
            </div>
        `,
    }),
};

export const CardSkeleton: Story = {
    render: () => ({
        template: `
            <div class="rounded-xl border border-border bg-card p-6 shadow-sm w-full max-w-xs space-y-4">
                <div class="space-y-2">
                    <hlm-skeleton class="h-4 w-2/3" />
                    <hlm-skeleton class="h-4 w-1/2" />
                </div>
                <hlm-skeleton class="aspect-video w-full" />
            </div>
        `,
    }),
};

export const FormSkeleton: Story = {
    render: () => ({
        template: `
            <div class="flex w-full max-w-xs flex-col gap-6">
                <div class="flex flex-col gap-2">
                    <hlm-skeleton class="h-4 w-20" />
                    <hlm-skeleton class="h-9 w-full" />
                </div>
                <div class="flex flex-col gap-2">
                    <hlm-skeleton class="h-4 w-24" />
                    <hlm-skeleton class="h-9 w-full" />
                </div>
                <hlm-skeleton class="h-9 w-24" />
            </div>
        `,
    }),
};

export const TableSkeleton: Story = {
    render: () => ({
        template: `
            <div class="flex w-full max-w-md flex-col gap-3">
                <div class="flex gap-4 border-b border-border pb-2">
                    <hlm-skeleton class="h-4 flex-1" />
                    <hlm-skeleton class="h-4 w-24" />
                    <hlm-skeleton class="h-4 w-20" />
                </div>
                <div class="flex gap-4 py-1">
                    <hlm-skeleton class="h-4 flex-1" />
                    <hlm-skeleton class="h-4 w-24" />
                    <hlm-skeleton class="h-4 w-20" />
                </div>
                <div class="flex gap-4 py-1">
                    <hlm-skeleton class="h-4 flex-1" />
                    <hlm-skeleton class="h-4 w-24" />
                    <hlm-skeleton class="h-4 w-20" />
                </div>
                <div class="flex gap-4 py-1">
                    <hlm-skeleton class="h-4 flex-1" />
                    <hlm-skeleton class="h-4 w-24" />
                    <hlm-skeleton class="h-4 w-20" />
                </div>
            </div>
        `,
    }),
};
