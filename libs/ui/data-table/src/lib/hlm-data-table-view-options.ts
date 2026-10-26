import { Component, computed } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSettings2 } from '@ng-icons/lucide';
import { injectTableContext } from '@tanstack/angular-table';

import { HlmButtonImports } from '@gacc-ng/ui/button';
import { HlmDropdownMenuImports } from '@gacc-ng/ui/dropdown-menu';

@Component({
    selector: 'hlm-data-table-view-options',
    exportAs: 'hlmDataTableViewOptions',
    imports: [HlmButtonImports, HlmDropdownMenuImports, NgIcon],
    providers: [provideIcons({ lucideSettings2 })],
    template: `
        <button
            hlmBtn
            variant="outline"
            size="sm"
            class="ml-auto hidden h-8 lg:flex"
            align="end"
            [hlmDropdownMenuTrigger]="menu"
        >
            <ng-icon name="lucideSettings2" />
            View
        </button>
        <ng-template #menu>
            <hlm-dropdown-menu class="w-[150px]">
                <hlm-dropdown-menu-label>Toggle columns</hlm-dropdown-menu-label>
                <hlm-dropdown-menu-separator />
                @for (column of hidableColumns(); track column.id) {
                    <button
                        hlmDropdownMenuCheckbox
                        class="capitalize"
                        [checked]="column.getIsVisible()"
                        (triggered)="column.toggleVisibility()"
                    >
                        <hlm-dropdown-menu-checkbox-indicator />
                        {{ column.id }}
                    </button>
                }
            </hlm-dropdown-menu>
        </ng-template>
    `,
})
export class HlmDataTableViewOptions {
    protected readonly table = injectTableContext();

    protected readonly hidableColumns = computed(() =>
        this.table()
            .getAllColumns()
            .filter(
                (column) =>
                    typeof (column as { accessorFn?: unknown }).accessorFn !== 'undefined' && column.getCanHide(),
            ),
    );
}
