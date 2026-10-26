import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmResizableImports } from '../index';

import { HlmResizableGroup } from './hlm-resizable-group';

const meta: Meta = {
    title: 'Layout/Resizable',
    component: HlmResizableGroup,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmResizableImports],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const TwoPanelHorizontal: Story = {
    render: () => ({
        template: `
            <hlm-resizable-group class="min-h-[200px] max-w-md rounded-lg border">
                <hlm-resizable-panel [defaultSize]="50">
                    <div class="flex h-full items-center justify-center p-6">
                        <span class="font-semibold">Panel One</span>
                    </div>
                </hlm-resizable-panel>
                <hlm-resizable-handle />
                <hlm-resizable-panel [defaultSize]="50">
                    <div class="flex h-full items-center justify-center p-6">
                        <span class="font-semibold">Panel Two</span>
                    </div>
                </hlm-resizable-panel>
            </hlm-resizable-group>
        `,
    }),
};

export const VerticalSplit: Story = {
    render: () => ({
        template: `
            <hlm-resizable-group direction="vertical" class="min-h-[200px] max-w-sm rounded-lg border">
                <hlm-resizable-panel [defaultSize]="25">
                    <div class="flex h-full items-center justify-center p-6">
                        <span class="font-semibold">Header</span>
                    </div>
                </hlm-resizable-panel>
                <hlm-resizable-handle />
                <hlm-resizable-panel [defaultSize]="75">
                    <div class="flex h-full items-center justify-center p-6">
                        <span class="font-semibold">Content</span>
                    </div>
                </hlm-resizable-panel>
            </hlm-resizable-group>
        `,
    }),
};

export const WithDraggableHandle: Story = {
    render: () => ({
        template: `
            <hlm-resizable-group class="min-h-[200px] max-w-md rounded-lg border">
                <hlm-resizable-panel [defaultSize]="30">
                    <div class="flex h-full items-center justify-center p-6">
                        <span class="font-semibold">Sidebar</span>
                    </div>
                </hlm-resizable-panel>
                <hlm-resizable-handle withHandle />
                <hlm-resizable-panel [defaultSize]="70">
                    <div class="flex h-full items-center justify-center p-6">
                        <span class="font-semibold">Main View</span>
                    </div>
                </hlm-resizable-panel>
            </hlm-resizable-group>
        `,
    }),
};

export const NestedResizableGroups: Story = {
    render: () => ({
        template: `
            <hlm-resizable-group class="min-h-[250px] max-w-lg rounded-lg border">
                <hlm-resizable-panel [defaultSize]="40">
                    <div class="flex h-full items-center justify-center p-6">
                        <span class="font-semibold">Sidebar</span>
                    </div>
                </hlm-resizable-panel>
                <hlm-resizable-handle withHandle />
                <hlm-resizable-panel [defaultSize]="60">
                    <hlm-resizable-group direction="vertical">
                        <hlm-resizable-panel [defaultSize]="35">
                            <div class="flex h-full items-center justify-center p-6">
                                <span class="font-semibold">Top Panel</span>
                            </div>
                        </hlm-resizable-panel>
                        <hlm-resizable-handle withHandle />
                        <hlm-resizable-panel [defaultSize]="65">
                            <div class="flex h-full items-center justify-center p-6">
                                <span class="font-semibold">Bottom Panel</span>
                            </div>
                        </hlm-resizable-panel>
                    </hlm-resizable-group>
                </hlm-resizable-panel>
            </hlm-resizable-group>
        `,
    }),
};
