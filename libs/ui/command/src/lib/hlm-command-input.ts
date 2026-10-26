import { Component, input } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { BrnCommandInput } from '@spartan-ng/brain/command';

import { classes } from '@gacc-ng/ui/utils';

@Component({
    selector: 'hlm-command-input',
    exportAs: 'hlmCommandInput',
    imports: [NgIcon, BrnCommandInput],
    providers: [provideIcons({ lucideSearch })],
    host: {
        'data-slot': 'command-input-wrapper',
    },
    template: `
        <div class="bg-input/30 border-input/30 flex h-9 w-full items-center gap-2 rounded-lg border px-3 shadow-none">
            <ng-icon name="lucideSearch" class="size-4 shrink-0 opacity-50" />
            <input
                brnCommandInput
                data-slot="command-input"
                class="placeholder:text-muted-foreground w-full bg-transparent text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                [id]="inputId()"
                [placeholder]="placeholder()"
            />
        </div>
    `,
})
export class HlmCommandInput {
    public readonly inputId = input<string | undefined>();
    public readonly placeholder = input<string>('');

    constructor() {
        classes(() => 'p-1 pb-0');
    }
}
