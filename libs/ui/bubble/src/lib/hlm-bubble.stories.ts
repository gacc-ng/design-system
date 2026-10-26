import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmBubble, HlmBubbleImports } from './hlm-bubble';

const meta: Meta<HlmBubble> = {
    title: 'Chat & AI/Bubble',
    component: HlmBubble,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmBubbleImports],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'secondary', 'muted', 'tinted', 'outline', 'ghost', 'destructive'],
        },
        align: {
            control: 'select',
            options: ['start', 'end'],
        },
    },
};

export default meta;
type Story = StoryObj<HlmBubble>;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="flex w-full max-w-sm flex-col gap-6 p-6">
                <div hlmBubble align="end">
                    <div hlmBubbleContent>Hey there! Did you inspect the logs?</div>
                </div>

                <div hlmBubbleGroup>
                    <div hlmBubble variant="muted">
                        <div hlmBubbleContent>Yes, found the issue in package.json.</div>
                    </div>
                    <div hlmBubble variant="muted">
                        <div hlmBubbleContent>It is completely fixed now.</div>
                        <div hlmBubbleReactions>
                            <span>🚀</span>
                            <span>🎉</span>
                        </div>
                    </div>
                </div>

                <div hlmBubble align="end">
                    <div hlmBubbleContent>Awesome, ship it!</div>
                </div>
            </div>
        `,
    }),
};

export const Variants: Story = {
    render: () => ({
        template: `
            <div class="grid w-full max-w-md gap-4 p-6">
                <div hlmBubble variant="default">
                    <div hlmBubbleContent>Default Variant (Primary)</div>
                </div>
                <div hlmBubble variant="secondary">
                    <div hlmBubbleContent>Secondary Variant</div>
                </div>
                <div hlmBubble variant="muted">
                    <div hlmBubbleContent>Muted Variant</div>
                </div>
                <div hlmBubble variant="tinted">
                    <div hlmBubbleContent>Tinted Variant</div>
                </div>
                <div hlmBubble variant="outline">
                    <div hlmBubbleContent>Outline Variant</div>
                </div>
                <div hlmBubble variant="ghost">
                    <div hlmBubbleContent>Ghost Variant</div>
                </div>
                <div hlmBubble variant="destructive">
                    <div hlmBubbleContent>Destructive Error Variant</div>
                </div>
            </div>
        `,
    }),
};
