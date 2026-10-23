import { computed, Directive, forwardRef, inject, input } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { type ChangeFn, type TouchFn } from '@spartan-ng/brain/forms';
import { BrnRadioGroup } from '@spartan-ng/brain/radio-group';
import { type ClassValue } from 'clsx';

import { classes } from '@gacc-ng/ui/utils';

export const HLM_RADIO_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HlmRadioGroup),
    multi: true,
};

@Directive({
    selector: '[hlmRadioGroup],hlm-radio-group',
    exportAs: 'hlmRadioGroup',
    providers: [HLM_RADIO_GROUP_VALUE_ACCESSOR],
    hostDirectives: [
        {
            directive: BrnRadioGroup,
            inputs: ['name', 'value', 'disabled', 'required'],
            outputs: ['valueChange'],
        },
        BrnFieldControlDescribedBy,
    ],
    host: {
        'data-slot': 'radio-group',
        '[attr.aria-invalid]': '_ariaInvalid() ? "true" : null',
        '[attr.data-invalid]': '_ariaInvalid() ? "true" : null',
        '[attr.data-dirty]': '_dirty() ? "true" : null',
        '[attr.data-touched]': '_touched() ? "true" : null',
    },
})
export class HlmRadioGroup implements ControlValueAccessor {
    public readonly userClass = input<ClassValue>('', { alias: 'class' });
    private readonly _brnRadioGroup = inject(BrnRadioGroup);
    protected readonly _ariaInvalid = computed(() => this._brnRadioGroup.controlState?.()?.invalid);
    protected readonly _touched = computed(() => this._brnRadioGroup.controlState?.()?.touched);
    protected readonly _dirty = computed(() => this._brnRadioGroup.controlState?.()?.dirty);
    protected readonly _errorState = computed(() => this._brnRadioGroup.controlState?.()?.spartanInvalid);

    constructor() {
        classes(() => [
            'grid gap-3',
            this.userClass(),
            this._errorState() ? 'data-[invalid=true]:text-destructive' : '',
        ]);
    }

    writeValue(value: unknown): void {
        this._brnRadioGroup.writeValue(value);
    }

    registerOnChange(fn: ChangeFn<unknown>): void {
        this._brnRadioGroup.registerOnChange(fn);
    }

    registerOnTouched(fn: TouchFn): void {
        this._brnRadioGroup.registerOnTouched(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        this._brnRadioGroup.setDisabledState(isDisabled);
    }
}
