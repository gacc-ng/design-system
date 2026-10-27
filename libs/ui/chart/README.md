# @gacc-ng/ui/chart

Spartan NG theme styling and directive layer for `@tanstack/angular-charts`, providing CSS variable bindings, semantic design token theme (`HLM_CHART_THEME`), and styled DOM tooltip decorators (`hlmChartTooltip`).

## Installation

```bash
pnpm add @gacc-ng/ui @tanstack/angular-charts @tanstack/charts
```

## Import

```typescript
import { HlmChartImports, HLM_CHART_THEME, hlmChartTooltip } from '@gacc-ng/ui/chart';
import { defineChart, barY } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
```

## Usage

```typescript
@Component({
    standalone: true,
    imports: [HlmChartImports],
    template: `
        <div class="h-[300px] w-full">
            <tanstack-chart hlmChart [options]="chartOptions" class="h-full w-full" />
        </div>
    `,
})
export class ChartExampleComponent {
    readonly chartOptions = {
        definition: defineChart({
            theme: HLM_CHART_THEME,
            marks: [
                barY(data, {
                    x: 'month',
                    y: 'revenue',
                    fill: 'var(--chart-1)',
                    radius: 4,
                }),
            ],
            scales: {
                x: { scale: () => scaleBand().padding(0.2) },
                y: { scale: scaleLinear, nice: true, grid: true },
            },
            tooltip: hlmChartTooltip(),
        }),
        ariaLabel: 'Monthly Revenue',
    };
}
```
