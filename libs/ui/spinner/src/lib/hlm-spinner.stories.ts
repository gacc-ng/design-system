import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmSpinner } from './hlm-spinner';

interface SpinnerStoryArgs {
    ariaLabel: string;
    icon: string;
}

const meta: Meta<SpinnerStoryArgs> = {
    title: 'Primitives/Spinner',
    component: HlmSpinner,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSpinner, HlmButton],
        }),
    ],
    argTypes: {
        ariaLabel: {
            control: 'text',
            description: 'Accessibility aria-label for assistive screen readers.',
            table: {
                category: 'Inputs',
                type: { summary: 'string' },
                defaultValue: { summary: "'Loading...'" },
            },
        },
        icon: {
            control: 'text',
            description: 'The name of the Lucide icon used for the animated spinner.',
            table: {
                category: 'Inputs',
                type: { summary: 'string' },
                defaultValue: { summary: "'lucideLoader2'" },
            },
        },
    },
    args: {
        ariaLabel: 'Loading...',
        icon: 'lucideLoader2',
    },
};

export default meta;
type Story = StoryObj<SpinnerStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="flex items-center gap-4 text-primary">
                <hlm-spinner [aria-label]="ariaLabel" [icon]="icon" />
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

export const AllSizes: Story = {
    render: () => ({
        template: `
            <div class="flex items-center gap-6">
                <hlm-spinner class="text-xs" />
                <hlm-spinner class="text-base" />
                <hlm-spinner class="text-xl" />
                <hlm-spinner class="text-3xl" />
            </div>
        `,
    }),
};
