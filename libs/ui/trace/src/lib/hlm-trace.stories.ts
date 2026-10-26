import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmTrace, HlmTraceImports } from './hlm-trace';

const meta: Meta<HlmTrace> = {
    title: 'Chat & AI/Trace',
    component: HlmTrace,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmTraceImports],
        }),
    ],
};

export default meta;
type Story = StoryObj<HlmTrace>;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="max-w-lg p-6">
                <div hlmTrace>
                    <details hlmTraceCollapsible open>
                        <summary hlmTraceCollapsibleTrigger>
                            <div class="flex items-center gap-2">
                                <span hlmTraceIcon>⚡</span>
                                <span hlmTraceTitle>agent_execution_pipeline</span>
                            </div>
                            <span hlmTraceDescription>320ms</span>
                        </summary>
                        <div hlmTraceCollapsibleContent>
                            <div hlmTraceLine status="success">
                                <span hlmTraceIcon>✓</span>
                                <span hlmTraceTitle>parse_prompt_intent</span>
                                <span hlmTraceDescription>35ms</span>
                            </div>
                            <div hlmTraceLine status="success">
                                <span hlmTraceIcon>✓</span>
                                <span hlmTraceTitle>load_context_artifacts</span>
                                <span hlmTraceDescription>110ms</span>
                            </div>
                            <div hlmTraceLine status="running">
                                <span hlmTraceIcon>●</span>
                                <span hlmTraceTitle>verify_unit_test_suite</span>
                                <span hlmTraceDescription>175ms</span>
                            </div>
                            <div hlmTraceLine status="pending">
                                <span hlmTraceIcon>○</span>
                                <span hlmTraceTitle>publish_summary_report</span>
                                <span hlmTraceDescription>queued</span>
                            </div>
                        </div>
                    </details>
                </div>
            </div>
        `,
    }),
};
