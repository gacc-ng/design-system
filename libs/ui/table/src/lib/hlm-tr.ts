import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'tr[hlmTr],tr[hlmTableRow]',
    exportAs: 'hlmTr',
    host: {
        'data-slot': 'table-row',
    },
})
export class HlmTr {
    constructor() {
        classes(
            () =>
                'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors has-aria-expanded:bg-muted/50',
        );
    }
}
