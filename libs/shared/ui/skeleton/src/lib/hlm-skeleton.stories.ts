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

export const ProfileCardSkeleton: Story = {
    render: () => ({
        template: `
            <div class="flex items-center space-x-4 w-80">
                <hlm-skeleton class="h-12 w-12 rounded-full" />
                <div class="space-y-2 flex-1">
                    <hlm-skeleton class="h-4 w-full" />
                    <hlm-skeleton class="h-4 w-3/4" />
                </div>
            </div>
        `,
    }),
};

export const FeedCardSkeleton: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col space-y-3 w-80">
                <hlm-skeleton class="h-32 w-full rounded-xl" />
                <div class="space-y-2">
                    <hlm-skeleton class="h-4 w-4/5" />
                    <hlm-skeleton class="h-4 w-3/5" />
                </div>
            </div>
        `,
    }),
};
