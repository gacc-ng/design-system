import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'optgroup[hlmNativeSelectOptGroup]',
    exportAs: 'hlmNativeSelectOptGroup',
    host: { 'data-slot': 'native-select-optgroup' },
})
export class HlmNativeSelectOptGroup {
    constructor() {
        classes(() => 'bg-[Canvas] text-[CanvasText]');
    }
}
