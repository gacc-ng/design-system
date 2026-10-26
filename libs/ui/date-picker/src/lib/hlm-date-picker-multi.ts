import { type BooleanInput, type NumberInput } from '@angular/cdk/coercion';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    forwardRef,
    inject,
    InjectionToken,
    input,
    linkedSignal,
    numberAttribute,
    output,
    signal,
    type ValueProvider,
    viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { type BrnDatePickerBase, BrnDatePickerTriggerToken, provideBrnDatePicker } from '@spartan-ng/brain/date-picker';
import { BrnFieldControl, provideBrnLabelable } from '@spartan-ng/brain/field';
import { type ChangeFn, type TouchFn } from '@spartan-ng/brain/forms';
import { type BrnOverlayState } from '@spartan-ng/brain/overlay';
import { BrnPopover, type BrnPopoverAlign } from '@spartan-ng/brain/popover';

import { HlmCalendarMulti } from '@gacc-ng/ui/calendar';
import { HlmPopoverImports } from '@gacc-ng/ui/popover';

export interface HlmDatePickerMultiConfig<T> {
    /**
     * If true, the date picker will close when the max selection of dates is reached.
     */
    autoCloseOnMaxSelection: boolean;

    /**
     * Defines how the date should be displayed in the UI.
     */
    formatDates: (dates: T[]) => string;

    /**
     * Defines how the dates should be displayed while the input is focused,
     * i.e. the format the user is expected to type in.
     */
    formatInputDates: (dates: T[]) => string;

    /**
     * Defines how the date should be transformed before saving to model/form.
     */
    transformDates: (dates: T[]) => T[];

    /**
     * Parse a user-entered string into a date.
     */
    parseDate: (value: string) => T[] | null;
}

function getDefaultConfig<T>(): HlmDatePickerMultiConfig<T> {
    return {
        formatDates: (dates) =>
            dates.map((date) => (date instanceof Date ? date.toDateString() : `${date}`)).join(', '),
        formatInputDates: (dates) =>
            dates
                .map((date) => {
                    if (!(date instanceof Date)) return `${date}`;

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();

                    return `${day}/${month}/${year}`;
                })
                .join(', '),
        transformDates: (dates) => dates,
        autoCloseOnMaxSelection: false,
        parseDate: (value) => {
            if (typeof value !== 'string') return null;

            const parts = value.split(',').map((v) => v.trim());
            const result: Date[] = [];

            for (const part of parts) {
                const match = part.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                if (!match) return null;

                const day = Number(match[1]);
                const month = Number(match[2]);
                const year = Number(match[3]);

                if (month < 1 || month > 12) return null;
                if (day < 1 || day > 31) return null;

                const date = new Date(year, month - 1, day);

                if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
                    return null;
                }

                result.push(date);
            }

            return result as T[];
        },
    };
}

const HlmDatePickerMultiConfigToken = new InjectionToken<HlmDatePickerMultiConfig<unknown>>('HlmDatePickerMultiConfig');

export function provideHlmDatePickerMultiConfig<T>(config: Partial<HlmDatePickerMultiConfig<T>>): ValueProvider {
    return { provide: HlmDatePickerMultiConfigToken, useValue: { ...getDefaultConfig(), ...config } };
}

export function injectHlmDatePickerMultiConfig<T>(): HlmDatePickerMultiConfig<T> {
    const injectedConfig = inject(HlmDatePickerMultiConfigToken, { optional: true });
    return injectedConfig ? (injectedConfig as HlmDatePickerMultiConfig<T>) : getDefaultConfig();
}

export const HLM_DATE_PICKER_MULTI_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HlmDatePickerMulti),
    multi: true,
};

