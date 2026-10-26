import { Directive, input } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmMessageAvatar],hlm-message-avatar',
    exportAs: 'hlmMessageAvatar',
    host: { 'data-slot': 'message-avatar' },
})
export class HlmMessageAvatar {
    constructor() {
        classes(
            () =>
                'bg-muted min-w-9 rounded-full flex w-fit shrink-0 items-center justify-center self-end overflow-hidden group-has-data-[slot=message-footer]/message:-translate-y-8',
        );
    }
}

@Directive({
    selector: '[hlmMessageContent],hlm-message-content',
    exportAs: 'hlmMessageContent',
    host: { 'data-slot': 'message-content' },
})
export class HlmMessageContent {
    constructor() {
        classes(
            () =>
                'gap-2.5 flex w-full min-w-0 flex-col wrap-break-word group-data-[align=end]/message:*:data-slot:self-end',
        );
    }
}

@Directive({
    selector: '[hlmMessageFooter],hlm-message-footer',
    exportAs: 'hlmMessageFooter',
    host: { 'data-slot': 'message-footer' },
})
export class HlmMessageFooter {
    constructor() {
        classes(
            () =>
                'text-muted-foreground px-3.5 text-xs font-medium flex max-w-full min-w-0 items-center group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end',
        );
    }
}

@Directive({
    selector: '[hlmMessageGroup],hlm-message-group',
    exportAs: 'hlmMessageGroup',
    host: { 'data-slot': 'message-group' },
})
export class HlmMessageGroup {
    constructor() {
        classes(() => 'gap-2.5 flex min-w-0 flex-col');
    }
}

@Directive({
    selector: '[hlmMessageHeader],hlm-message-header',
    exportAs: 'hlmMessageHeader',
    host: { 'data-slot': 'message-header' },
})
export class HlmMessageHeader {
    constructor() {
        classes(
            () =>
                'text-muted-foreground px-3.5 text-xs font-medium flex max-w-full min-w-0 items-center group-has-data-[variant=ghost]/message:px-0',
        );
    }
}

export type MessageAlign = 'start' | 'end';

@Directive({
    selector: '[hlmMessage],hlm-message',
    exportAs: 'hlmMessage',
    host: {
        'data-slot': 'message',
        '[attr.data-align]': 'align()',
        '[attr.align]': 'null',
    },
})
export class HlmMessage {
    public readonly align = input<MessageAlign>('start');

    constructor() {
        classes(() => 'gap-2.5 text-sm group/message relative flex w-full min-w-0 data-[align=end]:flex-row-reverse');
    }
}

export const HlmMessageImports = [
    HlmMessage,
    HlmMessageAvatar,
    HlmMessageContent,
    HlmMessageFooter,
    HlmMessageGroup,
    HlmMessageHeader,
] as const;
