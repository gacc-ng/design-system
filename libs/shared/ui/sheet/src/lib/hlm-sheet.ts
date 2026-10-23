import { type BooleanInput } from '@angular/cdk/coercion';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    Directive,
    effect,
    ElementRef,
    forwardRef,
    inject,
    input,
    Renderer2,
    signal,
    untracked,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import {
    injectCustomClassSettable,
    injectExposedSideProvider,
    injectExposesStateProvider,
} from '@spartan-ng/brain/core';
import { BrnDialog, provideBrnDialogDefaultOptions } from '@spartan-ng/brain/dialog';
import {
    BrnSheet,
    BrnSheetClose,
    BrnSheetContent,
    BrnSheetDescription,
    BrnSheetOverlay,
    BrnSheetTitle,
    BrnSheetTrigger,
} from '@spartan-ng/brain/sheet';
import { type ClassValue } from 'clsx';

import { HlmButton } from '@gacc-ng/ui/button';
import { classes, hlm } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'button[hlmSheetClose]',
    exportAs: 'hlmSheetClose',
    hostDirectives: [BrnSheetClose],
    host: {
        'data-slot': 'sheet-close',
    },
})
export class HlmSheetClose {}

@Component({
    selector: 'hlm-sheet-content',
    exportAs: 'hlmSheetContent',
    imports: [HlmButton, HlmSheetClose, NgIcon],
    providers: [provideIcons({ lucideX })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'data-slot': 'sheet-content',
        '[attr.data-side]': '_sideProvider.side()',
        '[attr.data-state]': 'state()',
    },
    template: `
        <ng-content />
        @if (showCloseButton()) {
            <button hlmBtn variant="ghost" size="icon-sm" class="absolute end-4 top-4" hlmSheetClose>
                <span class="sr-only">Close</span>
                <ng-icon name="lucideX" />
            </button>
        }
    `,
})
export class HlmSheetContent {
    private readonly _stateProvider = injectExposesStateProvider({ host: true });
    protected readonly _sideProvider = injectExposedSideProvider({ host: true });
    public readonly state = this._stateProvider.state ?? signal('closed');
    private readonly _renderer = inject(Renderer2);
    private readonly _element = inject(ElementRef);
    public readonly showCloseButton = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

    constructor() {
        classes(() => [
            'bg-popover text-popover-foreground fixed flex flex-col bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
            'data-open:animate-in data-closed:animate-out',
            'data-[side=top]:data-closed:slide-out-to-top data-[side=top]:data-open:slide-in-from-top',
            'data-[side=bottom]:data-closed:slide-out-to-bottom data-[side=bottom]:data-open:slide-in-from-bottom',
            'data-[side=left]:data-closed:slide-out-to-left data-[side=left]:data-open:slide-in-from-left',
            'data-[side=right]:data-closed:slide-out-to-right data-[side=right]:data-open:slide-in-from-right',
        ]);
        effect(() => {
            this._renderer.setAttribute(this._element.nativeElement, 'data-state', this.state());
        });
    }
}

@Directive({
    selector: '[hlmSheetDescription]',
    exportAs: 'hlmSheetDescription',
    hostDirectives: [BrnSheetDescription],
    host: {
        'data-slot': 'sheet-description',
    },
})
export class HlmSheetDescription {
    constructor() {
        classes(() => 'text-muted-foreground text-sm');
    }
}

@Directive({
    selector: '[hlmSheetFooter],hlm-sheet-footer',
    exportAs: 'hlmSheetFooter',
    host: {
        'data-slot': 'sheet-footer',
    },
})
export class HlmSheetFooter {
    constructor() {
        classes(() => 'gap-2 p-6 mt-auto flex flex-col');
    }
}

@Directive({
    selector: '[hlmSheetHeader],hlm-sheet-header',
    exportAs: 'hlmSheetHeader',
    host: {
        'data-slot': 'sheet-header',
    },
})
export class HlmSheetHeader {
    constructor() {
        classes(() => 'gap-1.5 p-6 flex flex-col');
    }
}

@Directive({
    selector: '[hlmSheetOverlay],hlm-sheet-overlay',
    exportAs: 'hlmSheetOverlay',
    hostDirectives: [BrnSheetOverlay],
})
export class HlmSheetOverlay {
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
    selector: '[hlmSheetPortal]',
    exportAs: 'hlmSheetPortal',
    hostDirectives: [{ directive: BrnSheetContent, inputs: ['context', 'class'] }],
})
export class HlmSheetPortal {}

@Directive({
    selector: '[hlmSheetTitle]',
    exportAs: 'hlmSheetTitle',
    hostDirectives: [BrnSheetTitle],
    host: {
        'data-slot': 'sheet-title',
    },
})
export class HlmSheetTitle {
    constructor() {
        classes(() => 'text-foreground text-base font-medium');
    }
}

@Directive({
    selector: 'button[hlmSheetTrigger]',
    exportAs: 'hlmSheetTrigger',
    hostDirectives: [{ directive: BrnSheetTrigger, inputs: ['id', 'side', 'type'] }],
    host: {
        'data-slot': 'sheet-trigger',
    },
})
export class HlmSheetTrigger {}

@Component({
    selector: 'hlm-sheet',
    exportAs: 'hlmSheet',
    imports: [HlmSheetOverlay],
    providers: [
        {
            provide: BrnDialog,
            useExisting: forwardRef(() => HlmSheet),
        },
        {
            provide: BrnSheet,
            useExisting: forwardRef(() => HlmSheet),
        },
        provideBrnDialogDefaultOptions({
            // add custom options here
        }),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <hlm-sheet-overlay />
        <ng-content />
    `,
})
export class HlmSheet extends BrnSheet {}

export const HlmSheetImports = [
    HlmSheet,
    HlmSheetClose,
    HlmSheetContent,
    HlmSheetDescription,
    HlmSheetFooter,
    HlmSheetHeader,
    HlmSheetOverlay,
    HlmSheetPortal,
    HlmSheetTitle,
    HlmSheetTrigger,
] as const;
