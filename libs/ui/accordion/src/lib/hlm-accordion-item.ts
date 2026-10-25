import { Directive } from '@angular/core';

import { BrnAccordionItem } from '@spartan-ng/brain/accordion';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmAccordionItem],hlm-accordion-item',
    exportAs: 'hlmAccordionItem',
    hostDirectives: [
        {
            directive: BrnAccordionItem,
            inputs: ['isOpened', 'disabled'],
            outputs: ['openedChange'],
        },
    ],
    host: {
        'data-slot': 'accordion-item',
    },
})
export class HlmAccordionItem {
    constructor() {
        classes(() => 'border-b last:border-b-0 data-[state=open]:bg-muted/30 flex flex-col transition-colors');
    }
}
