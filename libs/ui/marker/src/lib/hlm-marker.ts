import { Directive, input } from '@angular/core';

import { cva, type VariantProps } from 'class-variance-authority';

import { classes } from '@gacc-ng/ui/utils';

const markerVariants = cva('group/marker relative flex items-center gap-3 text-sm min-w-0', {
    variants: {
        variant: {
            default: '',
            separator:
                'w-full justify-center before:content-[""] before:flex-1 before:h-px before:bg-border after:content-[""] after:flex-1 after:h-px after:bg-border my-4',
            border: 'border-l-2 border-border pl-4 py-1',
        },
        status: {
            idle: 'text-muted-foreground',
            running: 'text-primary font-medium',
            success: 'text-foreground',
            error: 'text-destructive',
            warning: 'text-amber-500 dark:text-amber-400',
        },
    },
    defaultVariants: {
        variant: 'default',
        status: 'idle',
    },
});

export type MarkerVariants = VariantProps<typeof markerVariants>;

@Directive({
    selector: '[hlmMarker],hlm-marker',
    exportAs: 'hlmMarker',
    host: {
        'data-slot': 'marker',
        role: 'status',
        '[attr.data-variant]': 'variant()',
        '[attr.data-status]': 'status()',
    },
})
export class HlmMarker {
    public readonly variant = input<MarkerVariants['variant']>('default');
    public readonly status = input<MarkerVariants['status']>('idle');

    constructor() {
        classes(() =>
            markerVariants({
                variant: this.variant(),
                status: this.status(),
            }),
        );
    }
}

@Directive({
    selector: '[hlmMarkerIcon],hlm-marker-icon',
    exportAs: 'hlmMarkerIcon',
    host: { 'data-slot': 'marker-icon' },
})
export class HlmMarkerIcon {
    constructor() {
        classes(
            () =>
                'bg-muted size-6 rounded-full flex shrink-0 items-center justify-center text-xs font-semibold ring-4 ring-background group-data-[status=running]/marker:animate-pulse group-data-[status=running]/marker:bg-primary/20 group-data-[status=running]/marker:text-primary group-data-[status=error]/marker:bg-destructive/20 group-data-[status=error]/marker:text-destructive group-data-[status=success]/marker:bg-primary/10 group-data-[status=success]/marker:text-primary',
        );
    }
}

@Directive({
    selector: '[hlmMarkerContent],hlm-marker-content',
    exportAs: 'hlmMarkerContent',
    host: { 'data-slot': 'marker-content' },
})
export class HlmMarkerContent {
    constructor() {
        classes(
            () =>
                'flex items-center gap-2 truncate text-xs text-muted-foreground group-data-[status=running]/marker:text-foreground group-data-[variant=separator]/marker:px-3 group-data-[variant=separator]/marker:py-1 group-data-[variant=separator]/marker:bg-background group-data-[variant=separator]/marker:rounded-full group-data-[variant=separator]/marker:border group-data-[variant=separator]/marker:border-border',
        );
    }
}

export const HlmMarkerImports = [HlmMarker, HlmMarkerIcon, HlmMarkerContent] as const;
