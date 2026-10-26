import { Component, computed } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight, lucideChevronsLeft, lucideChevronsRight } from '@ng-icons/lucide';
import { injectTableContext } from '@tanstack/angular-table';

import { HlmButtonImports } from '@gacc-ng/ui/button';
import { HlmSelectImports } from '@gacc-ng/ui/select';

@Component({
    selector: 'hlm-data-table-pagination',
    exportAs: 'hlmDataTablePagination',
    imports: [HlmButtonImports, HlmSelectImports, NgIcon],
    providers: [
        provideIcons({
            lucideChevronLeft,
            lucideChevronRight,
            lucideChevronsLeft,
            lucideChevronsRight,
        }),
    ],
    template: `
        <div class="flex items-center justify-between px-2">
            <div class="text-muted-foreground flex-1 text-sm">
                {{ selectedRowsCount() }} of {{ totalRowsCount() }} row(s) selected.
            </div>
            <div class="flex items-center space-x-6 lg:space-x-8">
                <div class="flex items-center space-x-2">
                    <p class="text-sm font-medium">Rows per page</p>
                    <hlm-select [value]="pagination().pageSize" (valueChange)="setPageSize($event)">
                        <hlm-select-trigger class="h-8 w-[70px]">
                            <hlm-select-value />
                        </hlm-select-trigger>
                        <hlm-select-content *hlmSelectPortal>
                            @for (pageSize of pageSizes; track pageSize) {
                                <hlm-select-item [value]="pageSize">{{ pageSize }}</hlm-select-item>
                            }
                        </hlm-select-content>
                    </hlm-select>
                </div>
                <div class="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {{ pagination().pageIndex + 1 }} of {{ table().getPageCount() }}
                </div>
                <div class="flex items-center space-x-2">
                    <button
                        hlmBtn
                        variant="outline"
                        size="icon"
                        class="hidden size-8 lg:flex"
                        [disabled]="!table().getCanPreviousPage()"
                        (click)="table().setPageIndex(0)"
                    >
                        <span class="sr-only">Go to first page</span>
                        <ng-icon name="lucideChevronsLeft" />
                    </button>
                    <button
                        hlmBtn
                        variant="outline"
                        size="icon"
                        class="size-8"
                        [disabled]="!table().getCanPreviousPage()"
                        (click)="table().previousPage()"
                    >
                        <span class="sr-only">Go to previous page</span>
                        <ng-icon name="lucideChevronLeft" />
                    </button>
                    <button
                        hlmBtn
                        variant="outline"
                        size="icon"
                        class="size-8"
                        [disabled]="!table().getCanNextPage()"
                        (click)="table().nextPage()"
                    >
                        <span class="sr-only">Go to next page</span>
                        <ng-icon name="lucideChevronRight" />
                    </button>
                    <button
                        hlmBtn
                        variant="outline"
                        size="icon"
                        class="hidden size-8 lg:flex"
                        [disabled]="!table().getCanNextPage()"
                        (click)="table().setPageIndex(table().getPageCount() - 1)"
                    >
                        <span class="sr-only">Go to last page</span>
                        <ng-icon name="lucideChevronsRight" />
                    </button>
                </div>
            </div>
        </div>
    `,
})
export class HlmDataTablePagination {
    protected readonly table = injectTableContext();
    protected readonly pageSizes = [10, 20, 25, 30, 40, 50];

    protected readonly selectedRowsCount = computed(() => {
        const t = this.table();
        const tableAny = t as {
            getFilteredSelectedRowModel?: () => { rows: unknown[] };
            getSelectedRowModel?: () => { rows: unknown[] };
        };
        if (typeof tableAny.getFilteredSelectedRowModel === 'function') {
            return tableAny.getFilteredSelectedRowModel().rows.length;
        }
        if (typeof tableAny.getSelectedRowModel === 'function') {
            return tableAny.getSelectedRowModel().rows.length;
        }
        return 0;
    });

    protected readonly totalRowsCount = computed(() => {
        const t = this.table();
        const tableAny = t as {
            getFilteredRowModel?: () => { rows: unknown[] };
            getRowCount?: () => number;
        };
        if (typeof tableAny.getFilteredRowModel === 'function') {
            return tableAny.getFilteredRowModel().rows.length;
        }
        if (typeof tableAny.getRowCount === 'function') {
            return tableAny.getRowCount();
        }
        return 0;
    });

    protected readonly pagination = computed(() => this.table().atoms.pagination.get());

    protected setPageSize(value: unknown) {
        this.table().setPageSize(Number(value));
    }
}
