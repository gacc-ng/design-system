import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmTextarea } from './hlm-textarea';

interface TextareaStoryArgs {
    placeholder: string;
    disabled: boolean;
    rows: number;
}

const meta: Meta<TextareaStoryArgs> = {
    title: 'Forms/Textarea',
    component: HlmTextarea,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmTextarea, HlmLabel],
        }),
    ],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Placeholder text displayed when the textarea is empty.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: "'Type your message here...'" },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the textarea is interactively disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        rows: {
            control: 'number',
            description: 'The visible text lines height for the textarea.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '4' },
            },
        },
    },
    args: {
        placeholder: 'Type your message here...',
        disabled: false,
        rows: 4,
    },
};

export default meta;
type Story = StoryObj<TextareaStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="w-80">
                <textarea
                    hlmTextarea
                    [placeholder]="placeholder"
                    [disabled]="disabled"
                    [rows]="rows"
                ></textarea>
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

export const Resizable: Story = {
    render: () => ({
        template: `
            <div class="w-80 space-y-1.5">
                <label hlmLabel for="resizable-area">Custom Height</label>
                <textarea hlmTextarea id="resizable-area" class="min-h-36 resize-y" placeholder="Drag handle to expand..."></textarea>
            </div>
        `,
    }),
};
