import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmAttachment, HlmAttachmentImports } from './hlm-attachment';

const meta: Meta<HlmAttachment> = {
    title: 'Chat & AI/Attachment',
    component: HlmAttachment,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmAttachmentImports],
        }),
    ],
    argTypes: {
        state: {
            control: 'select',
            options: ['idle', 'uploading', 'processing', 'error', 'done'],
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg'],
        },
        layout: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
    },
};

export default meta;
type Story = StoryObj<HlmAttachment>;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-6">
                <div hlmAttachmentGroup>
                    <div hlmAttachment state="done">
                        <div hlmAttachmentMedia>
                            <span class="text-xl">📄</span>
                        </div>
                        <div hlmAttachmentContent>
                            <div hlmAttachmentTitle>architecture-rfc-126.pdf</div>
                            <div hlmAttachmentDescription>1.8 MB • Ready</div>
                        </div>
                        <div hlmAttachmentActions>
                            <button hlmAttachmentAction aria-label="Delete">✕</button>
                        </div>
                    </div>

                    <div hlmAttachment state="uploading">
                        <div hlmAttachmentMedia>
                            <span class="text-xl">📊</span>
                        </div>
                        <div hlmAttachmentContent>
                            <div hlmAttachmentTitle>metrics-report.csv</div>
                            <div hlmAttachmentDescription>Uploading 64%...</div>
                        </div>
                    </div>

                    <div hlmAttachment state="error">
                        <div hlmAttachmentMedia>
                            <span class="text-xl">⚠️</span>
                        </div>
                        <div hlmAttachmentContent>
                            <div hlmAttachmentTitle>failed-upload.zip</div>
                            <div hlmAttachmentDescription>Network error, retry?</div>
                        </div>
                        <div hlmAttachmentActions>
                            <button hlmAttachmentAction aria-label="Retry">↻</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
    }),
};
