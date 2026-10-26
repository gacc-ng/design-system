import { Directive } from '@angular/core';

import {
    BrnMessageScrollerButton,
    BrnMessageScrollerContent,
    BrnMessageScrollerItem,
    BrnMessageScrollerProvider,
    BrnMessageScrollerRoot,
    BrnMessageScrollerViewport,
} from '@spartan-ng/brain/message-scroller';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmMessageScrollerProvider],hlm-message-scroller-provider',
    exportAs: 'hlmMessageScrollerProvider',
    hostDirectives: [
        {
            directive: BrnMessageScrollerProvider,
            inputs: [
                'autoScroll',
                'defaultScrollPosition',
                'scrollEdgeThreshold',
                'scrollPreviousItemPeek',
                'scrollMargin',
            ],
        },
    ],
    host: {
        'data-slot': 'message-scroller-provider',
    },
})
export class HlmMessageScrollerProvider {}

@Directive({
    selector: '[hlmMessageScroller],hlm-message-scroller',
    exportAs: 'hlmMessageScroller',
    hostDirectives: [{ directive: BrnMessageScrollerRoot }],
    host: {
        'data-slot': 'message-scroller',
    },
})
export class HlmMessageScroller {
    constructor() {
        classes(() => 'relative flex h-full w-full min-h-0 flex-col overflow-hidden');
    }
}

@Directive({
    selector: '[hlmMessageScrollerViewport],hlm-message-scroller-viewport',
    exportAs: 'hlmMessageScrollerViewport',
    hostDirectives: [
        {
            directive: BrnMessageScrollerViewport,
            inputs: ['preserveScrollOnPrepend', 'aria-label', 'tabindex'],
        },
    ],
    host: {
        'data-slot': 'message-scroller-viewport',
    },
})
export class HlmMessageScrollerViewport {
    constructor() {
        classes(() => 'h-full w-full overflow-y-auto overflow-x-hidden outline-none');
    }
}

@Directive({
    selector: '[hlmMessageScrollerContent],hlm-message-scroller-content',
    exportAs: 'hlmMessageScrollerContent',
    hostDirectives: [
        {
            directive: BrnMessageScrollerContent,
            inputs: ['aria-relevant', 'spacerClassName'],
        },
    ],
    host: {
        'data-slot': 'message-scroller-content',
    },
})
export class HlmMessageScrollerContent {
    constructor() {
        classes(() => 'flex min-w-0 flex-col gap-4 p-4');
    }
}

@Directive({
    selector: '[hlmMessageScrollerItem],hlm-message-scroller-item',
    exportAs: 'hlmMessageScrollerItem',
    hostDirectives: [
        {
            directive: BrnMessageScrollerItem,
            inputs: ['messageId', 'scrollAnchor'],
        },
    ],
    host: {
        'data-slot': 'message-scroller-item',
    },
})
export class HlmMessageScrollerItem {}

@Directive({
    selector: 'button[hlmMessageScrollerButton]',
    exportAs: 'hlmMessageScrollerButton',
    hostDirectives: [
        {
            directive: BrnMessageScrollerButton,
            inputs: ['direction', 'behavior', 'aria-label'],
        },
    ],
    host: {
        'data-slot': 'message-scroller-button',
    },
})
export class HlmMessageScrollerButton {
    constructor() {
        classes(
            () =>
                'bg-background/80 backdrop-blur-xs border-border text-foreground hover:bg-muted absolute bottom-4 end-4 z-10 flex size-9 items-center justify-center rounded-full border shadow-md transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50',
        );
    }
}

export const HlmMessageScrollerImports = [
    HlmMessageScrollerProvider,
    HlmMessageScroller,
    HlmMessageScrollerViewport,
    HlmMessageScrollerContent,
    HlmMessageScrollerItem,
    HlmMessageScrollerButton,
] as const;
