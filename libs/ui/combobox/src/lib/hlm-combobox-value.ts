import { Directive } from '@angular/core';

import { BrnComboboxValue, BrnComboboxValues, BrnComboboxValueTemplate } from '@spartan-ng/brain/combobox';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmComboboxValueTemplate]',
    exportAs: 'hlmComboboxValueTemplate',
    hostDirectives: [BrnComboboxValueTemplate],
})
export class HlmComboboxValueTemplate {}

@Directive({
    selector: '[hlmComboboxValue],hlm-combobox-value',
    exportAs: 'hlmComboboxValue',
    hostDirectives: [{ directive: BrnComboboxValue, inputs: ['placeholder'] }],
    host: { 'data-slot': 'combobox-value' },
})
export class HlmComboboxValue {
    constructor() {
        classes(() => 'data-hidden:hidden');
    }
}

@Directive({
    selector: '[hlmComboboxValues]',
    exportAs: 'hlmComboboxValues',
    hostDirectives: [BrnComboboxValues],
})
export class HlmComboboxValues {}
