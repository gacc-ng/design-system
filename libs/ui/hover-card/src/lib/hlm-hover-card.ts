import { Directive } from '@angular/core';

import { BrnHoverCard } from '@spartan-ng/brain/hover-card';

import { HlmHoverCardContent } from './hlm-hover-card-content';
import { HlmHoverCardPortal } from './hlm-hover-card-portal';
import { HlmHoverCardTrigger } from './hlm-hover-card-trigger';

@Directive({
    selector: '[hlmHoverCard],hlm-hover-card',
    exportAs: 'hlmHoverCard',
    hostDirectives: [BrnHoverCard],
    host: {
        'data-slot': 'hover-card',
    },
})
export class HlmHoverCard {}

export const HlmHoverCardImports = [
    HlmHoverCard,
    HlmHoverCardTrigger,
    HlmHoverCardContent,
    HlmHoverCardPortal,
] as const;
