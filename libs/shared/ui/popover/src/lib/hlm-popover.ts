import { Directive, effect, ElementRef, inject, Renderer2, signal } from '@angular/core';

import { injectExposesStateProvider } from '@spartan-ng/brain/core';
import { BrnPopover, BrnPopoverContent, BrnPopoverTrigger } from '@spartan-ng/brain/popover';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmPopoverContent],hlm-popover-content',
    exportAs: 'hlmPopoverContent',
    host: {
        'data-slot': 'popover-content',
    },
})
export class HlmPopoverContent {
    private readonly _stateProvider = injectExposesStateProvider({ host: true });
    public state = this._stateProvider.state ?? signal('closed');
    private readonly _renderer = inject(Renderer2);
    private readonly _element = inject(ElementRef);

    constructor() {
        effect(() => {
            this._renderer.setAttribute(this._element.nativeElement, 'data-state', this.state());
        });
        classes(
            () =>
                'bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/5 gap-4 rounded-2xl p-4 text-sm shadow-2xl ring-1 duration-100 relative flex w-72 flex-col outline-none',
        );
    }
}

@Directive({
    selector: '[hlmPopoverDescription]',
    exportAs: 'hlmPopoverDescription',
    host: {
        'data-slot': 'popover-description',
    },
})
export class HlmPopoverDescription {
    constructor() {
        classes(() => 'text-muted-foreground');
    }
}

@Directive({
    selector: '[hlmPopoverHeader],hlm-popover-header',
    exportAs: 'hlmPopoverHeader',
    host: {
        'data-slot': 'popover-header',
    },
})
export class HlmPopoverHeader {
    constructor() {
        classes(() => 'flex flex-col gap-1 text-sm');
    }
}

@Directive({
    selector: '[hlmPopoverPortal]',
    exportAs: 'hlmPopoverPortal',
    hostDirectives: [{ directive: BrnPopoverContent, inputs: ['context', 'class'] }],
})
export class HlmPopoverPortal {}

@Directive({
    selector: '[hlmPopoverTitle]',
    exportAs: 'hlmPopoverTitle',
    host: {
        'data-slot': 'popover-title',
    },
})
export class HlmPopoverTitle {
    constructor() {
        classes(() => 'text-base font-medium');
    }
}

@Directive({
    selector: 'button[hlmPopoverTrigger],button[hlmPopoverTriggerFor]',
    exportAs: 'hlmPopoverTrigger',
    hostDirectives: [
        {
            directive: BrnPopoverTrigger,
            inputs: ['id', 'brnPopoverTriggerFor: hlmPopoverTriggerFor', 'type'],
        },
    ],
    host: {
        'data-slot': 'popover-trigger',
    },
})
export class HlmPopoverTrigger {}

@Directive({
    selector: '[hlmPopover],hlm-popover',
    exportAs: 'hlmPopover',
    hostDirectives: [
        {
            directive: BrnPopover,
            inputs: [
                'align',
                'attachTo',
                'autoFocus',
                'closeOnOutsidePointerEvents',
                'offsetX',
                'scrollStrategy',
                'sideOffset',
                'state',
            ],
            outputs: ['stateChanged', 'closed'],
        },
    ],
    host: {
        'data-slot': 'popover',
    },
})
export class HlmPopover {}

export const HlmPopoverImports = [
    HlmPopover,
    HlmPopoverContent,
    HlmPopoverDescription,
    HlmPopoverHeader,
    HlmPopoverPortal,
    HlmPopoverTitle,
    HlmPopoverTrigger,
] as const;
