import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';
import { NgScrollbar } from 'ngx-scrollbar';

import { HlmScrollArea, HlmScrollAreaImports } from './hlm-scroll-area';

const meta: Meta = {
    title: 'Layout/Scroll Area',
    component: HlmScrollArea,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [NgScrollbar, HlmScrollAreaImports],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <ng-scrollbar hlm class="h-72 w-48 rounded-md border">
                <div class="p-4" scrollViewport>
                    <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
                    <div class="space-y-2 text-sm">
                        <div>v1.2.0-beta.50</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.49</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.48</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.47</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.46</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.45</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.44</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.43</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.42</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.41</div>
                        <div class="h-px bg-border"></div>
                        <div>v1.2.0-beta.40</div>
                    </div>
                </div>
            </ng-scrollbar>
        `,
    }),
};

export const Horizontal: Story = {
    render: () => ({
        template: `
            <ng-scrollbar hlm class="w-96 rounded-md border whitespace-nowrap">
                <div class="flex w-max space-x-4 p-4" scrollViewport>
                    <div class="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
                        Item 1
                    </div>
                    <div class="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
                        Item 2
                    </div>
                    <div class="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
                        Item 3
                    </div>
                    <div class="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
                        Item 4
                    </div>
                    <div class="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
                        Item 5
                    </div>
                    <div class="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
                        Item 6
                    </div>
                </div>
            </ng-scrollbar>
        `,
    }),
};

export const BorderedContainer: Story = {
    render: () => ({
        template: `
            <div class="w-80 rounded-xl border bg-card p-4 shadow-sm">
                <div class="mb-3">
                    <h3 class="text-base font-semibold">Changelog</h3>
                    <p class="text-xs text-muted-foreground">Recent project releases and updates.</p>
                </div>
                <ng-scrollbar hlm class="h-48 rounded-md bg-muted/40 p-2">
                    <div class="space-y-3 p-2 text-xs" scrollViewport>
                        <div>
                            <span class="font-semibold text-foreground">v0.6.0</span> - Added layout and panel surface primitives.
                        </div>
                        <div>
                            <span class="font-semibold text-foreground">v0.5.2</span> - Updated Tailwind configuration and CSS variables.
                        </div>
                        <div>
                            <span class="font-semibold text-foreground">v0.5.1</span> - Enhanced autocomplete, combobox, and select components.
                        </div>
                        <div>
                            <span class="font-semibold text-foreground">v0.5.0</span> - Initial data table and calendar additions.
                        </div>
                        <div>
                            <span class="font-semibold text-foreground">v0.4.0</span> - Initial forms and inputs package release.
                        </div>
                    </div>
                </ng-scrollbar>
            </div>
        `,
    }),
};
