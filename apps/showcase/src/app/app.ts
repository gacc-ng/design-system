import { Component, signal } from '@angular/core';

import { HlmBadge } from '@gacc-ng/ui/badge';
import { HlmButton } from '@gacc-ng/ui/button';
import { HlmCardImports } from '@gacc-ng/ui/card';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';
import { HlmSeparatorImports } from '@gacc-ng/ui/separator';
import { HlmSwitchImports } from '@gacc-ng/ui/switch';

@Component({
    imports: [HlmButton, HlmBadge, HlmInput, HlmLabel, HlmCardImports, HlmSeparatorImports, HlmSwitchImports],
    selector: 'gacc-root',
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = 'Design System Showcase';

    protected readonly isDark = signal(false);

    protected readonly switchChecked = signal(true);

    protected toggleDarkMode(): void {
        this.isDark.update((dark) => !dark);
        document.documentElement.classList.toggle('dark', this.isDark());
    }
}
