import { describe, expect, it } from 'vitest';

import { HlmAccordionImports } from '../accordion/src';
import { HlmAlertImports } from '../alert/src';
import { HlmAlertDialogImports } from '../alert-dialog/src';
import { HlmAvatarImports } from '../avatar/src';
import { HlmBadgeImports } from '../badge/src';
import { HlmBreadcrumbImports } from '../breadcrumb/src';
import { HlmButtonImports } from '../button/src';
import { HlmCardImports } from '../card/src';
import { HlmCheckboxImports } from '../checkbox/src';
import { HlmCollapsibleImports } from '../collapsible/src';
import { HlmCommandImports } from '../command/src';
import { HlmDialogImports } from '../dialog/src';
import { HlmDropdownMenuImports } from '../dropdown-menu/src';
import { HlmFieldImports } from '../field/src';
import { HlmInputImports } from '../input/src';
import { HlmInputOtpImports } from '../input-otp/src';
import { HlmKbdImports } from '../kbd/src';
import { HlmLabelImports } from '../label/src';
import { HlmPopoverImports } from '../popover/src';
import { HlmRadioGroupImports } from '../radio-group/src';
import { HlmSelectImports } from '../select/src';
import { HlmSeparatorImports } from '../separator/src';
import { HlmSheetImports } from '../sheet/src';
import { HlmSkeletonImports } from '../skeleton/src';
import { HlmSliderImports } from '../slider/src';
import { HlmSpinnerImports } from '../spinner/src';
import { HlmSwitchImports } from '../switch/src';
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
        avatar: HlmAvatarImports,
        badge: HlmBadgeImports,
        breadcrumb: HlmBreadcrumbImports,
        button: HlmButtonImports,
        card: HlmCardImports,
        checkbox: HlmCheckboxImports,
        collapsible: HlmCollapsibleImports,
        command: HlmCommandImports,
        dialog: HlmDialogImports,
        'dropdown-menu': HlmDropdownMenuImports,
        field: HlmFieldImports,
        input: HlmInputImports,
        'input-otp': HlmInputOtpImports,
        kbd: HlmKbdImports,
        label: HlmLabelImports,
        popover: HlmPopoverImports,
        'radio-group': HlmRadioGroupImports,
        select: HlmSelectImports,
        separator: HlmSeparatorImports,
        sheet: HlmSheetImports,
        skeleton: HlmSkeletonImports,
        slider: HlmSliderImports,
        spinner: HlmSpinnerImports,
        switch: HlmSwitchImports,
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
