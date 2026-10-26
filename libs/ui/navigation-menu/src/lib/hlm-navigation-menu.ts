import { Directive } from '@angular/core';

import { BrnNavigationMenu } from '@spartan-ng/brain/navigation-menu';

import { classes } from '@gacc-ng/ui/utils';

import { HlmNavigationMenuContent } from './hlm-navigation-menu-content';
import { HlmNavigationMenuItem } from './hlm-navigation-menu-item';
import { HlmNavigationMenuLink } from './hlm-navigation-menu-link';
import { HlmNavigationMenuList } from './hlm-navigation-menu-list';
import { HlmNavigationMenuPortal } from './hlm-navigation-menu-portal';
import { HlmNavigationMenuTrigger } from './hlm-navigation-menu-trigger';

@Directive({
    selector: 'nav[hlmNavigationMenu]',
    exportAs: 'hlmNavigationMenu',
    hostDirectives: [
        {
            directive: BrnNavigationMenu,
            inputs: ['value', 'delayDuration', 'skipDelayDuration', 'orientation', 'openOn'],
            outputs: ['valueChange'],
        },
    ],
    host: {
        'data-slot': 'navigation-menu',
    },
})
export class HlmNavigationMenu {
    constructor() {
        classes(() => 'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center');
    }
}

export const HlmNavigationMenuImports = [
    HlmNavigationMenu,
    HlmNavigationMenuContent,
    HlmNavigationMenuItem,
    HlmNavigationMenuLink,
    HlmNavigationMenuList,
    HlmNavigationMenuPortal,
    HlmNavigationMenuTrigger,
] as const;
