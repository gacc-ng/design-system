import { type BooleanInput } from '@angular/cdk/coercion';
import { type ComponentType } from '@angular/cdk/portal';
import { NgComponentOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    Directive,
    effect,
    forwardRef,
    inject,
    Injectable,
    input,
    type TemplateRef,
    untracked,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { injectCustomClassSettable } from '@spartan-ng/brain/core';
import {
    BrnDialog,
    BrnDialogClose,
    BrnDialogContent,
    BrnDialogDescription,
    type BrnDialogOptions,
    BrnDialogOverlay,
    BrnDialogRef,
    BrnDialogService,
    BrnDialogTitle,
    BrnDialogTrigger,
    cssClassesToArray,
    injectBrnDialogContext,
    provideBrnDialogDefaultOptions,
} from '@spartan-ng/brain/dialog';
import { type ClassValue } from 'clsx';

import { HlmButton } from '@gacc-ng/ui/button';
import { classes, hlm } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'button[hlmDialogClose]',
    exportAs: 'hlmDialogClose',
    hostDirectives: [BrnDialogClose],
    host: {
        'data-slot': 'dialog-close',
    },
})
export class HlmDialogClose {}

export type HlmDialogContentContext = {
    $component?: ComponentType<unknown>;
    $dynamicComponentClass?: string;
    $showCloseButton?: boolean;
    $closeLabel?: string;
};

@Component({
    selector: 'hlm-dialog-content',
    exportAs: 'hlmDialogContent',
    imports: [NgComponentOutlet, HlmButton, HlmDialogClose, NgIcon],
    providers: [provideIcons({ lucideX })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'data-slot': 'dialog-content',
        '[attr.data-state]': 'state()',
    },
    template: `
        @if (component) {
            <ng-container [ngComponentOutlet]="component" />
        } @else {
            <ng-content />
        }

        @if (showCloseButton()) {
            <button hlmBtn variant="ghost" size="icon-sm" class="absolute end-4 top-4" hlmDialogClose>
                <span class="sr-only">{{ closeLabel() }}</span>
                <ng-icon name="lucideX" />
            </button>
        }
    `,
})
export class HlmDialogContent {
    private readonly _dialogRef = inject(BrnDialogRef);
    private readonly _dialogContext = injectBrnDialogContext<HlmDialogContentContext | null>({ optional: true });

    public readonly showCloseButton = input<boolean, BooleanInput>(this._dialogContext?.$showCloseButton ?? true, {
        transform: booleanAttribute,
    });
    public readonly closeLabel = input<string>(this._dialogContext?.$closeLabel ?? 'Close');

    public readonly state = computed(() => this._dialogRef?.state() ?? 'closed');

    public readonly component = this._dialogContext?.$component;
    private readonly _dynamicComponentClass = this._dialogContext?.$dynamicComponentClass;

    constructor() {
        classes(() => [
            'bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/5 grid max-w-[calc(100%-2rem)] gap-6 rounded-4xl p-6 text-sm ring-1 duration-100 sm:max-w-md relative mx-auto w-full outline-none sm:mx-0',
            this._dynamicComponentClass,
        ]);
    }
}

@Directive({
    selector: '[hlmDialogDescription]',
    exportAs: 'hlmDialogDescription',
    hostDirectives: [BrnDialogDescription],
    host: {
        'data-slot': 'dialog-description',
    },
})
export class HlmDialogDescription {
    constructor() {
        classes(
            () => 'text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3',
        );
    }
}

@Directive({
    selector: '[hlmDialogFooter],hlm-dialog-footer',
    exportAs: 'hlmDialogFooter',
    host: {
        'data-slot': 'dialog-footer',
    },
})
export class HlmDialogFooter {
    constructor() {
        classes(() => 'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end');
    }
}

@Directive({
    selector: '[hlmDialogHeader],hlm-dialog-header',
    exportAs: 'hlmDialogHeader',
    host: {
        'data-slot': 'dialog-header',
    },
})
export class HlmDialogHeader {
    constructor() {
        classes(() => 'gap-2 flex flex-col');
    }
}

