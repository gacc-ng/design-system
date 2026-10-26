import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'thead[hlmTHead],thead[hlmTableHeader]',
    exportAs: 'hlmTHead',
    host: {
        'data-slot': 'table-header',
    },
})
export class HlmTHead {
    constructor() {
        classes(() => '[&_tr]:border-b');
    }
}
