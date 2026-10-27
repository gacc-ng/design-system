import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';
import { barY, defineChart, lineY } from '@tanstack/charts';

import { HlmChartImports } from '../index';

import { HlmChart } from './hlm-chart';
import { HLM_CHART_THEME } from './hlm-chart-theme';
import { hlmChartTooltip } from './hlm-chart-tooltip';

interface MonthlyRevenue {
    month: string;
    revenue: number;
    expenses: number;
}

const sampleData: MonthlyRevenue[] = [
    { month: 'Jan', revenue: 186, expenses: 80 },
    { month: 'Feb', revenue: 305, expenses: 200 },
    { month: 'Mar', revenue: 237, expenses: 120 },
    { month: 'Apr', revenue: 73, expenses: 190 },
    { month: 'May', revenue: 209, expenses: 130 },
    { month: 'Jun', revenue: 214, expenses: 140 },
];

const barChartDefinition = defineChart(
    {
        theme: HLM_CHART_THEME,
        marks: [
            barY(sampleData, {
                x: (d) => d.month,
                y: (d) => d.revenue,
                fill: 'var(--chart-1)',
            }),
        ],
        scales: {
            x: { type: 'band' },
            y: { type: 'linear' },
        },
    },
    {
        tooltip: hlmChartTooltip(),
    },
);

const lineChartDefinition = defineChart(
    {
        theme: HLM_CHART_THEME,
        marks: [
            lineY(sampleData, {
                x: (d) => d.month,
                y: (d) => d.revenue,
                stroke: 'var(--chart-2)',
                strokeWidth: 2,
            }),
        ],
        scales: {
            x: { type: 'point' },
            y: { type: 'linear' },
        },
    },
    {
        tooltip: hlmChartTooltip(),
    },
);

const meta: Meta = {
    title: 'Primitives/Chart',
    component: HlmChart,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmChartImports],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        props: {
            chartOptions: {
                definition: barChartDefinition,
                ariaLabel: 'Monthly Revenue',
            },
        },
        template: `
            <div class="w-full max-w-xl rounded-xl border border-border p-6 shadow-xs">
                <div class="mb-4">
                    <h3 class="text-base font-semibold leading-none tracking-tight">Monthly Revenue</h3>
                    <p class="text-sm text-muted-foreground mt-1">January - June 2026</p>
                </div>
                <div class="h-[250px] w-full">
                    <tanstack-chart
                        hlmChart
                        [options]="chartOptions"
                        class="h-full w-full"
                    />
                </div>
            </div>
        `,
    }),
};

export const LineChart: Story = {
    render: () => ({
        props: {
            chartOptions: {
                definition: lineChartDefinition,
                ariaLabel: 'Revenue Trend',
            },
        },
        template: `
            <div class="w-full max-w-xl rounded-xl border border-border p-6 shadow-xs">
                <div class="mb-4">
                    <h3 class="text-base font-semibold leading-none tracking-tight">Revenue Trend</h3>
                    <p class="text-sm text-muted-foreground mt-1">Visualized over the last 6 months</p>
                </div>
                <div class="h-[250px] w-full">
                    <tanstack-chart
                        hlmChart
                        [options]="chartOptions"
                        class="h-full w-full"
                    />
                </div>
            </div>
        `,
    }),
};
