import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'th[hlmTh],th[hlmTableHead]',
    exportAs: 'hlmTh',
    host: {
        'data-slot': 'table-head',
    },
})
export class HlmTh {
    constructor() {
        classes(
            () =>
                'text-foreground h-10 px-2 text-start align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pe-0',
        );
    }
}
