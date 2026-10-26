import { Component, input } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowDown, lucideArrowUp, lucideChevronsUpDown, lucideEyeOff } from '@ng-icons/lucide';
import type { Column } from '@tanstack/angular-table';

import { HlmButtonImports } from '@gacc-ng/ui/button';
import { HlmDropdownMenuImports } from '@gacc-ng/ui/dropdown-menu';

@Component({
    selector: 'hlm-data-table-column-header',
    exportAs: 'hlmDataTableColumnHeader',
    imports: [HlmButtonImports, HlmDropdownMenuImports, NgIcon],
    providers: [provideIcons({ lucideArrowDown, lucideArrowUp, lucideChevronsUpDown, lucideEyeOff })],
    template: `
        @if (column().getCanSort()) {
            <div class="flex items-center gap-2">
                <button
                    hlmBtn
                    variant="ghost"
                    size="sm"
                    class="data-[state=open]:bg-accent -ml-3 h-8"
                    align="start"
                    [hlmDropdownMenuTrigger]="menu"
                >
                    <span>{{ title() }}</span>
                    @switch (column().getIsSorted()) {
                        @case ('desc') {
                            <ng-icon name="lucideArrowDown" />
                        }
                        @case ('asc') {
                            <ng-icon name="lucideArrowUp" />
                        }
                        @default {
                            <ng-icon name="lucideChevronsUpDown" />
                        }
                    }
                </button>
                <ng-template #menu>
                    <hlm-dropdown-menu>
                        <button hlmDropdownMenuItem (click)="column().toggleSorting(false)">
                            <ng-icon name="lucideArrowUp" />
                            Asc
                        </button>
                        <button hlmDropdownMenuItem (click)="column().toggleSorting(true)">
                            <ng-icon name="lucideArrowDown" />
                            Desc
                        </button>
                        <hlm-dropdown-menu-separator />
                        <button hlmDropdownMenuItem (click)="column().toggleVisibility(false)">
                            <ng-icon name="lucideEyeOff" />
                            Hide
                        </button>
                    </hlm-dropdown-menu>
                </ng-template>
            </div>
        } @else {
            <div>{{ title() }}</div>
        }
    `,
})
export class HlmDataTableColumnHeader {
    public readonly column = input.required<Column<any, any>>();
    public readonly title = input.required<string>();
}
