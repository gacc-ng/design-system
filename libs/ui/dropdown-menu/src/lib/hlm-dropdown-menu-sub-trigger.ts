import { CdkMenuTrigger } from '@angular/cdk/menu';
import { computed, Directive, effect, forwardRef, inject, input } from '@angular/core';

import {
    createMenuPosition,
    MENU_SIDE,
    type MenuAlign,
    type MenuSide,
    updateMenuPosition,
} from '@spartan-ng/brain/core';

import { classes } from '@gacc-ng/ui/utils';

import { injectHlmDropdownMenuConfig } from './hlm-dropdown-menu.token';

@Directive({
    selector: '[hlmDropdownMenuSubTrigger]',
    exportAs: 'hlmDropdownMenuSubTrigger',
    providers: [{ provide: MENU_SIDE, useExisting: forwardRef(() => HlmDropdownMenuSubTrigger) }],
    hostDirectives: [
        {
            directive: CdkMenuTrigger,
            inputs: ['cdkMenuTriggerFor: hlmDropdownMenuSubTrigger', 'cdkMenuTriggerData: hlmDropdownMenuTriggerData'],
            outputs: ['cdkMenuOpened: hlmDropdownMenuSubOpened', 'cdkMenuClosed: hlmDropdownMenuSubClosed'],
        },
    ],
    host: { 'data-slot': 'dropdown-menu-sub-trigger' },
})
export class HlmDropdownMenuSubTrigger {
    private readonly _cdkTrigger = inject(CdkMenuTrigger, { host: true });
    private readonly _config = injectHlmDropdownMenuConfig();

    public readonly align = input<MenuAlign>(this._config.align);
    public readonly side = input<MenuSide>(this._config.side);

    private readonly _menuPosition = computed(() => createMenuPosition(this.align(), this.side()));

    constructor() {
        (this._cdkTrigger as { transformOriginSelector?: string }).transformOriginSelector =
            '[data-slot="dropdown-menu-sub"]';

        effect(() => {
            updateMenuPosition(this._cdkTrigger, this._menuPosition());
        });

        classes(() => 'aria-expanded:bg-accent aria-expanded:text-accent-foreground');
    }
}
