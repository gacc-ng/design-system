import { Directive, input } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

import { injectHlmItemConfig, type ItemVariants } from './hlm-item.token';
import { itemVariants } from './hlm-item-variants';

@Directive({
    selector: '[hlmItem],hlm-item',
    exportAs: 'hlmItem',
    host: {
        'data-slot': 'item',
        '[attr.data-variant]': 'variant()',
        '[attr.data-size]': 'size()',
    },
})
export class HlmItem {
    private readonly _config = injectHlmItemConfig();
    public readonly variant = input<ItemVariants['variant']>(this._config.variant);
    public readonly size = input<ItemVariants['size']>(this._config.size);

    constructor() {
        classes(() => itemVariants({ variant: this.variant(), size: this.size() }));
    }
}