@Component({
    selector: 'hlm-date-picker-multi',
    exportAs: 'hlmDatePickerMulti',
    imports: [HlmPopoverImports, HlmCalendarMulti],
    providers: [
        HLM_DATE_PICKER_MULTI_VALUE_ACCESSOR,
        provideBrnDatePicker(HlmDatePickerMulti),
        provideBrnLabelable(HlmDatePickerMulti),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [BrnFieldControl],
    host: { class: 'block' },
    template: `
        <hlm-popover [align]="align()" sideOffset="5" [state]="_popoverState()" (stateChanged)="_onStateChange($event)">
            <ng-content />

            <hlm-popover-content class="w-fit p-0" *hlmPopoverPortal="let ctx">
                <ng-content select="[hlmDatePickerHeader]" />
                <hlm-calendar-multi
                    class="rounded-none border-0"
                    [date]="_mutableDate()"
                    [captionLayout]="captionLayout()"
                    [min]="minDate()"
                    [max]="maxDate()"
                    [minSelection]="minSelection()"
                    [maxSelection]="maxSelection()"
                    [disabled]="_disabled()"
                    (dateChange)="_handleChange($event)"
                />
                <ng-content select="[hlmDatePickerFooter]" />
            </hlm-popover-content>
        </hlm-popover>
    `,
})
export class HlmDatePickerMulti<T> implements BrnDatePickerBase<T[]>, ControlValueAccessor {
    private readonly _config = injectHlmDatePickerMultiConfig<T>();

    public readonly popover = viewChild.required(BrnPopover);

    private readonly _trigger = contentChild(BrnDatePickerTriggerToken);

    public readonly align = input<BrnPopoverAlign>('center');

    /** Show dropdowns to navigate between months or years. */
    public readonly captionLayout = input<'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'>('label');

    /** The minimum date that can be selected.*/
    public readonly minDate = input<T>();

    /** The maximum date that can be selected. */
    public readonly maxDate = input<T>();

    /** The minimum selectable dates.  */
    public readonly minSelection = input<number, NumberInput>(undefined, {
        transform: numberAttribute,
    });

    /** The maximum selectable dates.  */
    public readonly maxSelection = input<number, NumberInput>(undefined, {
        transform: numberAttribute,
    });

    /** Determine if the date picker is disabled. */
    public readonly disabled = input<boolean, BooleanInput>(false, {
        transform: booleanAttribute,
    });

    /** The selected value. */
    public readonly date = input<T[]>();

    protected readonly _mutableDate = linkedSignal(this.date);

    /** If true, the date picker will close when the max selection of dates is reached. */
    public readonly autoCloseOnMaxSelection = input<boolean, BooleanInput>(this._config.autoCloseOnMaxSelection, {
        transform: booleanAttribute,
    });

    /** Defines how the date should be displayed in the UI.  */
    public readonly formatDates = input<(date: T[]) => string>(this._config.formatDates);

    /** Defines how the date should be transformed before saving to model/form. */
    public readonly transformDates = input<(date: T[]) => T[]>(this._config.transformDates);

    protected readonly _popoverState = signal<BrnOverlayState | null>(null);

    protected readonly _disabled = linkedSignal(this.disabled);

    /** @internal The disabled state as a readonly signal */
    public readonly disabledState = this._disabled.asReadonly();

    public readonly formattedDate = computed(() => {
        const dates = this._mutableDate();
        return dates ? this.formatDates()(dates) : undefined;
    });

    public readonly dateChange = output<T[]>();

    public readonly labelableId = computed(() => this._trigger()?.triggerId());

    public readonly hasDate = computed(() => !!this._mutableDate()?.length);

    /** @internal The current raw value, used by inputs to reformat on focus. */
    public readonly value = computed(() => this._mutableDate() ?? null);

    protected _onChange?: ChangeFn<T[]>;
    protected _onTouched?: TouchFn;

    protected _onStateChange(state: BrnOverlayState) {
        this._popoverState.set(state);
        if (state === 'closed') this._onTouched?.();
    }

    protected _handleChange(value: T[] | undefined) {
        if (value === undefined) return;

        if (this._disabled()) return;
        const transformedDate = value !== undefined ? this.transformDates()(value) : value;

        this._mutableDate.set(transformedDate);
        this._onChange?.(transformedDate);
        this.dateChange.emit(transformedDate);

        if (this.autoCloseOnMaxSelection() && this._mutableDate()?.length === this.maxSelection()) {
            this._popoverState.set('closed');
        }
    }

    /**
     * Commit dates to the picker. Updates the internal model, notifies form
     * controls, and emits `dateChange`.
     */
    public updateDate(value: T[] | null) {
        if (this._disabled()) return;
        const transformedDate = value ? this.transformDates()(value) : undefined;

        this._mutableDate.set(transformedDate);
        this._onChange?.(transformedDate ?? []);
        this.dateChange.emit(transformedDate ?? []);
    }

    public touched(): void {
        this._onTouched?.();
    }

    /** CONTROL VALUE ACCESSOR */
    public writeValue(value: T[] | null): void {
        this._mutableDate.set(value ? this.transformDates()(value) : undefined);
    }

    public registerOnChange(fn: ChangeFn<T[]>): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: TouchFn): void {
        this._onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this._disabled.set(isDisabled);
    }

    public open() {
        this._popoverState.set('open');
    }

    public close() {
        this._popoverState.set('closed');
    }

    public reset() {
        this._mutableDate.set(undefined);
        this._onChange?.([]);
        this.dateChange.emit([]);
    }
}
