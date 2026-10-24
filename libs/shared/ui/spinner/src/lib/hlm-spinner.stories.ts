import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmSpinner } from './hlm-spinner';

interface SpinnerStoryArgs {
    ariaLabel: string;
}

const meta: Meta<SpinnerStoryArgs> = {
    title: 'Primitives/Spinner',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSpinner, HlmButton],
        }),
    ],
    argTypes: {
        ariaLabel: {
            control: 'text',
            description: 'Accessibility aria-label for assistive screen readers',
        },
    },
    args: {
        ariaLabel: 'Loading...',
    },
};

export default meta;
type Story = StoryObj<SpinnerStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="flex items-center gap-4 text-primary">
                <hlm-spinner [aria-label]="ariaLabel" />
            </div>
        `,
    }),
};

export const InsideButton: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-4">
                <button hlmBtn disabled>
                    <hlm-spinner class="mr-2" />
                    Please wait
                </button>
                <button hlmBtn variant="outline" disabled>
                    <hlm-spinner class="mr-2" />
                    Saving changes
                </button>
            </div>
        `,
    }),
};

export const CustomColors: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-6">
                <hlm-spinner class="text-primary text-xl" />
                <hlm-spinner class="text-destructive text-xl" />
                <hlm-spinner class="text-muted-foreground text-xl" />
            </div>
        `,
    }),
};
