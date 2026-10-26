import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmEmptyContent],hlm-empty-content',
    exportAs: 'hlmEmptyContent',
    host: {
        'data-slot': 'empty-content',
    },
})
export class HlmEmptyContent {
    constructor() {
        classes(() => 'gap-2.5 text-sm flex w-full max-w-sm min-w-0 flex-col items-center text-balance');
    }
}
