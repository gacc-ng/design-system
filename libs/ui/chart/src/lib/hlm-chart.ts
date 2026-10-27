import { Directive } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'tanstack-chart[hlmChart]',
    exportAs: 'hlmChart',
    host: {
        'data-slot': 'chart',
        style: `
			display: block;
			width: 100%;
			height: 100%;
			--ts-chart-1: var(--chart-1);
			--ts-chart-2: var(--chart-2);
			--ts-chart-3: var(--chart-3);
			--ts-chart-4: var(--chart-4);
			--ts-chart-5: var(--chart-5);
			--ts-chart-focus-fill: var(--background);
			--ts-chart-crosshair-label-halo: var(--background);
			--ts-chart-crosshair-marker-fill: var(--background);
			--ts-chart-tooltip-background: var(--popover);
			--ts-chart-tooltip-color: var(--popover-foreground);
			--ts-chart-tooltip-border: 1px solid var(--border);
		`,
    },
})
export class HlmChart {
    constructor() {
        classes(
            () =>
                'spartan-chart block w-full text-foreground [&_.ts-chart-host]:!h-full [&_.ts-chart-host]:!w-full [&_.ts-chart-surface]:!h-full [&_.ts-chart-surface]:!w-full [&_svg.ts-chart]:!h-full [&_svg.ts-chart]:!w-full',
        );
    }
}
