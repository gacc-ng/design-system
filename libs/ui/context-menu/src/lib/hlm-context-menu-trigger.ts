import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkContextMenuTrigger } from '@angular/cdk/menu';
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

import { createMenuPosition, MENU_SIDE, type MenuAlign, type MenuSide } from '@spartan-ng/brain/core';

import { classes } from '@gacc-ng/ui/utils';

export interface HlmContextMenuConfig {
    align: MenuAlign;
    side: MenuSide;
}

const defaultConfig: HlmContextMenuConfig = {
    align: 'start',
    side: 'bottom',
};

const HlmContextMenuConfigToken = new InjectionToken<HlmContextMenuConfig>('HlmContextMenuConfig');

export function provideHlmContextMenuConfig(config: Partial<HlmContextMenuConfig>): ValueProvider {
    return { provide: HlmContextMenuConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectHlmContextMenuConfig(): HlmContextMenuConfig {
    return inject(HlmContextMenuConfigToken, { optional: true }) ?? defaultConfig;
}

@Directive({
    selector: '[hlmContextMenuTrigger]',
    exportAs: 'hlmContextMenuTrigger',
    providers: [{ provide: MENU_SIDE, useExisting: forwardRef(() => HlmContextMenuTrigger) }],
    hostDirectives: [
        {
            directive: CdkContextMenuTrigger,
            inputs: [
                'cdkContextMenuTriggerFor: hlmContextMenuTrigger',
                'cdkContextMenuTriggerData: hlmContextMenuTriggerData',
                'cdkContextMenuDisabled: disabled',
            ],
            outputs: ['cdkContextMenuOpened: hlmContextMenuOpened', 'cdkContextMenuClosed: hlmContextMenuClosed'],
        },
    ],
    host: {
        'data-slot': 'context-menu-trigger',
        '[attr.data-disabled]': 'disabled() ? "" : null',
    },
})
export class HlmContextMenuTrigger {
    private readonly _cdkTrigger = inject(CdkContextMenuTrigger, { host: true });
    private readonly _config = injectHlmContextMenuConfig();

    public readonly disabled = input<boolean, BooleanInput>(this._cdkTrigger.disabled, { transform: booleanAttribute });

    public readonly align = input<MenuAlign>(this._config.align);
    public readonly side = input<MenuSide>(this._config.side);

    private readonly _menuPosition = computed(() => createMenuPosition(this.align(), this.side()));

    constructor() {
        (this._cdkTrigger as { transformOriginSelector?: string }).transformOriginSelector =
            '[data-slot="dropdown-menu"]';

        effect(() => {
            this._cdkTrigger.menuPosition = this._menuPosition();
        });

        classes(() => 'select-none');
    }
}

export const HlmContextMenuImports = [HlmContextMenuTrigger] as const;
