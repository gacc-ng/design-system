import { type BooleanInput } from '@angular/cdk/coercion';
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

import { HlmCalendarImports } from '@gacc-ng/ui/calendar';
import { HlmPopoverImports } from '@gacc-ng/ui/popover';

export interface HlmMonthYearPickerConfig<T> {
    /**
     * If true, the date picker will close when a date is selected.
     */
    autoCloseOnSelect: boolean;

    /**
     * Defines how the date should be displayed in the UI.
     */
    formatDate: (date: T) => string;

    /**
     * Defines how the date should be displayed while the input is focused,
     * i.e. the format the user is expected to type in.
     */
    formatInputDate: (date: T) => string;

    /**
     * Defines how the date should be transformed before saving to model/form.
     */
    transformDate: (date: T) => T;

    /**
     * Parse a user-entered string into a date.
     */
    parseDate: (value: string) => T | null;
}

const mmYYYY = <T>(date: T) => {
    if (!(date instanceof Date)) return `${date}`;

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${year}`;
};

function getDefaultConfig<T>(): HlmMonthYearPickerConfig<T> {
    return {
        formatDate: mmYYYY,
        formatInputDate: mmYYYY,
        transformDate: (date) => date,
        parseDate: (value) => {
            if (typeof value !== 'string') return null;

            const match = value.match(/^(\d{2})\/(\d{4})$/);
            if (!match) return null;

            const month = Number(match[1]);
            const year = Number(match[2]);

            if (month < 1 || month > 12) return null;

            const date = new Date(year, month - 1, 1);

            return date as T;
        },
        autoCloseOnSelect: false,
    };
}

const HlmMonthYearPickerConfigToken = new InjectionToken<HlmMonthYearPickerConfig<unknown>>('HlmMonthYearPickerConfig');

export function provideHlmMonthYearPickerConfig<T>(config: Partial<HlmMonthYearPickerConfig<T>>): ValueProvider {
    return { provide: HlmMonthYearPickerConfigToken, useValue: { ...getDefaultConfig(), ...config } };
}

export function injectHlmMonthYearPickerConfig<T>(): HlmMonthYearPickerConfig<T> {
    const injectedConfig = inject(HlmMonthYearPickerConfigToken, { optional: true });
    return injectedConfig ? (injectedConfig as HlmMonthYearPickerConfig<T>) : getDefaultConfig();
}

export const HLM_MONTH_YEAR_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HlmMonthYearPicker),
    multi: true,
};

@Component({
    selector: 'hlm-month-year-picker',
    exportAs: 'hlmMonthYearPicker',
    imports: [HlmPopoverImports, HlmCalendarImports],
    providers: [
        HLM_MONTH_YEAR_PICKER_VALUE_ACCESSOR,
        provideBrnDatePicker(HlmMonthYearPicker),
        provideBrnLabelable(HlmMonthYearPicker),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [BrnFieldControl],
    host: { class: 'block' },
    template: `
        <hlm-popover [align]="align()" sideOffset="5" [state]="_popoverState()" (stateChanged)="_onStateChange($event)">
            <ng-content />

            <hlm-popover-content class="w-fit p-0" *hlmPopoverPortal="let ctx">
                <ng-content select="[hlmDatePickerHeader]" />
                <hlm-month-year-calendar
                    class="rounded-none border-0"
                    [date]="_mutableDate()"
                    [defaultFocusedDate]="_mutableDate() ?? defaultFocusedDate()"
                    [min]="minDate()"
                    [max]="maxDate()"
                    [disabled]="_disabled()"
                    (dateChange)="_handleChange($event)"
                />
                <ng-content select="[hlmDatePickerFooter]" />
            </hlm-popover-content>
        </hlm-popover>
    `,
})
export class HlmMonthYearPicker<T> implements BrnDatePickerBase<T>, ControlValueAccessor {
    private readonly _config = injectHlmMonthYearPickerConfig<T>();

    public readonly popover = viewChild.required(BrnPopover);

    private readonly _trigger = contentChild(BrnDatePickerTriggerToken);

    public readonly align = input<BrnPopoverAlign>('center');

    /** The minimum date that can be selected.*/
    public readonly minDate = input<T>();

    /** The maximum date that can be selected. */
    public readonly maxDate = input<T>();

    /** Determine if the date picker is disabled. */
    public readonly disabled = input<boolean, BooleanInput>(false, {
        transform: booleanAttribute,
    });

    /** The selected value. */
    public readonly date = input<T>();

    /** The date the calendar focuses on first open when no date is selected. */
    public readonly defaultFocusedDate = input<T>();

    protected readonly _mutableDate = linkedSignal(this.date);

    /** If true, the date picker will close when a date is selected. */
    public readonly autoCloseOnSelect = input<boolean, BooleanInput>(this._config.autoCloseOnSelect, {
        transform: booleanAttribute,
    });

    /** Defines how the date should be displayed in the UI.  */
    public readonly formatDate = input<(date: T) => string>(this._config.formatDate);

    /** Defines how the date should be transformed before saving to model/form. */
    public readonly transformDate = input<(date: T) => T>(this._config.transformDate);

    protected readonly _popoverState = signal<BrnOverlayState | null>(null);

    protected readonly _disabled = linkedSignal(this.disabled);

    /** @internal The disabled state as a readonly signal */
    public readonly disabledState = this._disabled.asReadonly();

    public readonly formattedDate = computed(() => {
        const date = this._mutableDate();
        return date ? this.formatDate()(date) : undefined;
    });

    public readonly dateChange = output<T | null>();

    public readonly labelableId = computed(() => this._trigger()?.triggerId());

    public readonly hasDate = computed(() => !!this._mutableDate());

    /** @internal The current raw value, used by inputs to reformat on focus. */
    public readonly value = computed(() => this._mutableDate() ?? null);

    protected _onChange?: ChangeFn<T | null>;
    protected _onTouched?: TouchFn;

    protected _onStateChange(state: BrnOverlayState) {
        this._popoverState.set(state);
        if (state === 'closed') this._onTouched?.();
    }

    protected _handleChange(value: T | undefined) {
        if (this._disabled()) return;
        this.updateDate(value ?? null);

        if (this.autoCloseOnSelect()) {
            this._popoverState.set('closed');
        }
    }

    /**
     * Commit a date to the picker. Updates the internal model, notifies form
     * controls, and emits `dateChange`.
     */
    public updateDate(value: T | null) {
        if (this._disabled()) return;
        const transformedDate = value != null ? this.transformDate()(value) : undefined;

        this._mutableDate.set(transformedDate);
        this._onChange?.(transformedDate ?? null);
        this.dateChange.emit(transformedDate ?? null);
    }

    /** CONTROL VALUE ACCESSOR */
    public writeValue(value: T | null): void {
        this._mutableDate.set(value ? this.transformDate()(value) : undefined);
    }

    public registerOnChange(fn: ChangeFn<T | null>): void {
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
        this._onChange?.(null);
        this.dateChange.emit(null);
    }
}
