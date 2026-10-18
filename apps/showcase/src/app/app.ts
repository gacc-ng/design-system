import { Component, signal } from '@angular/core';

import { HlmButton } from '@gacc-ng/ui/button';

@Component({
    imports: [HlmButton],
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
