import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmProgressImports } from '../index';

interface ProgressStoryArgs {
    value: number;
    max: number;
}

const meta: Meta<ProgressStoryArgs> = {
    title: 'Primitives/Progress',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmProgressImports],
        }),
    ],
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
            description: 'The progress value (between 0 and max).',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '60' },
            },
        },
        max: {
            control: { type: 'number' },
            description: 'The maximum progress value.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '100' },
            },
        },
    },
    args: {
        value: 60,
        max: 100,
    },
};

export default meta;
type Story = StoryObj<ProgressStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="w-80 max-w-full">
                <hlm-progress [value]="value" [max]="max">
                    <hlm-progress-indicator />
                </hlm-progress>
            </div>
        `,
    }),
};

export const Indeterminate: Story = {
    render: () => ({
        template: `
            <div class="w-80 max-w-full">
                <hlm-progress>
                    <hlm-progress-indicator />
                </hlm-progress>
            </div>
        `,
    }),
};

export const CustomWidths: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-4 w-full max-w-md">
                <hlm-progress class="w-32" [value]="25">
                    <hlm-progress-indicator />
                </hlm-progress>
                <hlm-progress class="w-64" [value]="50">
                    <hlm-progress-indicator />
                </hlm-progress>
                <hlm-progress class="w-full" [value]="75">
                    <hlm-progress-indicator />
                </hlm-progress>
            </div>
        `,
    }),
};
