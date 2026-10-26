import { coerceNumberProperty, type NumberInput } from '@angular/cdk/coercion';
import { Directive, input } from '@angular/core';

import { classes } from '@gacc-ng/ui/utils';

export function parseDividedString(value: NumberInput): NumberInput {
    if (typeof value === 'string' && value.includes('/')) {
        const parts = value.split('/');
        if (parts.length === 2) {
            const num = Number(parts[0].trim());
            const den = Number(parts[1].trim());
            if (!Number.isNaN(num) && !Number.isNaN(den) && den !== 0) {
                return num / den;
            }
        }
    }
    return value;
}

@Directive({
    selector: '[hlmAspectRatio]',
    exportAs: 'hlmAspectRatio',
    host: {
        'data-slot': 'aspect-ratio',
        '[style.--ratio]': 'ratio()',
    },
})
export class HlmAspectRatio {
    public readonly ratio = input<number, NumberInput>(1, {
        alias: 'hlmAspectRatio',
        transform: (value: NumberInput) => {
            const coerced = coerceNumberProperty(parseDividedString(value));
            return coerced <= 0 ? 1 : coerced;
        },
    });

    constructor() {
        classes(() => 'relative aspect-(--ratio)');
    }
}

export const HlmAspectRatioImports = [HlmAspectRatio] as const;
