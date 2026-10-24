import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmTextarea } from './hlm-textarea';

interface TextareaStoryArgs {
    placeholder: string;
    disabled: boolean;
}

const meta: Meta<TextareaStoryArgs> = {
    title: 'Primitives/Textarea',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmTextarea, HlmLabel],
        }),
    ],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the textarea is disabled',
        },
    },
    args: {
        placeholder: 'Type your message here...',
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<TextareaStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="w-80">
                <textarea hlmTextarea [placeholder]="placeholder" [disabled]="disabled"></textarea>
            </div>
        `,
    }),
};

export const WithLabel: Story = {
    render: () => ({
        template: `
            <div class="w-80 space-y-1.5">
                <label hlmLabel for="feedback">Your Feedback</label>
                <textarea hlmTextarea id="feedback" placeholder="Tell us how we can improve our design system..."></textarea>
                <p class="text-xs text-muted-foreground">Your comments will be sent to the core architecture team.</p>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="w-80 space-y-1.5">
                <label hlmLabel for="disabled-textarea" class="text-muted-foreground">Archived Note</label>
                <textarea hlmTextarea id="disabled-textarea" disabled placeholder="This note cannot be edited."></textarea>
            </div>
        `,
    }),
};
