import { describe, expect, it } from 'vitest';

import { HlmAccordionImports } from '../accordion/src';
import { HlmAlertImports } from '../alert/src';
import { HlmAlertDialogImports } from '../alert-dialog/src';
import { HlmAspectRatioImports } from '../aspect-ratio/src';
import { HlmAttachmentImports } from '../attachment/src';
import { HlmAutocompleteImports } from '../autocomplete/src';
import { HlmAvatarImports } from '../avatar/src';
import { HlmBadgeImports } from '../badge/src';
import { HlmBreadcrumbImports } from '../breadcrumb/src';
import { HlmBubbleImports } from '../bubble/src';
import { HlmButtonImports } from '../button/src';
import { HlmButtonGroupImports } from '../button-group/src';
import { HlmCalendarImports } from '../calendar/src';
import { HlmCardImports } from '../card/src';
import { HlmCarouselImports } from '../carousel/src';
import { HlmCheckboxImports } from '../checkbox/src';
import { HlmCodeBlockImports } from '../code-block/src';
import { HlmCollapsibleImports } from '../collapsible/src';
import { HlmComboboxImports } from '../combobox/src';
import { HlmCommandImports } from '../command/src';
import { HlmContextMenuImports } from '../context-menu/src';
import { HlmDataTableImports } from '../data-table/src';
import { HlmDatePickerImports } from '../date-picker/src';
import { HlmDialogImports } from '../dialog/src';
import { HlmDrawerImports } from '../drawer/src';
import { HlmDropdownMenuImports } from '../dropdown-menu/src';
import { HlmEmptyImports } from '../empty/src';
import { HlmFieldImports } from '../field/src';
import { HlmHoverCardImports } from '../hover-card/src';
import { HlmInputImports } from '../input/src';
import { HlmInputGroupImports } from '../input-group/src';
import { HlmInputOtpImports } from '../input-otp/src';
import { HlmItemImports } from '../item/src';
import { HlmKbdImports } from '../kbd/src';
import { HlmLabelImports } from '../label/src';
import { HlmMarkerImports } from '../marker/src';
import { HlmMenubarImports } from '../menubar/src';
import { HlmMessageImports } from '../message/src';
import { HlmMessageScrollerImports } from '../message-scroller/src';
import { HlmNativeSelectImports } from '../native-select/src';
import { HlmNavigationMenuImports } from '../navigation-menu/src';
import { HlmPaginationImports } from '../pagination/src';
import { HlmPopoverImports } from '../popover/src';
import { HlmProgressImports } from '../progress/src';
import { HlmQuestionnaireImports } from '../questionnaire/src';
import { HlmRadioGroupImports } from '../radio-group/src';
import { HlmResizableImports } from '../resizable/src';
import { HlmScrollAreaImports } from '../scroll-area/src';
import { HlmSelectImports } from '../select/src';
import { HlmSeparatorImports } from '../separator/src';
import { HlmSheetImports } from '../sheet/src';
import { HlmSidebarImports } from '../sidebar/src';
import { HlmSkeletonImports } from '../skeleton/src';
import { HlmSliderImports } from '../slider/src';
import { HlmToasterImports } from '../sonner/src';
import { HlmSpinnerImports } from '../spinner/src';
import { HlmSwitchImports } from '../switch/src';
import { HlmTableImports } from '../table/src';
import { HlmTabsImports } from '../tabs/src';
import { HlmTextareaImports } from '../textarea/src';
import { HlmToggleImports } from '../toggle/src';
import { HlmToggleGroupImports } from '../toggle-group/src';
import { HlmTooltipImports } from '../tooltip/src';
import { HlmTraceImports } from '../trace/src';
import { HlmTypographyImports } from '../typography/src';

describe('UI Primitives Barrel Exports Contract', () => {
    const barrels: Record<string, readonly unknown[]> = {
        accordion: HlmAccordionImports,
        alert: HlmAlertImports,
        'alert-dialog': HlmAlertDialogImports,
        'aspect-ratio': HlmAspectRatioImports,
        attachment: HlmAttachmentImports,
        autocomplete: HlmAutocompleteImports,
        avatar: HlmAvatarImports,
        badge: HlmBadgeImports,
        breadcrumb: HlmBreadcrumbImports,
        bubble: HlmBubbleImports,
        button: HlmButtonImports,
        'button-group': HlmButtonGroupImports,
        calendar: HlmCalendarImports,
        card: HlmCardImports,
        carousel: HlmCarouselImports,
        checkbox: HlmCheckboxImports,
        'code-block': HlmCodeBlockImports,
        collapsible: HlmCollapsibleImports,
        combobox: HlmComboboxImports,
        command: HlmCommandImports,
        'context-menu': HlmContextMenuImports,
        'data-table': HlmDataTableImports,
        'date-picker': HlmDatePickerImports,
        dialog: HlmDialogImports,
        drawer: HlmDrawerImports,
        'dropdown-menu': HlmDropdownMenuImports,
        empty: HlmEmptyImports,
        field: HlmFieldImports,
        'hover-card': HlmHoverCardImports,
        input: HlmInputImports,
        'input-group': HlmInputGroupImports,
        'input-otp': HlmInputOtpImports,
        item: HlmItemImports,
        kbd: HlmKbdImports,
        label: HlmLabelImports,
        marker: HlmMarkerImports,
        menubar: HlmMenubarImports,
        message: HlmMessageImports,
        'message-scroller': HlmMessageScrollerImports,
        'native-select': HlmNativeSelectImports,
        'navigation-menu': HlmNavigationMenuImports,
        pagination: HlmPaginationImports,
        popover: HlmPopoverImports,
        progress: HlmProgressImports,
        questionnaire: HlmQuestionnaireImports,
        'radio-group': HlmRadioGroupImports,
        resizable: HlmResizableImports,
        'scroll-area': HlmScrollAreaImports,
        select: HlmSelectImports,
        separator: HlmSeparatorImports,
        sheet: HlmSheetImports,
        sidebar: HlmSidebarImports,
        skeleton: HlmSkeletonImports,
        slider: HlmSliderImports,
        sonner: HlmToasterImports,
        spinner: HlmSpinnerImports,
        switch: HlmSwitchImports,
        table: HlmTableImports,
        tabs: HlmTabsImports,
        textarea: HlmTextareaImports,
        toggle: HlmToggleImports,
        'toggle-group': HlmToggleGroupImports,
        tooltip: HlmTooltipImports,
        trace: HlmTraceImports,
        typography: HlmTypographyImports,
    };

    it.each(Object.entries(barrels))('should export a non-empty imports array for %s', (_name, imports) => {
        expect(Array.isArray(imports)).toBe(true);
        expect(imports.length).toBeGreaterThan(0);
        for (const item of imports) {
            expect(typeof item).toBe('function');
        }
    });
});
