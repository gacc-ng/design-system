import {
    ChangeDetectionStrategy,
    Component,
    computed,
    Directive,
    effect,
    forwardRef,
    input,
    signal,
    untracked,
} from '@angular/core';

import {
    BRN_ALERT_DIALOG_DEFAULT_OPTIONS,
    BrnAlertDialog,
    BrnAlertDialogContent,
    BrnAlertDialogDescription,
    BrnAlertDialogOverlay,
    BrnAlertDialogTitle,
    BrnAlertDialogTrigger,
} from '@spartan-ng/brain/alert-dialog';
import { injectCustomClassSettable, injectExposesStateProvider } from '@spartan-ng/brain/core';
import { BrnDialog, BrnDialogClose, provideBrnDialogDefaultOptions } from '@spartan-ng/brain/dialog';
import { type ClassValue } from 'clsx';

import { HlmButton, provideBrnButtonConfig } from '@gacc-ng/ui/button';
import { classes, hlm } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'button[hlmAlertDialogAction]',
    exportAs: 'hlmAlertDialogAction',
    hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
    host: {
        'data-slot': 'alert-dialog-action',
        '[type]': 'type()',
    },
})
export class HlmAlertDialogAction {
    public readonly type = input<'button' | 'submit' | 'reset'>('button');
}

@Directive({
    selector: 'button[hlmAlertDialogCancel]',
    exportAs: 'hlmAlertDialogCancel',
    providers: [provideBrnButtonConfig({ variant: 'outline' })],
    hostDirectives: [BrnDialogClose, { directive: HlmButton, inputs: ['variant', 'size'] }],
    host: {
        'data-slot': 'alert-dialog-cancel',
        '[type]': 'type()',
    },
})
export class HlmAlertDialogCancel {
    public readonly type = input<'button' | 'submit' | 'reset'>('button');
}

@Directive({
    selector: '[hlmAlertDialogContent],hlm-alert-dialog-content',
    exportAs: 'hlmAlertDialogContent',
    host: {
        'data-slot': 'alert-dialog-content',
        '[attr.data-state]': 'state()',
        '[attr.data-size]': 'size()',
    },
})
export class HlmAlertDialogContent {
    private readonly _stateProvider = injectExposesStateProvider({ optional: true, host: true });
    public readonly state = this._stateProvider?.state ?? signal('closed');
    public readonly size = input<'sm' | 'default'>('default');

    constructor() {
        classes(
            () =>
                'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-popover text-popover-foreground ring-foreground/5 gap-6 rounded-4xl p-6 ring-1 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-md group/alert-dialog-content grid w-full outline-none',
        );
    }
}

@Directive({
    selector: '[hlmAlertDialogDescription]',
    exportAs: 'hlmAlertDialogDescription',
    hostDirectives: [BrnAlertDialogDescription],
    host: {
        'data-slot': 'alert-dialog-description',
    },
})
export class HlmAlertDialogDescription {
    constructor() {
        classes(
            () =>
                'text-muted-foreground *:[a]:hover:text-foreground text-sm text-balance md:text-pretty *:[a]:underline *:[a]:underline-offset-3',
        );
    }
}

@Directive({
    selector: '[hlmAlertDialogFooter],hlm-alert-dialog-footer',
    exportAs: 'hlmAlertDialogFooter',
    host: {
        'data-slot': 'alert-dialog-footer',
    },
})
export class HlmAlertDialogFooter {
    constructor() {
        classes(
            () =>
                'flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
        );
    }
}

@Directive({
    selector: '[hlmAlertDialogHeader],hlm-alert-dialog-header',
    exportAs: 'hlmAlertDialogHeader',
    host: {
        'data-slot': 'alert-dialog-header',
    },
})
export class HlmAlertDialogHeader {
    constructor() {
        classes(
            () =>
                'grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-start sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]',
        );
    }
}

@Directive({
    selector: '[hlmAlertDialogMedia],hlm-alert-dialog-media',
    exportAs: 'hlmAlertDialogMedia',
    host: {
        'data-slot': 'alert-dialog-media',
    },
})
export class HlmAlertDialogMedia {
    constructor() {
        classes(
            () =>
                "bg-muted mb-2 inline-flex size-16 items-center justify-center rounded-full sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[ng-icon:not([class*='text-'])]:text-[length:--spacing(8)]",
        );
    }
}

@Directive({
    selector: '[hlmAlertDialogOverlay],hlm-alert-dialog-overlay',
    exportAs: 'hlmAlertDialogOverlay',
    hostDirectives: [BrnAlertDialogOverlay],
})
export class HlmAlertDialogOverlay {
    private readonly _classSettable = injectCustomClassSettable({ optional: true, host: true });

    public readonly userClass = input<ClassValue>('', { alias: 'class' });
    protected readonly _computedClass = computed(() =>
        hlm(
            'data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 isolate bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs',
            this.userClass(),
        ),
    );

    constructor() {
        effect(() => {
            const classValue = this._computedClass();
            untracked(() => this._classSettable?.setClassToCustomElement(classValue));
        });
    }
}

@Directive({
    selector: '[hlmAlertDialogPortal]',
    exportAs: 'hlmAlertDialogPortal',
    hostDirectives: [{ directive: BrnAlertDialogContent, inputs: ['context', 'class'] }],
})
export class HlmAlertDialogPortal {}

@Directive({
    selector: '[hlmAlertDialogTitle]',
    exportAs: 'hlmAlertDialogTitle',
    hostDirectives: [BrnAlertDialogTitle],
    host: {
        'data-slot': 'alert-dialog-title',
    },
})
export class HlmAlertDialogTitle {
    constructor() {
        classes(
            () =>
                'text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
        );
    }
}

@Directive({
    selector: 'button[hlmAlertDialogTrigger],button[hlmAlertDialogTriggerFor]',
    exportAs: 'hlmAlertDialogTrigger',
    hostDirectives: [
        {
            directive: BrnAlertDialogTrigger,
            inputs: ['id', 'brnAlertDialogTriggerFor: hlmAlertDialogTriggerFor', 'type'],
        },
    ],
    host: {
        'data-slot': 'alert-dialog-trigger',
    },
})
export class HlmAlertDialogTrigger {}

@Component({
    selector: 'hlm-alert-dialog',
    exportAs: 'hlmAlertDialog',
    imports: [HlmAlertDialogOverlay],
    providers: [
        {
            provide: BrnDialog,
            useExisting: forwardRef(() => HlmAlertDialog),
        },
        provideBrnDialogDefaultOptions({
            ...BRN_ALERT_DIALOG_DEFAULT_OPTIONS,
        }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <hlm-alert-dialog-overlay />
        <ng-content />
    `,
})
export class HlmAlertDialog extends BrnAlertDialog {}

export const HlmAlertDialogImports = [
    HlmAlertDialog,
    HlmAlertDialogAction,
    HlmAlertDialogCancel,
    HlmAlertDialogContent,
    HlmAlertDialogDescription,
    HlmAlertDialogFooter,
    HlmAlertDialogHeader,
    HlmAlertDialogMedia,
    HlmAlertDialogOverlay,
    HlmAlertDialogPortal,
    HlmAlertDialogTitle,
    HlmAlertDialogTrigger,
] as const;
