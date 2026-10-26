import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmMessageScroller, HlmMessageScrollerImports } from './hlm-message-scroller';

const meta: Meta<HlmMessageScroller> = {
    title: 'Chat & AI/Message Scroller',
    component: HlmMessageScroller,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmMessageScrollerImports],
        }),
    ],
};

export default meta;
type Story = StoryObj<HlmMessageScroller>;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="border-border bg-card w-full max-w-md rounded-xl border shadow-sm">
                <div hlmMessageScrollerProvider autoScroll="smooth">
                    <div hlmMessageScroller class="h-80">
                        <div hlmMessageScrollerViewport>
                            <div hlmMessageScrollerContent>
                                <div hlmMessageScrollerItem messageId="1" class="bg-muted rounded-lg p-3 text-sm">
                                    Message 1: Initial user greeting.
                                </div>
                                <div hlmMessageScrollerItem messageId="2" class="bg-primary text-primary-foreground rounded-lg p-3 text-sm">
                                    Message 2: Assistant streaming explanation...
                                </div>
                                <div hlmMessageScrollerItem messageId="3" class="bg-muted rounded-lg p-3 text-sm">
                                    Message 3: Follow-up question with more content to trigger scroller.
                                </div>
                                <div hlmMessageScrollerItem messageId="4" class="bg-primary text-primary-foreground rounded-lg p-3 text-sm">
                                    Message 4: Streaming complete response.
                                </div>
                            </div>
                        </div>
                        <button hlmMessageScrollerButton aria-label="Scroll to bottom">
                            ↓
                        </button>
                    </div>
                </div>
            </div>
        `,
    }),
};
