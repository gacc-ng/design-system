import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'tfoot[hlmTFoot],tfoot[hlmTableFooter]',
    exportAs: 'hlmTFoot',
    host: {
        'data-slot': 'table-footer',
    },
})
export class HlmTFoot {
    constructor() {
        classes(() => 'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0');
    }
}
