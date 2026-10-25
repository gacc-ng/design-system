import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmInput } from '@gacc-ng/ui/input';

import { HlmKbd } from './hlm-kbd';
import { HlmKbdGroup } from './hlm-kbd-group';

interface KbdStoryArgs {
    keyText: string;
}

const meta: Meta<KbdStoryArgs> = {
    title: 'Primitives/Kbd',
    component: HlmKbd,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmKbd, HlmKbdGroup, HlmInput],
        }),
    ],
    argTypes: {
        keyText: {
            control: 'text',
            description: 'The key symbol or shortcut label projected inside the kbd element.',
            table: {
                category: 'Slots',
                type: { summary: 'string | TemplateRef' },
                defaultValue: { summary: "'⌘K'" },
            },
        },
    },
    args: {
        keyText: '⌘K',
    },
};

export default meta;
type Story = StoryObj<KbdStoryArgs>;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `
            <div class="flex items-center gap-2">
                <kbd hlmKbd>{{ keyText }}</kbd>
            </div>
        `,
    }),
};

export const Shortcuts: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between w-64 text-sm text-muted-foreground">
                    <span>Quick Search</span>
                    <kbd hlmKbdGroup>
                        <kbd hlmKbd>⌘</kbd>
                        <kbd hlmKbd>K</kbd>
                    </kbd>
                </div>
                <div class="flex items-center justify-between w-64 text-sm text-muted-foreground">
                    <span>Command Palette</span>
                    <kbd hlmKbdGroup>
                        <kbd hlmKbd>Ctrl</kbd>
                        <kbd hlmKbd>Shift</kbd>
                        <kbd hlmKbd>P</kbd>
                    </kbd>
                </div>
                <div class="flex items-center justify-between w-64 text-sm text-muted-foreground">
                    <span>Cancel / Close</span>
                    <kbd hlmKbd>Esc</kbd>
                </div>
            </div>
        `,
    }),
};

export const InsideInputPreview: Story = {
    render: () => ({
        template: `
            <div class="relative w-72">
                <input hlmInput placeholder="Search documentation..." class="pr-12" />
                <div class="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <kbd hlmKbd>⌘K</kbd>
                </div>
            </div>
        `,
    }),
};
