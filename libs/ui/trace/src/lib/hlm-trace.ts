import { Directive, input } from '@angular/core';

import { cva, type VariantProps } from 'class-variance-authority';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmTrace],hlm-trace',
    exportAs: 'hlmTrace',
    host: {
        'data-slot': 'trace',
    },
})
export class HlmTrace {
    constructor() {
        classes(
            () => 'group/trace border-border bg-card/50 flex w-full min-w-0 flex-col rounded-xl border p-3 text-sm',
        );
    }
}

@Directive({
    selector: 'details[hlmTraceCollapsible],[hlmTraceCollapsible]',
    exportAs: 'hlmTraceCollapsible',
    host: {
        'data-slot': 'trace-collapsible',
    },
})
export class HlmTraceCollapsible {
    constructor() {
        classes(() => 'group/trace-collapsible flex flex-col min-w-0 open:pb-2');
    }
}

@Directive({
    selector: 'summary[hlmTraceCollapsibleTrigger],[hlmTraceCollapsibleTrigger]',
    exportAs: 'hlmTraceCollapsibleTrigger',
    host: {
        'data-slot': 'trace-collapsible-trigger',
    },
})
export class HlmTraceCollapsibleTrigger {
    constructor() {
        classes(
            () =>
                'hover:bg-muted/50 flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg p-2 font-medium transition-colors select-none [&::-webkit-details-marker]:hidden',
        );
    }
}

@Directive({
    selector: '[hlmTraceCollapsibleContent],hlm-trace-collapsible-content',
    exportAs: 'hlmTraceCollapsibleContent',
    host: {
        'data-slot': 'trace-collapsible-content',
    },
})
export class HlmTraceCollapsibleContent {
    constructor() {
        classes(() => 'border-border/60 bg-muted/30 mt-2 flex flex-col gap-2 rounded-lg border p-3 text-xs min-w-0');
    }
}

const traceLineVariants = cva(
    'group/trace-line flex min-w-0 items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-xs transition-colors',
    {
        variants: {
            status: {
                default: 'text-foreground hover:bg-muted/40',
                running: 'text-primary bg-primary/5 animate-pulse',
                success: 'text-foreground hover:bg-muted/40',
                error: 'text-destructive bg-destructive/5',
                pending: 'text-muted-foreground opacity-60',
            },
        },
        defaultVariants: {
            status: 'default',
        },
    },
);

export type TraceLineVariants = VariantProps<typeof traceLineVariants>;

@Directive({
    selector: '[hlmTraceLine],hlm-trace-line',
    exportAs: 'hlmTraceLine',
    host: {
        'data-slot': 'trace-line',
        '[attr.data-status]': 'status()',
    },
})
export class HlmTraceLine {
    public readonly status = input<TraceLineVariants['status']>('default');

    constructor() {
        classes(() => traceLineVariants({ status: this.status() }));
    }
}

@Directive({
    selector: '[hlmTraceIcon],hlm-trace-icon',
    exportAs: 'hlmTraceIcon',
    host: { 'data-slot': 'trace-icon' },
})
export class HlmTraceIcon {
    constructor() {
        classes(() => 'flex size-4 shrink-0 items-center justify-center font-mono text-xs');
    }
}

@Directive({
    selector: '[hlmTraceTitle],hlm-trace-title',
    exportAs: 'hlmTraceTitle',
    host: { 'data-slot': 'trace-title' },
})
export class HlmTraceTitle {
    constructor() {
        classes(() => 'flex-1 truncate font-mono font-medium');
    }
}

@Directive({
    selector: '[hlmTraceDescription],hlm-trace-description',
    exportAs: 'hlmTraceDescription',
    host: { 'data-slot': 'trace-description' },
})
export class HlmTraceDescription {
    constructor() {
        classes(() => 'text-muted-foreground flex shrink-0 items-center gap-1.5 font-mono text-[11px]');
    }
}

export const HlmTraceImports = [
    HlmTrace,
    HlmTraceCollapsible,
    HlmTraceCollapsibleTrigger,
    HlmTraceCollapsibleContent,
    HlmTraceLine,
    HlmTraceIcon,
    HlmTraceTitle,
    HlmTraceDescription,
] as const;
