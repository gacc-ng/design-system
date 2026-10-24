import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmButton } from '../../../button/src/hlm-button';
import { HlmInput } from '../../../input/src/hlm-input';
import { HlmLabel } from '../../../label/src/hlm-label';

import { HlmPopoverImports } from './hlm-popover';

const meta: Meta = {
    title: 'Primitives/Popover',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmPopoverImports, HlmButton, HlmInput, HlmLabel],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-16 flex justify-center">
                <div hlmPopover>
                    <button hlmBtn variant="outline" hlmPopoverTrigger>Dimensions</button>
                    <div *hlmPopoverPortal="let ctx" hlmPopoverContent class="w-80">
                        <div hlmPopoverHeader>
                            <h4 hlmPopoverTitle>Dimensions</h4>
                            <p hlmPopoverDescription>Set the width and max-height for this layer.</p>
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
