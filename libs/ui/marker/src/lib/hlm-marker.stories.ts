import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmMarker, HlmMarkerImports } from './hlm-marker';

const meta: Meta<HlmMarker> = {
    title: 'Chat & AI/Marker',
    component: HlmMarker,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmMarkerImports],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'separator', 'border'],
        },
        status: {
            control: 'select',
            options: ['idle', 'running', 'success', 'error', 'warning'],
        },
    },
};

export default meta;
type Story = StoryObj<HlmMarker>;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="flex flex-col gap-6 max-w-md p-6">
                <div hlmMarker variant="separator">
                    <div hlmMarkerContent>Previous session compacted</div>
                </div>

                <div hlmMarker variant="default" status="running">
                    <div hlmMarkerIcon>●</div>
                    <div hlmMarkerContent>Executing unit test suite...</div>
                </div>

                <div hlmMarker variant="default" status="success">
                    <div hlmMarkerIcon>✓</div>
                    <div hlmMarkerContent>All 61 test suites passed</div>
                </div>

                <div hlmMarker variant="border" status="warning">
                    <div hlmMarkerContent>Reviewing pending human merge gate</div>
                </div>
            </div>
        `,
    }),
};
