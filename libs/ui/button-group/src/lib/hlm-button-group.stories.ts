import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideCopy, lucideMinus, lucidePlus } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';

import { HlmButtonGroupImports } from '../index';

import { HlmButtonGroup } from './hlm-button-group';

interface ButtonGroupStoryArgs {
    orientation: 'horizontal' | 'vertical';
}

const meta: Meta<ButtonGroupStoryArgs> = {
    title: 'Forms/Button Group',
    component: HlmButtonGroup,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmButtonGroupImports, HlmButton, NgIcon],
            providers: [provideIcons({ lucidePlus, lucideMinus, lucideCopy, lucideChevronDown })],
        }),
    ],
    argTypes: {
        orientation: {
            control: 'radio',
            options: ['horizontal', 'vertical'],
            description: 'The visual layout orientation of the button group.',
            table: {
                type: { summary: "'horizontal' | 'vertical'" },
                defaultValue: { summary: "'horizontal'" },
            },
        },
    },
    args: {
        orientation: 'horizontal',
    },
};

export default meta;
type Story = StoryObj<ButtonGroupStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div hlmButtonGroup [orientation]="orientation">
                <button hlmBtn variant="outline">Archive</button>
                <button hlmBtn variant="outline">Report</button>
                <button hlmBtn variant="outline">Snooze</button>
            </div>
        `,
    }),
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
    },
    render: (args) => ({
        props: args,
        template: `
            <div hlmButtonGroup [orientation]="orientation">
                <button hlmBtn variant="outline" size="icon" aria-label="Increase">
                    <ng-icon name="lucidePlus" />
                </button>
                <button hlmBtn variant="outline" size="icon" aria-label="Decrease">
                    <ng-icon name="lucideMinus" />
                </button>
            </div>
        `,
    }),
};

export const WithSeparator: Story = {
    render: () => ({
        template: `
            <div hlmButtonGroup>
                <button hlmBtn variant="secondary" size="sm">Copy</button>
                <hlm-button-group-separator />
                <button hlmBtn variant="secondary" size="sm">Paste</button>
            </div>
        `,
    }),
};

export const SplitButton: Story = {
    render: () => ({
        template: `
            <div hlmButtonGroup>
                <button hlmBtn variant="default">Save changes</button>
                <hlm-button-group-separator />
                <button hlmBtn variant="default" size="icon" aria-label="More save options">
                    <ng-icon name="lucideChevronDown" />
                </button>
            </div>
        `,
    }),
};
