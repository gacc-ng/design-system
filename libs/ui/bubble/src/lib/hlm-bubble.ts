import { Directive, input } from '@angular/core';

import { cva, type VariantProps } from 'class-variance-authority';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmBubbleContent],hlm-bubble-content',
    exportAs: 'hlmBubbleContent',
    host: { 'data-slot': 'bubble-content' },
})
export class HlmBubbleContent {
    constructor() {
        classes(
            () =>
                'rounded-xl px-3.5 py-2.5 text-sm leading-relaxed [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-ring/50 w-fit max-w-full min-w-0 overflow-hidden border border-transparent wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-start [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:ring-3',
        );
    }
}

@Directive({
    selector: '[hlmBubbleGroup],hlm-bubble-group',
    exportAs: 'hlmBubbleGroup',
    host: { 'data-slot': 'bubble-group' },
})
export class HlmBubbleGroup {
    constructor() {
        classes(() => 'gap-2.5 flex min-w-0 flex-col');
    }
}

const bubbleReactionsVariants = cva(
    'bg-muted ring-card gap-1 rounded-full px-2 py-0.5 text-xs shadow-xs ring-3 absolute z-10 flex w-fit shrink-0 items-center justify-center has-[button]:p-0',
    {
        variants: {
            side: {
                top: 'top-0 -translate-y-3/4',
                bottom: 'bottom-0 translate-y-3/4',
            },
            align: {
                start: 'start-3',
                end: 'end-3',
            },
        },
        defaultVariants: {
            side: 'bottom',
            align: 'end',
        },
    },
);

export type BubbleReactionsVariants = VariantProps<typeof bubbleReactionsVariants>;

@Directive({
    selector: '[hlmBubbleReactions],hlm-bubble-reactions',
    exportAs: 'hlmBubbleReactions',
    host: {
        'data-slot': 'bubble-reactions',
        '[attr.data-align]': 'align()',
        '[attr.data-side]': 'side()',
        '[attr.align]': 'null',
    },
})
export class HlmBubbleReactions {
    public readonly side = input<BubbleReactionsVariants['side']>('bottom');
    public readonly align = input<BubbleReactionsVariants['align']>('end');

    constructor() {
        classes(() => bubbleReactionsVariants({ side: this.side(), align: this.align() }));
    }
}

const bubbleVariants = cva(
    'max-w-[80%] gap-1.5 group/bubble relative flex w-fit min-w-0 flex-col group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full',
    {
        variants: {
            variant: {
                default:
                    '*:data-[slot=bubble-content]:bg-primary *:data-[slot=bubble-content]:text-primary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/80',
                secondary:
                    '*:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-secondary/80',
                muted: '*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]',
                tinted: '*:data-[slot=bubble-content]:text-foreground *:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.93_calc(c*0.4)_h)] dark:*:data-[slot=bubble-content]:bg-[oklch(from_var(--primary)_0.3_calc(c*0.4)_h)] [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.88_calc(c*0.5)_h)] dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[oklch(from_var(--primary)_0.35_calc(c*0.5)_h)]',
                outline:
                    '*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30 *:data-[slot=bubble-content]:border *:data-[slot=bubble-content]:shadow-xs',
                ghost: '[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50 border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0',
                destructive:
                    '*:data-[slot=bubble-content]:bg-destructive/10 *:data-[slot=bubble-content]:text-destructive dark:*:data-[slot=bubble-content]:bg-destructive/20 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export type BubbleVariants = VariantProps<typeof bubbleVariants>;
export type BubbleAlign = 'start' | 'end';

@Directive({
    selector: '[hlmBubble],hlm-bubble',
    exportAs: 'hlmBubble',
    host: {
        'data-slot': 'bubble',
        '[attr.data-variant]': 'variant()',
        '[attr.data-align]': 'align()',
        '[attr.align]': 'null',
    },
})
export class HlmBubble {
    public readonly variant = input<BubbleVariants['variant']>('default');
    public readonly align = input<BubbleAlign>('start');

    constructor() {
        classes(() => bubbleVariants({ variant: this.variant() }));
    }
}

export const HlmBubbleImports = [HlmBubble, HlmBubbleContent, HlmBubbleGroup, HlmBubbleReactions] as const;
