import { Component } from '@angular/core';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmAvatarImports } from '@gacc-ng/ui/avatar';
import { HlmButtonImports } from '@gacc-ng/ui/button';

import { HlmHoverCard, HlmHoverCardImports } from '../index';

@Component({
    selector: 'gacc-hover-card-demo',
    standalone: true,
    imports: [HlmHoverCardImports, HlmAvatarImports, HlmButtonImports],
    template: `
        <div class="flex items-center justify-center p-8">
            <hlm-hover-card>
                <button hlmHoverCardTrigger hlmBtn variant="link">&#64;angular</button>
                <hlm-hover-card-content *hlmHoverCardPortal class="w-80">
                    <div class="flex justify-between space-x-4">
                        <span hlmAvatar class="size-10">
                            <img src="https://github.com/angular.png" alt="Angular Logo" hlmAvatarImage />
                            <span hlmAvatarFallback>NG</span>
                        </span>
                        <div class="space-y-1">
                            <h4 class="text-sm font-semibold">&#64;angular</h4>
                            <p class="text-sm text-muted-foreground">
                                The web developer's platform for building performant, scalable applications.
                            </p>
                            <div class="flex items-center pt-2">
                                <span class="text-xs text-muted-foreground">Joined February 2014</span>
                            </div>
                        </div>
                    </div>
                </hlm-hover-card-content>
            </hlm-hover-card>
        </div>
    `,
})
class HoverCardDemoComponent {}

const meta: Meta = {
    title: 'Overlays/Hover Card',
    component: HlmHoverCard,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HoverCardDemoComponent],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: '<gacc-hover-card-demo />',
    }),
};
