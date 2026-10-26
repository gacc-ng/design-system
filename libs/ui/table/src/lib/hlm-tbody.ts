import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'tbody[hlmTBody],tbody[hlmTableBody]',
    exportAs: 'hlmTBody',
    host: {
        'data-slot': 'table-body',
    },
})
export class HlmTBody {
    constructor() {
        classes(() => '[&_tr:last-child]:border-0');
    }
}