export const hlmDialogOverlayClass = hlm(
    'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 isolate bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs',
);

@Directive({
    selector: '[hlmDialogOverlay],hlm-dialog-overlay',
    exportAs: 'hlmDialogOverlay',
    hostDirectives: [BrnDialogOverlay],
})
export class HlmDialogOverlay {
    private readonly _classSettable = injectCustomClassSettable({ optional: true, host: true });

    public readonly userClass = input<ClassValue>('', { alias: 'class' });
    protected readonly _computedClass = computed(() => hlm(hlmDialogOverlayClass, this.userClass()));

    constructor() {
        effect(() => {
            const newClass = this._computedClass();
            untracked(() => this._classSettable?.setClassToCustomElement(newClass));
        });
    }
}

@Directive({
    selector: '[hlmDialogPortal]',
    exportAs: 'hlmDialogPortal',
    hostDirectives: [{ directive: BrnDialogContent, inputs: ['context', 'class'] }],
})
export class HlmDialogPortal {}

@Directive({
    selector: '[hlmDialogTitle]',
    exportAs: 'hlmDialogTitle',
    hostDirectives: [BrnDialogTitle],
    host: {
        'data-slot': 'dialog-title',
    },
})
export class HlmDialogTitle {
    constructor() {
        classes(() => 'text-base leading-none font-medium');
    }
}

@Directive({
    selector: 'button[hlmDialogTrigger],button[hlmDialogTriggerFor]',
    exportAs: 'hlmDialogTrigger',
    hostDirectives: [
        { directive: BrnDialogTrigger, inputs: ['id', 'brnDialogTriggerFor: hlmDialogTriggerFor', 'type'] },
    ],
    host: {
        'data-slot': 'dialog-trigger',
    },
})
export class HlmDialogTrigger {}

export type HlmDialogOptions<DialogContext = unknown> = BrnDialogOptions & {
    contentClass?: string;
    showCloseButton?: boolean;
    closeLabel?: string;
    context?: DialogContext;
};

@Injectable({
    providedIn: 'root',
})
export class HlmDialogService {
    private readonly _brnDialogService = inject(BrnDialogService);

    public open<TResult = unknown, TContext = unknown>(
        component: ComponentType<unknown> | TemplateRef<unknown>,
        options?: Partial<HlmDialogOptions<TContext>>,
    ): BrnDialogRef<TResult> {
        const mergedOptions = {
            ...(options ?? {}),
            backdropClass: cssClassesToArray(`${hlmDialogOverlayClass} ${options?.backdropClass ?? ''}`),
            context: {
                ...(options?.context && typeof options.context === 'object' ? options.context : {}),
                $component: component,
                $dynamicComponentClass: options?.contentClass,
                $showCloseButton: options?.showCloseButton,
                $closeLabel: options?.closeLabel,
            },
        };

        return this._brnDialogService.open<unknown, TResult>(
            HlmDialogContent,
            undefined,
            mergedOptions.context,
            mergedOptions,
        );
    }
}

@Component({
    selector: 'hlm-dialog',
    exportAs: 'hlmDialog',
    imports: [HlmDialogOverlay],
    providers: [
        {
            provide: BrnDialog,
            useExisting: forwardRef(() => HlmDialog),
        },
        provideBrnDialogDefaultOptions({
            // add custom options here
        }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <hlm-dialog-overlay />
        <ng-content />
    `,
})
export class HlmDialog extends BrnDialog {}

export const HlmDialogImports = [
    HlmDialog,
    HlmDialogContent,
    HlmDialogDescription,
    HlmDialogFooter,
    HlmDialogHeader,
    HlmDialogOverlay,
    HlmDialogPortal,
    HlmDialogTitle,
    HlmDialogTrigger,
    HlmDialogClose,
] as const;
