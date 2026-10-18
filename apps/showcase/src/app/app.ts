import { Component, signal } from '@angular/core';

import { HlmBadge } from '@gacc-ng/ui/badge';
import { HlmButton } from '@gacc-ng/ui/button';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';

@Component({
    imports: [HlmButton, HlmBadge, HlmInput, HlmLabel],
    selector: 'gacc-root',
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = 'Design System Showcase';

    protected readonly isDark = signal(false);

    protected toggleDarkMode(): void {
        this.isDark.update((dark) => !dark);
        document.documentElement.classList.toggle('dark', this.isDark());
    }
}
