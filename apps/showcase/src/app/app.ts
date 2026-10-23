import { Component, signal } from '@angular/core';

import { HlmAlertImports } from '@gacc-ng/ui/alert';
import { HlmAlertDialogImports } from '@gacc-ng/ui/alert-dialog';
import { HlmAvatarImports } from '@gacc-ng/ui/avatar';
import { HlmBadge } from '@gacc-ng/ui/badge';
import { HlmButton } from '@gacc-ng/ui/button';
import { HlmCardImports } from '@gacc-ng/ui/card';
import { HlmCheckboxImports } from '@gacc-ng/ui/checkbox';
import { HlmDialogImports } from '@gacc-ng/ui/dialog';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmKbdImports } from '@gacc-ng/ui/kbd';
import { HlmLabel } from '@gacc-ng/ui/label';
import { HlmPopoverImports } from '@gacc-ng/ui/popover';
import { HlmRadioGroupImports } from '@gacc-ng/ui/radio-group';
import { HlmSeparatorImports } from '@gacc-ng/ui/separator';
import { HlmSheetImports } from '@gacc-ng/ui/sheet';
import { HlmSkeletonImports } from '@gacc-ng/ui/skeleton';
import { HlmSpinnerImports } from '@gacc-ng/ui/spinner';
import { HlmSwitchImports } from '@gacc-ng/ui/switch';
import { HlmTextareaImports } from '@gacc-ng/ui/textarea';
import { HlmToggleImports } from '@gacc-ng/ui/toggle';
import { HlmToggleGroupImports } from '@gacc-ng/ui/toggle-group';
import { HlmTooltipImports } from '@gacc-ng/ui/tooltip';

@Component({
    imports: [
        HlmButton,
        HlmBadge,
        HlmInput,
        HlmLabel,
        HlmCardImports,
        HlmSeparatorImports,
        HlmSwitchImports,
        HlmCheckboxImports,
        HlmRadioGroupImports,
        HlmTextareaImports,
        HlmAvatarImports,
        HlmSkeletonImports,
        HlmSpinnerImports,
        HlmKbdImports,
        HlmAlertImports,
        HlmTooltipImports,
        HlmToggleImports,
        HlmToggleGroupImports,
        HlmDialogImports,
        HlmAlertDialogImports,
        HlmPopoverImports,
        HlmSheetImports,
    ],
    selector: 'gacc-root',
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = 'Design System Showcase';

    protected readonly isDark = signal(false);

    protected readonly switchChecked = signal(true);

    protected readonly checkboxChecked = signal(true);

    protected readonly radioPlan = signal('pro');

    protected toggleDarkMode(): void {
        this.isDark.update((dark) => !dark);
        document.documentElement.classList.toggle('dark', this.isDark());
    }
}
