import { type Direction, Directionality } from '@angular/cdk/bidi';
import { type BooleanInput, type NumberInput } from '@angular/cdk/coercion';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    Directive,
    effect,
    inject,
    input,
    numberAttribute,
    signal,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { cva, type VariantProps } from 'class-variance-authority';

import { HlmButton, provideBrnButtonConfig } from '@gacc-ng/ui/button';
import { classes } from '@gacc-ng/ui/utils';

const codeBlockVariants = cva(
    'border-border group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg border font-mono text-xs',
    {
        variants: {
            variant: {
                default: 'bg-muted/40 text-foreground',
                destructive: 'bg-destructive/10 border-destructive/30 text-destructive',
            },
            size: {
                default: 'text-xs',
                sm: 'text-[0.6875rem]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export type CodeBlockVariants = VariantProps<typeof codeBlockVariants>;

@Directive({
    selector: '[hlmCodeBlock],hlm-code-block',
    exportAs: 'hlmCodeBlock',
    host: {
        'data-slot': 'code-block',
        '[attr.data-variant]': 'variant()',
        '[attr.data-size]': 'size()',
    },
})
export class HlmCodeBlock {
    public readonly variant = input<CodeBlockVariants['variant']>('default');
    public readonly size = input<CodeBlockVariants['size']>('default');

    constructor() {
        classes(() => codeBlockVariants({ variant: this.variant(), size: this.size() }));
    }
}

@Directive({
    selector: '[hlmCodeBlockHeader],hlm-code-block-header',
    exportAs: 'hlmCodeBlockHeader',
    host: {
        'data-slot': 'code-block-header',
    },
})
export class HlmCodeBlockHeader {
    constructor() {
        classes(
            () =>
                'border-border bg-muted/60 text-muted-foreground flex min-w-0 shrink-0 items-center justify-between border-b px-3.5 py-2 font-mono text-xs font-medium *:has-[>[data-slot=code-block-title]]:min-w-0',
        );
    }
}

@Directive({
    selector: '[hlmCodeBlockTitle],hlm-code-block-title',
    exportAs: 'hlmCodeBlockTitle',
    host: {
        'data-slot': 'code-block-title',
    },
})
export class HlmCodeBlockTitle {
    constructor() {
        classes(
            () =>
                'flex items-center gap-2 truncate font-mono text-xs font-medium text-foreground [&_ng-icon]:pointer-events-none [&_ng-icon]:inline-block [&_ng-icon]:align-middle',
        );
    }
}

@Directive({
    selector: '[hlmCodeBlockActions],hlm-code-block-actions',
    exportAs: 'hlmCodeBlockActions',
    host: {
        'data-slot': 'code-block-actions',
    },
})
export class HlmCodeBlockActions {
    constructor() {
        classes(
            () =>
                'ms-auto flex shrink-0 items-center gap-1 [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-2 [[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100',
        );
    }
}

@Component({
    selector: 'hlm-code-block-copy-button, button[hlmCodeBlockCopyButton], button[hlm-code-block-copy-button]',
    exportAs: 'hlmCodeBlockCopyButton',
    imports: [NgIcon],
    providers: [
        provideIcons({ lucideCopy, lucideCheck }),
        provideBrnButtonConfig({ variant: 'ghost', size: 'icon-xs' }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
    host: {
        type: 'button',
        'data-slot': 'code-block-copy-button',
        '[attr.data-copied]': '_copied() || null',
        '[attr.aria-label]': '_ariaLabel()',
        '(click)': '_copy()',
    },
    template: `
        <ng-icon [name]="_icon()" />
        @if (_copied()) {
            <span aria-live="polite" class="sr-only">{{ copiedText() }}</span>
        }
    `,
})
export class HlmCodeBlockCopyButton {
    protected readonly _copied = signal(false);
    protected readonly _icon = computed(() => (this._copied() ? 'lucideCheck' : 'lucideCopy'));

    public readonly value = input<string>('');
    public readonly copyText = input<string>('Copy');
    public readonly copiedText = input<string>('Copied');

    protected readonly _ariaLabel = computed(() => (this._copied() ? this.copiedText() : this.copyText()));

    constructor() {
        classes(() => 'cursor-pointer');

        effect((onCleanup) => {
            if (!this._copied()) return;
            const timeout = setTimeout(() => this._copied.set(false), 2000);
            onCleanup(() => clearTimeout(timeout));
        });
    }

    protected async _copy(): Promise<void> {
        try {
            await navigator.clipboard.writeText(this.value());
            this._copied.set(true);
        } catch {
            // ignore clipboard errors
        }
    }
}

const codeBlockLineVariants = cva(
    'relative block min-h-lh after:absolute after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:before:pe-4 in-data-numbered:before:text-muted-foreground/60 in-data-numbered:before:text-end in-data-numbered:before:w-6 in-data-numbered:before:inline-block',
    {
        variants: {
            variant: {
                default: '',
                added: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 -mx-4 px-4 block',
                removed: 'bg-rose-500/15 text-rose-800 dark:text-rose-300 -mx-4 px-4 block',
                highlighted: 'bg-primary/10 -mx-4 px-4 block',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export type CodeBlockLineVariants = VariantProps<typeof codeBlockLineVariants>;

@Component({
    selector: 'hlm-code-block-line, span[hlmCodeBlockLine], span[hlm-code-block-line]',
    exportAs: 'hlmCodeBlockLine',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'data-slot': 'code-block-line',
        '[attr.data-variant]': 'variant()',
    },
    template: `
        <span data-slot="code-block-line-content" class="min-w-0">
            <ng-content />
        </span>
    `,
})
export class HlmCodeBlockLine {
    public readonly variant = input<CodeBlockLineVariants['variant']>('default');

    constructor() {
        classes(() => codeBlockLineVariants({ variant: this.variant() }));
    }
}

@Component({
    selector: 'hlm-code-block-content, pre[hlmCodeBlockContent], pre[hlm-code-block-content]',
    exportAs: 'hlmCodeBlockContent',
    imports: [HlmCodeBlockLine],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'data-slot': 'code-block-content',
        '[attr.data-wrap]': 'wrap() || null',
        '[attr.data-numbered]': 'lineNumbers() || null',
        '[attr.dir]': '_direction()',
        '[style.counter-reset]': '_style()',
        tabindex: '0',
    },
    template: `
        <code
            data-slot="code-block-code"
            class="grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"
        >
            @if (_lines(); as lines) {
                @for (line of lines; track $index) {
                    <span hlmCodeBlockLine>{{ line }}</span>
                }
            } @else if (_hasCode()) {
                <span [textContent]="_code()"></span>
            } @else {
                <ng-content />
            }
        </code>
    `,
})
export class HlmCodeBlockContent {
    private readonly _dir = inject(Directionality, { optional: true });

    protected readonly _direction = computed(() => {
        const dir = this._dir as (Directionality & { valueSignal?: () => Direction }) | null;
        return (dir?.valueSignal ? dir.valueSignal() : dir?.value) ?? 'ltr';
    });

    public readonly wrap = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
    public readonly lineNumbers = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
    public readonly startLine = input<number, NumberInput>(1, { transform: numberAttribute });

    public readonly code = input<string>();

    protected readonly _code = computed(() => {
        const code = this.code();
        return typeof code === 'string' ? code : null;
    });

    protected readonly _hasCode = computed(() => this._code() !== null);

    protected readonly _lines = computed(() => {
        const code = this._code();
        if (!this.lineNumbers() || code === null) return null;

        return code
            .replace(/\n$/, '')
            .split('\n')
            .map((line) => (line === '' ? '\n' : line));
    });

    protected readonly _style = computed(() => `line ${this.startLine() - 1}`);

    constructor() {
        classes(
            () =>
                'scroll-fade-x min-h-0 min-w-0 overflow-auto p-4 text-start font-mono text-xs leading-relaxed outline-none scrollbar-thin data-[wrap=true]:whitespace-pre-wrap data-[wrap=true]:break-words',
        );
    }
}

@Directive({
    selector: '[hlmCodeBlockFooter],hlm-code-block-footer',
    exportAs: 'hlmCodeBlockFooter',
    host: {
        'data-slot': 'code-block-footer',
    },
})
export class HlmCodeBlockFooter {
    constructor() {
        classes(
            () =>
                'border-border bg-muted/40 text-muted-foreground flex min-w-0 shrink-0 items-center border-t px-3.5 py-1.5 font-mono text-[0.6875rem]',
        );
    }
}

export const HlmCodeBlockImports = [
    HlmCodeBlock,
    HlmCodeBlockActions,
    HlmCodeBlockContent,
    HlmCodeBlockCopyButton,
    HlmCodeBlockFooter,
    HlmCodeBlockHeader,
    HlmCodeBlockLine,
    HlmCodeBlockTitle,
] as const;
