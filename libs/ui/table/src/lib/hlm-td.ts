import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'td[hlmTd],td[hlmTableCell]',
    exportAs: 'hlmTd',
    host: {
        'data-slot': 'table-cell',
    },
})
export class HlmTd {
    constructor() {
        classes(() => 'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0');
    }
}
