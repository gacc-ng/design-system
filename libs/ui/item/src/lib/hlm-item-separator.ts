import { Directive } from '@angular/core';

import { BrnSeparator } from '@spartan-ng/brain/separator';

import { hlmSeparatorClass } from '@gacc-ng/ui/separator';
import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmItemSeparator],hlm-item-separator',
    exportAs: 'hlmItemSeparator',
    hostDirectives: [{ directive: BrnSeparator, inputs: ['orientation', 'decorative'] }],
    host: {
        'data-slot': 'item-separator',
    },
})
export class HlmItemSeparator {
    constructor() {
        classes(() => [hlmSeparatorClass, 'my-2']);
    }
}
