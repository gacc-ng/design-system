import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmMessage, HlmMessageImports } from './hlm-message';

const meta: Meta<HlmMessage> = {
    title: 'Chat & AI/Message',
    component: HlmMessage,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmMessageImports],
        }),
    ],
    argTypes: {
        align: {
            control: 'select',
            options: ['start', 'end'],
        },
    },
};

export default meta;
type Story = StoryObj<HlmMessage>;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="flex w-full max-w-lg flex-col gap-6 p-6">
                <div hlmMessageGroup>
                    <div hlmMessage align="start">
                        <div hlmMessageAvatar class="bg-primary/10 text-primary size-8 font-semibold">
                            AI
                        </div>
                        <div hlmMessageContent>
                            <div hlmMessageHeader>Assistant</div>
                            <div class="bg-muted rounded-xl p-3">Hello! How can I assist you with your project today?</div>
                            <div hlmMessageFooter>10:42 AM</div>
                        </div>
                    </div>

                    <div hlmMessage align="end">
                        <div hlmMessageAvatar class="bg-secondary text-secondary-foreground size-8 font-semibold">
                            ME
                        </div>
                        <div hlmMessageContent>
                            <div hlmMessageHeader>User</div>
                            <div class="bg-primary text-primary-foreground rounded-xl p-3">Could you review the architecture for the new primitives?</div>
                            <div hlmMessageFooter>10:43 AM</div>
                        </div>
                    </div>
                </div>
            </div>
        `,
    }),
};
