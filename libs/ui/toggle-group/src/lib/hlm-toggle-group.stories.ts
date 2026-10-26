import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    lucideAlignCenter,
    lucideAlignJustify,
    lucideAlignLeft,
    lucideAlignRight,
    lucideBold,
    lucideItalic,
    lucideUnderline,
} from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmToggleGroup } from './hlm-toggle-group';
import { HlmToggleGroupItem } from './hlm-toggle-group-item';

interface ToggleGroupStoryArgs {
    variant: 'default' | 'outline';
    size: 'default' | 'sm' | 'lg';
    orientation: 'horizontal' | 'vertical';
    spacing: number;
}

const meta: Meta<ToggleGroupStoryArgs> = {
    title: 'Forms/Toggle Group',
    component: HlmToggleGroup,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmToggleGroup, HlmToggleGroupItem, NgIcon],
            providers: [
                provideIcons({
                    lucideBold,
                    lucideItalic,
                    lucideUnderline,
                    lucideAlignLeft,
                    lucideAlignCenter,
                    lucideAlignRight,
                    lucideAlignJustify,
                }),
            ],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline'],
            description: 'The visual style variant for the toggle group container.',
            table: {
                type: { summary: "'default' | 'outline'" },
                defaultValue: { summary: "'default'" },
            },
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg'],
            description: 'The size dimension of the toggle items.',
            table: {
                type: { summary: "'default' | 'sm' | 'lg'" },
                defaultValue: { summary: "'default'" },
            },
        },
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Layout axis orientation for the toggle items.',
            table: {
                type: { summary: "'horizontal' | 'vertical'" },
                defaultValue: { summary: "'horizontal'" },
            },
        },
        spacing: {
            control: 'number',
            description: 'Spacing in pixels between toggle items.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
            },
        },
    },
    args: {
        variant: 'default',
        size: 'default',
        orientation: 'horizontal',
        spacing: 0,
    },
};

export default meta;
type Story = StoryObj<ToggleGroupStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <hlm-toggle-group [variant]="variant" [size]="size" [orientation]="orientation" [spacing]="spacing" value="bold">
                <button hlmToggleGroupItem value="bold" aria-label="Toggle bold">
                    <ng-icon name="lucideBold" class="size-4" />
                </button>
                <button hlmToggleGroupItem value="italic" aria-label="Toggle italic">
                    <ng-icon name="lucideItalic" class="size-4" />
                </button>
                <button hlmToggleGroupItem value="underline" aria-label="Toggle underline">
                    <ng-icon name="lucideUnderline" class="size-4" />
                </button>
            </hlm-toggle-group>
        `,
    }),
};

export const AllVariants: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-4">
                <div>
                    <span class="text-xs text-muted-foreground mb-1 block">Default Variant</span>
                    <hlm-toggle-group variant="default" value="left">
                        <button hlmToggleGroupItem value="left" aria-label="Align left"><ng-icon name="lucideAlignLeft" class="size-4" /></button>
                        <button hlmToggleGroupItem value="center" aria-label="Align center"><ng-icon name="lucideAlignCenter" class="size-4" /></button>
                        <button hlmToggleGroupItem value="right" aria-label="Align right"><ng-icon name="lucideAlignRight" class="size-4" /></button>
                    </hlm-toggle-group>
                </div>
                <div>
                    <span class="text-xs text-muted-foreground mb-1 block">Outline Variant</span>
                    <hlm-toggle-group variant="outline" value="left">
                        <button hlmToggleGroupItem value="left" aria-label="Align left"><ng-icon name="lucideAlignLeft" class="size-4" /></button>
                        <button hlmToggleGroupItem value="center" aria-label="Align center"><ng-icon name="lucideAlignCenter" class="size-4" /></button>
                        <button hlmToggleGroupItem value="right" aria-label="Align right"><ng-icon name="lucideAlignRight" class="size-4" /></button>
                    </hlm-toggle-group>
                </div>
            </div>
        `,
    }),
};

export const AllSizes: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-4">
                <hlm-toggle-group size="sm" value="bold">
                    <button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="lucideBold" class="size-3.5" /></button>
                    <button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="lucideItalic" class="size-3.5" /></button>
                </hlm-toggle-group>
                <hlm-toggle-group size="default" value="bold">
                    <button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="lucideBold" class="size-4" /></button>
                    <button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="lucideItalic" class="size-4" /></button>
                </hlm-toggle-group>
                <hlm-toggle-group size="lg" value="bold">
                    <button hlmToggleGroupItem value="bold" aria-label="Toggle bold"><ng-icon name="lucideBold" class="size-5" /></button>
                    <button hlmToggleGroupItem value="italic" aria-label="Toggle italic"><ng-icon name="lucideItalic" class="size-5" /></button>
                </hlm-toggle-group>
            </div>
        `,
    }),
};

export const Vertical: Story = {
    render: () => ({
        template: `
            <hlm-toggle-group orientation="vertical" value="left">
                <button hlmToggleGroupItem value="left" aria-label="Align left"><ng-icon name="lucideAlignLeft" class="size-4" /></button>
                <button hlmToggleGroupItem value="center" aria-label="Align center"><ng-icon name="lucideAlignCenter" class="size-4" /></button>
                <button hlmToggleGroupItem value="right" aria-label="Align right"><ng-icon name="lucideAlignRight" class="size-4" /></button>
                <button hlmToggleGroupItem value="justify" aria-label="Align justify"><ng-icon name="lucideAlignJustify" class="size-4" /></button>
            </hlm-toggle-group>
        `,
    }),
};
