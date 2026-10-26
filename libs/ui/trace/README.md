# @gacc-ng/ui/trace

Execution trace and tool invocation visualizer for AI agent steps, tool calls, and latency monitoring.

## Installation & Setup

```typescript
import { HlmTraceImports } from '@gacc-ng/ui/trace';
```

## Features

- Collapsible traces (`details`/`summary` semantic layout).
- Step line statuses: `default`, `running`, `success`, `error`, `pending`.
- Monospace styling for tool identifiers, latency timestamps, and execution arguments.

## Usage

```html
<div hlmTrace>
    <details hlmTraceCollapsible open>
        <summary hlmTraceCollapsibleTrigger>
            <div class="flex items-center gap-2">
                <span hlmTraceIcon>⚡</span>
                <span hlmTraceTitle>code_search</span>
            </div>
            <span hlmTraceDescription>142ms</span>
        </summary>
        <div hlmTraceCollapsibleContent>
            <div hlmTraceLine status="success">
                <span hlmTraceIcon>✓</span>
                <span hlmTraceTitle>matchMedia query registered</span>
                <span hlmTraceDescription>45ms</span>
            </div>
            <div hlmTraceLine status="running">
                <span hlmTraceIcon>●</span>
                <span hlmTraceTitle>evaluating vitest assertions</span>
                <span hlmTraceDescription>97ms</span>
            </div>
        </div>
    </details>
</div>
```
