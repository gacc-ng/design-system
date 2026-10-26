import { describe, expect, it } from 'vitest';

import { HlmAccordionImports } from '../accordion/src';
import { HlmAlertImports } from '../alert/src';
import { HlmAlertDialogImports } from '../alert-dialog/src';
import { HlmAutocompleteImports } from '../autocomplete/src';
import { HlmAvatarImports } from '../avatar/src';
import { HlmBadgeImports } from '../badge/src';
import { HlmBreadcrumbImports } from '../breadcrumb/src';
import { HlmButtonImports } from '../button/src';
import { HlmButtonGroupImports } from '../button-group/src';
import { HlmCalendarImports } from '../calendar/src';
import { HlmCardImports } from '../card/src';
import { HlmCheckboxImports } from '../checkbox/src';
import { HlmCollapsibleImports } from '../collapsible/src';
import { HlmComboboxImports } from '../combobox/src';
import { HlmCommandImports } from '../command/src';
import { HlmDataTableImports } from '../data-table/src';
import { HlmDatePickerImports } from '../date-picker/src';
import { HlmDialogImports } from '../dialog/src';
import { HlmDropdownMenuImports } from '../dropdown-menu/src';
import { HlmEmptyImports } from '../empty/src';
import { HlmFieldImports } from '../field/src';
import { HlmInputImports } from '../input/src';
import { HlmInputGroupImports } from '../input-group/src';
import { HlmInputOtpImports } from '../input-otp/src';
import { HlmItemImports } from '../item/src';
import { HlmKbdImports } from '../kbd/src';
import { HlmLabelImports } from '../label/src';
import { HlmNativeSelectImports } from '../native-select/src';
import { HlmPaginationImports } from '../pagination/src';
import { HlmPopoverImports } from '../popover/src';
import { HlmProgressImports } from '../progress/src';
import { HlmRadioGroupImports } from '../radio-group/src';
import { HlmSelectImports } from '../select/src';
import { HlmSeparatorImports } from '../separator/src';
import { HlmSheetImports } from '../sheet/src';
import { HlmSkeletonImports } from '../skeleton/src';
import { HlmSliderImports } from '../slider/src';
import { HlmSpinnerImports } from '../spinner/src';
import { HlmSwitchImports } from '../switch/src';
import { HlmTableImports } from '../table/src';
import { HlmTabsImports } from '../tabs/src';
import { HlmTextareaImports } from '../textarea/src';
import { HlmToggleImports } from '../toggle/src';
import { HlmToggleGroupImports } from '../toggle-group/src';
import { HlmTooltipImports } from '../tooltip/src';

describe('UI Primitives Barrel Exports Contract', () => {
    const barrels: Record<string, readonly unknown[]> = {
        accordion: HlmAccordionImports,
        alert: HlmAlertImports,
        'alert-dialog': HlmAlertDialogImports,
        autocomplete: HlmAutocompleteImports,
        avatar: HlmAvatarImports,
        badge: HlmBadgeImports,
        breadcrumb: HlmBreadcrumbImports,
        button: HlmButtonImports,
        'button-group': HlmButtonGroupImports,
        calendar: HlmCalendarImports,
        card: HlmCardImports,
        checkbox: HlmCheckboxImports,
        collapsible: HlmCollapsibleImports,
        combobox: HlmComboboxImports,
        command: HlmCommandImports,
        'data-table': HlmDataTableImports,
        'date-picker': HlmDatePickerImports,
        dialog: HlmDialogImports,
        'dropdown-menu': HlmDropdownMenuImports,
        empty: HlmEmptyImports,
        field: HlmFieldImports,
        input: HlmInputImports,
        'input-group': HlmInputGroupImports,
        'input-otp': HlmInputOtpImports,
        item: HlmItemImports,
        kbd: HlmKbdImports,
        label: HlmLabelImports,
        'native-select': HlmNativeSelectImports,
        pagination: HlmPaginationImports,
        popover: HlmPopoverImports,
        progress: HlmProgressImports,
        'radio-group': HlmRadioGroupImports,
        select: HlmSelectImports,
        separator: HlmSeparatorImports,
        sheet: HlmSheetImports,
        skeleton: HlmSkeletonImports,
        slider: HlmSliderImports,
        spinner: HlmSpinnerImports,
        switch: HlmSwitchImports,
        table: HlmTableImports,
        tabs: HlmTabsImports,
        textarea: HlmTextareaImports,
        toggle: HlmToggleImports,
        'toggle-group': HlmToggleGroupImports,
        tooltip: HlmTooltipImports,
    };

    it.each(Object.entries(barrels))('should export a non-empty imports array for %s', (_name, imports) => {
        expect(Array.isArray(imports)).toBe(true);
        expect(imports.length).toBeGreaterThan(0);
        for (const item of imports) {
            expect(typeof item).toBe('function');
        }
    });
});
