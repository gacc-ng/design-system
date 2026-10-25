import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmBadge } from '@gacc-ng/ui/badge';
import { HlmButton } from '@gacc-ng/ui/button';

import { HlmCollapsibleImports } from '../index';

import { HlmCollapsible } from './hlm-collapsible';

interface CollapsibleStoryArgs {
    open: boolean;
    disabled: boolean;
}

const meta: Meta<CollapsibleStoryArgs> = {
    title: 'Primitives/Collapsible',
    component: HlmCollapsible,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmCollapsibleImports, HlmButton, HlmBadge],
        }),
    ],
    argTypes: {
        open: {
            control: 'boolean',
            description: 'Whether the collapsible panel is open.',
            table: {
                category: 'Inputs',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the collapsible trigger is interactively disabled.',
            table: {
                category: 'Inputs',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
    args: {
        open: false,
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<CollapsibleStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="p-8 flex justify-center">
                <div hlmCollapsible [open]="open" [disabled]="disabled" class="w-96 space-y-2 border border-border rounded-2xl p-4 bg-card text-card-foreground shadow-xs">
                    <div class="flex items-center justify-between space-x-4">
                        <h4 class="text-sm font-semibold">@spartan-ng starred repositories</h4>
                        <button hlmBtn hlmCollapsibleTrigger variant="ghost" size="sm" class="w-9 p-0" [disabled]="disabled">
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
                <div hlmCollapsible [open]="true" class="w-96 space-y-2 border border-border rounded-2xl p-4 bg-card text-card-foreground shadow-xs">
                    <div class="flex items-center justify-between space-x-4">
                        <div class="flex items-center gap-2">
                            <h4 class="text-sm font-semibold">Deployment Status</h4>
                            <span hlmBadge variant="outline">3 Services</span>
                        </div>
                        <button hlmBtn hlmCollapsibleTrigger variant="ghost" size="sm" class="w-9 p-0">
                            <span class="sr-only">Toggle</span>
                            <span class="text-xs font-mono">↕</span>
                        </button>
                    </div>

                    <div class="rounded-xl border border-border px-3 py-2 text-sm flex items-center justify-between">
                        <span>API Gateway</span>
                        <span class="text-xs text-emerald-600 font-medium">Healthy</span>
                    </div>

                    <div hlmCollapsibleContent class="space-y-2">
                        <div class="rounded-xl border border-border px-3 py-2 text-sm flex items-center justify-between">
                            <span>Auth Microservice</span>
                            <span class="text-xs text-emerald-600 font-medium">Healthy</span>
                        </div>
                        <div class="rounded-xl border border-border px-3 py-2 text-sm flex items-center justify-between">
                            <span>PostgreSQL Cluster</span>
                            <span class="text-xs text-emerald-600 font-medium">Healthy</span>
                        </div>
                    </div>
                </div>
            </div>
        `,
    }),
};

export const Disabled: Story = {
    render: () => ({
        template: `
            <div class="p-8 flex justify-center">
                <div hlmCollapsible [disabled]="true" class="w-96 space-y-2 border border-border rounded-2xl p-4 bg-card text-card-foreground opacity-60">
                    <div class="flex items-center justify-between space-x-4">
                        <h4 class="text-sm font-semibold">Archived Workspace History</h4>
                        <button hlmBtn hlmCollapsibleTrigger [disabled]="true" variant="ghost" size="sm" class="w-9 p-0 cursor-not-allowed">
                            <span class="text-xs font-mono">↕</span>
                        </button>
                    </div>
                    <p class="text-xs text-muted-foreground">This archive has been locked and cannot be expanded.</p>
                </div>
            </div>
        `,
    }),
};
