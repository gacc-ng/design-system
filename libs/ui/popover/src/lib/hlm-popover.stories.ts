import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';

import { HlmPopoverImports } from '../index';

import { HlmPopover } from './hlm-popover';

interface PopoverStoryArgs {
    title: string;
    description: string;
}

const meta: Meta<PopoverStoryArgs> = {
    title: 'Primitives/Popover',
    component: HlmPopover,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmPopoverImports, HlmButton, HlmInput, HlmLabel],
        }),
    ],
    argTypes: {
        title: {
            control: 'text',
            description: 'The heading title of the popover header.',
            table: {
                category: 'Slots',
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Dimensions'" },
            },
        },
        description: {
            control: 'text',
            description: 'The subtitle or instruction text of the popover.',
            table: {
                category: 'Slots',
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'Set the width and max-height for this layer.'" },
            },
        },
    },
    args: {
        title: 'Dimensions',
        description: 'Set the width and max-height for this layer.',
    },
};

export default meta;
type Story = StoryObj<PopoverStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-16 flex justify-center">
                <div hlmPopover>
                    <button hlmBtn variant="outline" hlmPopoverTrigger>Open Popover</button>
                    <div *hlmPopoverPortal="let ctx" hlmPopoverContent class="w-80">
                        <div hlmPopoverHeader>
                            <h4 hlmPopoverTitle>{{ title }}</h4>
                            <p hlmPopoverDescription>{{ description }}</p>
                        </div>
                        <div class="grid gap-2 pt-3">
                            <div class="grid grid-cols-3 items-center gap-4">
                                <label hlmLabel for="pop-width">Width</label>
                                <input hlmInput id="pop-width" value="100%" class="col-span-2 h-8" />
                            </div>
                            <div class="grid grid-cols-3 items-center gap-4">
                                <label hlmLabel for="pop-max">Max Height</label>
                                <input hlmInput id="pop-max" value="300px" class="col-span-2 h-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
    }),
};

export const WithForm: Story = {
    render: () => ({
        template: `
            <div class="p-16 flex justify-center">
                <div hlmPopover>
                    <button hlmBtn variant="outline" hlmPopoverTrigger>Subscribe</button>
                    <div *hlmPopoverPortal="let ctx" hlmPopoverContent class="w-80">
                        <div hlmPopoverHeader>
                            <h4 hlmPopoverTitle>Newsletter</h4>
                            <p hlmPopoverDescription>Get product updates straight to your inbox.</p>
                        </div>
                        <div class="space-y-3 pt-3">
                            <input hlmInput placeholder="you@company.com" class="h-8" />
                            <button hlmBtn size="sm" class="w-full">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
    }),
};
