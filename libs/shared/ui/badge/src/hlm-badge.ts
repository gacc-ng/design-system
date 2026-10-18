import { Directive, input } from '@angular/core';

import { cva, type VariantProps } from 'class-variance-authority';

import { classes } from '@gacc-ng/ui/utils';

export const badgeVariants = cva(
    'inline-flex items-center justify-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none w-fit shrink-0 gap-1 overflow-hidden whitespace-nowrap',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'border-border text-foreground hover:bg-muted hover:text-muted-foreground',
                ghost: 'border-transparent hover:bg-muted hover:text-foreground dark:hover:bg-muted/50',
                link: 'text-primary underline-offset-4 hover:underline border-transparent',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

@Directive({
    selector: '[hlmBadge],hlm-badge',
    exportAs: 'hlmBadge',
    host: {
        'data-slot': 'badge',
        '[attr.data-variant]': 'variant()',
    },
})
export class HlmBadge {
    public readonly variant = input<BadgeVariants['variant']>('default');

    constructor() {
        classes(() => badgeVariants({ variant: this.variant() }));
    }
}

export const HlmBadgeImports = [HlmBadge] as const;
