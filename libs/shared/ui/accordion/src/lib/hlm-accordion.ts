import { Directive } from '@angular/core';

import { BrnAccordion } from '@spartan-ng/brain/accordion';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmAccordion], hlm-accordion',
    exportAs: 'hlmAccordion',
    hostDirectives: [{ directive: BrnAccordion, inputs: ['type', 'orientation'] }],
    host: {
        'data-slot': 'accordion',
    },
})
export class HlmAccordion {
    constructor() {
        classes(() => 'overflow-hidden rounded-xl border flex w-full flex-col bg-card text-card-foreground shadow-xs');
    }
}
