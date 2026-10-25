import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { HlmBadge } from '@gacc-ng/ui/badge';
import { HlmButton } from '@gacc-ng/ui/button';

import { HlmCollapsibleImports } from '../index';

const meta: Meta = {
    title: 'Primitives/Collapsible',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmCollapsibleImports, HlmButton, HlmBadge],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <div hlmCollapsible class="w-[380px] space-y-2 border border-border rounded-2xl p-4 bg-card text-card-foreground shadow-xs">
                    <div class="flex items-center justify-between space-x-4">
                        <h4 class="text-sm font-semibold">@spartan-ng starred repositories</h4>
                        <button hlmBtn hlmCollapsibleTrigger variant="ghost" size="sm" class="w-9 p-0">
                            <span class="sr-only">Toggle</span>
                            <span class="text-xs font-mono">↕</span>
                        </button>
                    </div>

                    <div class="rounded-xl border border-border px-3 py-2 font-mono text-sm">
                        @spartan-ng/brain
                    </div>

                    <div hlmCollapsibleContent class="space-y-2">
                        <div class="rounded-xl border border-border px-3 py-2 font-mono text-sm">
                            @spartan-ng/helm
                        </div>
                        <div class="rounded-xl border border-border px-3 py-2 font-mono text-sm">
                            @spartan-ng/cli
                        </div>
                    </div>
                </div>
            </div>
        `,
    }),
};

export const OpenByDefault: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <div hlmCollapsible [open]="true" class="w-[380px] space-y-2 border border-border rounded-2xl p-4 bg-card text-card-foreground shadow-xs">
                    <div class="flex items-center justify-between space-x-4">
                        <div class="flex items-center gap-2">
                            <h4 class="text-sm font-semibold">Deployment Status</h4>
                            <span hlmBadge variant="outline" size="sm">3 Services</span>
                        </div>
                        <button hlmBtn hlmCollapsibleTrigger variant="ghost" size="sm" class="w-9 p-0">
                            <span class="text-xs font-mono">↕</span>
                        </button>
                    </div>

                    <div class="rounded-xl bg-muted/50 px-3 py-2 text-sm text-foreground">
                        Production cluster (us-east) — Healthy
                    </div>

                    <div hlmCollapsibleContent class="space-y-2">
                        <div class="rounded-xl bg-muted/50 px-3 py-2 text-sm text-foreground">
                            Preview staging (eu-central) — Running tests
                        </div>
                        <div class="rounded-xl bg-muted/50 px-3 py-2 text-sm text-foreground">
                            Edge caching CDN — Active
                        </div>
                    </div>
                </div>
            </div>
        `,
    }),
};
