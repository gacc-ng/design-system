import { Directive, input } from '@angular/core';

import { cva, type VariantProps } from 'class-variance-authority';

import { classes } from '@gacc-ng/ui/utils';

export const emptyMediaVariants = cva(
    'mb-2 flex shrink-0 items-center justify-center [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(5)]",
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>;

@Directive({
    selector: '[hlmEmptyMedia],hlm-empty-media',
    exportAs: 'hlmEmptyMedia',
    host: {
        'data-slot': 'empty-media',
        '[attr.data-variant]': 'variant()',
    },
})
export class HlmEmptyMedia {
    public readonly variant = input<EmptyMediaVariants['variant']>('default');

    constructor() {
        classes(() => emptyMediaVariants({ variant: this.variant() }));
    }
}
