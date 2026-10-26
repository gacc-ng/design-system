import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'caption[hlmCaption],caption[hlmTableCaption]',
    exportAs: 'hlmCaption',
    host: {
        'data-slot': 'table-caption',
    },
})
export class HlmCaption {
    constructor() {
        classes(() => 'text-muted-foreground mt-4 text-sm');
    }
}
