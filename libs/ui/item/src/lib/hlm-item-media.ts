import { Directive, input } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

import { injectHlmItemMediaConfig, type ItemMediaVariants } from './hlm-item.token';
import { itemMediaVariants } from './hlm-item-variants';

@Directive({
    selector: '[hlmItemMedia],hlm-item-media',
    exportAs: 'hlmItemMedia',
    host: {
        'data-slot': 'item-media',
        '[attr.data-variant]': 'variant()',
    },
})
export class HlmItemMedia {
    private readonly _config = injectHlmItemMediaConfig();
    public readonly variant = input<ItemMediaVariants['variant']>(this._config.variant);

    constructor() {
        classes(() => itemMediaVariants({ variant: this.variant() }));
    }
}
