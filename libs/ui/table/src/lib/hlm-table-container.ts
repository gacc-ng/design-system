import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'div[hlmTableContainer]',
    exportAs: 'hlmTableContainer',
    host: {
        'data-slot': 'table-container',
    },
})
export class HlmTableContainer {
    constructor() {
        classes(() => 'relative w-full overflow-x-auto');
    }
}
