import { type BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideX } from '@ng-icons/lucide';
import {
    BrnComboboxAnchor,
    BrnComboboxClear,
    BrnComboboxInput,
    BrnComboboxPopoverTrigger,
} from '@spartan-ng/brain/combobox';

import { HlmInputGroup, HlmInputGroupImports } from '@gacc-ng/ui/input-group';
import { classes } from '@gacc-ng/ui/utils';

@Component({
    selector: 'hlm-combobox-input',
    exportAs: 'hlmComboboxInput',
    imports: [HlmInputGroupImports, NgIcon, BrnComboboxInput, BrnComboboxClear, BrnComboboxPopoverTrigger],
    providers: [provideIcons({ lucideChevronDown, lucideX })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [BrnComboboxAnchor, HlmInputGroup],
    template: `
        <input
            brnComboboxInput
            #comboboxInput="brnComboboxInput"
            brnComboboxPopoverTrigger
            [closeOnTriggerClick]="false"
            hlmInputGroupInput
            [id]="inputId()"
            [placeholder]="placeholder()"
            [forceInvalid]="forceInvalid()"
            [aria-invalid]="ariaInvalidInput()"
        />

        <hlm-input-group-addon align="inline-end">
            @if (showTrigger()) {
                <button
                    brnComboboxPopoverTrigger
                    hlmInputGroupButton
                    data-slot="input-group-button"
                    [disabled]="comboboxInput.disabled()"
                    [attr.aria-label]="triggerAriaLabel()"
                    size="icon-xs"
                    variant="ghost"
                    class="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
                >
                    <ng-icon name="lucideChevronDown" />
                </button>
            }

            @if (showClear()) {
                <button
                    *brnComboboxClear
                    hlmInputGroupButton
                    data-slot="combobox-clear"
                    [disabled]="comboboxInput.disabled()"
                    [attr.aria-label]="clearAriaLabel()"
                    size="icon-xs"
                    variant="ghost"
                >
                    <ng-icon name="lucideX" />
                </button>
            }
        </hlm-input-group-addon>

        <ng-content />
    `,
})
export class HlmComboboxInput {
    private static _id = 0;

    public readonly inputId = input<string>(`hlm-combobox-input-${HlmComboboxInput._id++}`);
    public readonly placeholder = input<string>('');

    public readonly showTrigger = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
    public readonly showClear = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
    public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    public readonly triggerAriaLabel = input<string>('Toggle options');
    public readonly clearAriaLabel = input<string>('Clear selection');

    public readonly ariaInvalidInput = input<boolean | undefined, BooleanInput>(undefined, {
        transform: (v: BooleanInput) => (v === '' || v === undefined ? undefined : booleanAttribute(v)),
        alias: 'aria-invalid',
    });

    constructor() {
        classes(() => 'w-auto');
    }
}
