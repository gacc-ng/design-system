import { Directive } from '@angular/core';

import { BrnSeparator } from '@spartan-ng/brain/separator';

import { HlmSeparator } from '@gacc-ng/ui/separator';
import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmSidebarSeparator],hlm-sidebar-separator',
    exportAs: 'hlmSidebarSeparator',
    hostDirectives: [{ directive: BrnSeparator, inputs: ['orientation', 'decorative'] }, HlmSeparator],
    host: {
        'data-slot': 'sidebar-separator',
        'data-sidebar': 'separator',
    },
})
export class HlmSidebarSeparator {
    constructor() {
        classes(() => 'bg-sidebar-border mx-2 w-auto');
    }
}
