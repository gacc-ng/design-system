# @gacc-ng/ui/chart

Spartan NG theme styling and directive layer for `@tanstack/angular-charts`, providing CSS variable bindings, semantic design token theme (`HLM_CHART_THEME`), and styled DOM tooltip decorators (`hlmChartTooltip`).

## Installation

```bash
pnpm add @gacc-ng/ui @tanstack/angular-charts @tanstack/charts
```

## Import

```typescript
import { HlmChartImports, HLM_CHART_THEME, hlmChartTooltip } from '@gacc-ng/ui/chart';
```

## Usage

```html
<tanstack-chart hlmChart [chart]="chartConfig" class="h-[300px] w-full" />
```
