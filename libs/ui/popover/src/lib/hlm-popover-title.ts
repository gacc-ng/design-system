import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

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
