import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'table[hlmTable]',
    exportAs: 'hlmTable',
    host: {
        'data-slot': 'table',
    },
})
export class HlmTable {
    constructor() {
        classes(() => 'w-full caption-bottom text-sm');
    }
}
