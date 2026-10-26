import { Directive, input } from '@angular/core';

import { cva, type VariantProps } from 'class-variance-authority';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmAttachmentGroup],hlm-attachment-group',
    exportAs: 'hlmAttachmentGroup',
    host: { 'data-slot': 'attachment-group' },
})
export class HlmAttachmentGroup {
    constructor() {
        classes(() => 'flex flex-wrap gap-2.5 min-w-0');
    }
}

const attachmentVariants = cva(
    'border-border bg-card text-card-foreground group/attachment relative flex min-w-0 items-center rounded-xl border shadow-xs transition-colors',
    {
        variants: {
            state: {
                idle: '',
                uploading: 'opacity-80 border-dashed animate-pulse',
                processing: 'opacity-90 border-primary/50',
                error: 'border-destructive/60 bg-destructive/5 text-destructive',
                done: 'border-border',
            },
            size: {
                sm: 'p-2 gap-2 text-xs',
                default: 'p-3 gap-3 text-sm',
                lg: 'p-4 gap-4 text-base',
            },
            layout: {
                horizontal: 'flex-row max-w-sm',
                vertical: 'flex-col items-start max-w-xs',
            },
        },
        defaultVariants: {
            state: 'idle',
            size: 'default',
            layout: 'horizontal',
        },
    },
);

export type AttachmentVariants = VariantProps<typeof attachmentVariants>;

@Directive({
    selector: '[hlmAttachment],hlm-attachment',
    exportAs: 'hlmAttachment',
    host: {
        'data-slot': 'attachment',
        '[attr.data-state]': 'state()',
        '[attr.data-size]': 'size()',
        '[attr.data-layout]': 'layout()',
    },
})
export class HlmAttachment {
    public readonly state = input<AttachmentVariants['state']>('idle');
    public readonly size = input<AttachmentVariants['size']>('default');
    public readonly layout = input<AttachmentVariants['layout']>('horizontal');

    constructor() {
        classes(() =>
            attachmentVariants({
                state: this.state(),
                size: this.size(),
                layout: this.layout(),
            }),
        );
    }
}

@Directive({
    selector: '[hlmAttachmentMedia],hlm-attachment-media',
    exportAs: 'hlmAttachmentMedia',
    host: { 'data-slot': 'attachment-media' },
})
export class HlmAttachmentMedia {
    constructor() {
        classes(
            () =>
                'bg-muted size-10 rounded-lg flex shrink-0 items-center justify-center overflow-hidden text-muted-foreground',
        );
    }
}

@Directive({
    selector: '[hlmAttachmentContent],hlm-attachment-content',
    exportAs: 'hlmAttachmentContent',
    host: { 'data-slot': 'attachment-content' },
})
export class HlmAttachmentContent {
    constructor() {
        classes(() => 'flex min-w-0 flex-1 flex-col justify-center');
    }
}

@Directive({
    selector: '[hlmAttachmentTitle],hlm-attachment-title',
    exportAs: 'hlmAttachmentTitle',
    host: { 'data-slot': 'attachment-title' },
})
export class HlmAttachmentTitle {
    constructor() {
        classes(() => 'truncate font-medium leading-none');
    }
}

@Directive({
    selector: '[hlmAttachmentDescription],hlm-attachment-description',
    exportAs: 'hlmAttachmentDescription',
    host: { 'data-slot': 'attachment-description' },
})
export class HlmAttachmentDescription {
    constructor() {
        classes(() => 'text-muted-foreground mt-1 truncate text-xs leading-none');
    }
}

@Directive({
    selector: '[hlmAttachmentActions],hlm-attachment-actions',
    exportAs: 'hlmAttachmentActions',
    host: { 'data-slot': 'attachment-actions' },
})
export class HlmAttachmentActions {
    constructor() {
        classes(() => 'flex shrink-0 items-center gap-1');
    }
}

@Directive({
    selector: '[hlmAttachmentAction],hlm-attachment-action',
    exportAs: 'hlmAttachmentAction',
    host: { 'data-slot': 'attachment-action' },
})
export class HlmAttachmentAction {
    constructor() {
        classes(
            () =>
                'hover:bg-muted text-muted-foreground hover:text-foreground inline-flex size-7 items-center justify-center rounded-md transition-colors cursor-pointer',
        );
    }
}

@Directive({
    selector: '[hlmAttachmentTrigger],hlm-attachment-trigger',
    exportAs: 'hlmAttachmentTrigger',
    host: { 'data-slot': 'attachment-trigger' },
})
export class HlmAttachmentTrigger {
    constructor() {
        classes(() => 'cursor-pointer');
    }
}

export const HlmAttachmentImports = [
    HlmAttachmentGroup,
    HlmAttachment,
    HlmAttachmentMedia,
    HlmAttachmentContent,
    HlmAttachmentTitle,
    HlmAttachmentDescription,
    HlmAttachmentActions,
    HlmAttachmentAction,
    HlmAttachmentTrigger,
] as const;
