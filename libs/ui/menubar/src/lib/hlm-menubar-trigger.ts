import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import {
    booleanAttribute,
    computed,
    Directive,
    effect,
    forwardRef,
    inject,
    InjectionToken,
    input,
    type ValueProvider,
} from '@angular/core';

import {
    createMenuPosition,
    MENU_SIDE,
    type MenuAlign,
    type MenuSide,
    updateMenuPosition,
} from '@spartan-ng/brain/core';

import { classes } from '@gacc-ng/ui/utils';

export interface HlmMenubarConfig {
    align: MenuAlign;
    side: MenuSide;
}

const defaultConfig: HlmMenubarConfig = {
    align: 'start',
    side: 'bottom',
};

const HlmMenubarConfigToken = new InjectionToken<HlmMenubarConfig>('HlmMenubarConfig');

export function provideHlmMenubarConfig(config: Partial<HlmMenubarConfig>): ValueProvider {
    return { provide: HlmMenubarConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectHlmMenubarConfig(): HlmMenubarConfig {
    return inject(HlmMenubarConfigToken, { optional: true }) ?? defaultConfig;
}

@Directive({
    selector: 'button[hlmMenubarTrigger]',
    exportAs: 'hlmMenubarTrigger',
    providers: [{ provide: MENU_SIDE, useExisting: forwardRef(() => HlmMenubarTrigger) }],
    hostDirectives: [
        {
            directive: CdkMenuItem,
            inputs: ['cdkMenuItemDisabled: disabled'],
        },
        {
            directive: CdkMenuTrigger,
            inputs: ['cdkMenuTriggerFor: hlmMenubarTrigger', 'cdkMenuTriggerData: hlmMenubarTriggerData'],
            outputs: ['cdkMenuOpened: hlmDropdownMenuOpened', 'cdkMenuClosed: hlmDropdownMenuClosed'],
        },
    ],
    host: {
        'data-slot': 'menubar-trigger',
        '[disabled]': 'disabled()',
        '[attr.data-disabled]': 'disabled() ? "" : null',
    },
})
export class HlmMenubarTrigger {
    private readonly _cdkTrigger = inject(CdkMenuTrigger, { host: true });
    private readonly _config = injectHlmMenubarConfig();

    public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    public readonly align = input<MenuAlign>(this._config.align);
    public readonly side = input<MenuSide>(this._config.side);

    private readonly _menuPosition = computed(() => createMenuPosition(this.align(), this.side()));

    constructor() {
        (this._cdkTrigger as { transformOriginSelector?: string }).transformOriginSelector =
            '[data-slot="dropdown-menu"]';

        effect(() => {
            updateMenuPosition(this._cdkTrigger, this._menuPosition());
        });

        classes(
            () =>
                'hover:bg-muted aria-expanded:bg-muted rounded-sm px-1.5 py-[2px] text-sm font-medium flex items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50',
        );
    }
}
