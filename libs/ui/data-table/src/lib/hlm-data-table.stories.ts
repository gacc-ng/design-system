import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { Meta, StoryObj } from '@storybook/angular-vite';
import {
    columnFilteringFeature,
    columnVisibilityFeature,
    createColumnHelper,
    createFilteredRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    filterFn_includesString,
    FlexRender,
    injectTable,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    sortFn_alphanumeric,
    sortFn_text,
    tableFeatures,
    TanStackTable,
} from '@tanstack/angular-table';

import { HlmButtonImports } from '@gacc-ng/ui/button';
import { HlmCheckboxImports } from '@gacc-ng/ui/checkbox';
import { HlmInputImports } from '@gacc-ng/ui/input';
import { HlmTableImports } from '@gacc-ng/ui/table';

import { HlmDataTableImports } from '../index';

interface Payment {
    id: string;
    invoice: string;
    status: 'Pending' | 'Processing' | 'Success' | 'Failed';
    email: string;
    amount: number;
}

const payments: Payment[] = [
    { id: '1', invoice: 'INV-001', status: 'Success', email: 'alice@example.com', amount: 250.0 },
    { id: '2', invoice: 'INV-002', status: 'Pending', email: 'bob@example.com', amount: 120.5 },
    { id: '3', invoice: 'INV-003', status: 'Success', email: 'charlie@example.com', amount: 450.0 },
    { id: '4', invoice: 'INV-004', status: 'Failed', email: 'david@example.com', amount: 89.99 },
    { id: '5', invoice: 'INV-005', status: 'Processing', email: 'eva@example.com', amount: 650.0 },
    { id: '6', invoice: 'INV-006', status: 'Success', email: 'frank@example.com', amount: 310.2 },
    { id: '7', invoice: 'INV-007', status: 'Pending', email: 'grace@example.com', amount: 175.0 },
    { id: '8', invoice: 'INV-008', status: 'Success', email: 'heidi@example.com', amount: 920.0 },
    { id: '9', invoice: 'INV-009', status: 'Failed', email: 'ivan@example.com', amount: 45.0 },
    { id: '10', invoice: 'INV-010', status: 'Success', email: 'judy@example.com', amount: 530.0 },
    { id: '11', invoice: 'INV-011', status: 'Processing', email: 'mallory@example.com', amount: 215.0 },
    { id: '12', invoice: 'INV-012', status: 'Success', email: 'oscar@example.com', amount: 88.0 },
];

const features = tableFeatures({
    columnFilteringFeature,
    columnVisibilityFeature,
    rowPaginationFeature,
    rowSelectionFeature,
    rowSortingFeature,
    filteredRowModel: createFilteredRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
    sortedRowModel: createSortedRowModel(),
    filterFns: { includesString: filterFn_includesString },
    sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

type PaymentTableFeatures = typeof features;

const columnHelper = createColumnHelper<PaymentTableFeatures, Payment>();

@Component({
    selector: 'hlm-data-table-preview',
    imports: [
        FlexRender,
        FormsModule,
        HlmButtonImports,
        HlmCheckboxImports,
        HlmDataTableImports,
        HlmInputImports,
        HlmTableImports,
        TanStackTable,
    ],
    template: `
        <div class="w-full space-y-4" [tanStackTable]="table">
            <div class="flex items-center justify-between">
                <input
                    hlmInput
                    placeholder="Filter emails..."
                    [ngModel]="table.getColumn('email')?.getFilterValue()"
                    (ngModelChange)="table.getColumn('email')?.setFilterValue($event)"
                    class="max-w-sm"
                />
                <hlm-data-table-view-options />
            </div>

            <div class="border-border rounded-md border">
                <div hlmTableContainer>
                    <table hlmTable>
                        <thead hlmTHead>
                            @for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
                                <tr hlmTr>
                                    @for (header of headerGroup.headers; track header.id) {
                                        <th hlmTh [attr.colSpan]="header.colSpan">
                                            @if (!header.isPlaceholder) {
                                                <ng-container
                                                    *flexRender="
                                                        header.column.columnDef.header;
                                                        props: header.getContext();
                                                        let headerContent
                                                    "
                                                >
                                                    <div [innerHTML]="headerContent"></div>
                                                </ng-container>
                                            }
                                        </th>
                                    }
                                </tr>
                            }
                        </thead>
                        <tbody hlmTBody>
                            @for (row of table.getRowModel().rows; track row.id) {
                                <tr hlmTr [attr.data-state]="row.getIsSelected() && 'selected'">
                                    @for (cell of row.getVisibleCells(); track cell.id) {
                                        <td hlmTd>
                                            <ng-container
                                                *flexRender="
                                                    cell.column.columnDef.cell;
                                                    props: cell.getContext();
                                                    let cellContent
                                                "
                                            >
                                                <div [innerHTML]="cellContent"></div>
                                            </ng-container>
                                        </td>
                                    }
                                </tr>
                            } @empty {
                                <tr hlmTr>
                                    <td hlmTd class="h-24 text-center" [attr.colspan]="columns.length">No results.</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <hlm-data-table-pagination />
        </div>
    `,
})
class DataTablePreviewComponent {
    public readonly data = signal<Payment[]>(payments);

    public readonly columns = columnHelper.columns([
        columnHelper.accessor('invoice', {
            header: 'Invoice',
            cell: (info) => `<span class="font-medium font-mono">${info.getValue()}</span>`,
            enableHiding: false,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => `<span class="capitalize">${info.getValue()}</span>`,
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (info) => `<span>${info.getValue()}</span>`,
        }),
        columnHelper.accessor('amount', {
            header: '<div class="text-right">Amount</div>',
            cell: (info) => `<div class="text-right font-medium">$${info.getValue<number>().toFixed(2)}</div>`,
        }),
    ]);

    public readonly table = injectTable(() => ({
        features,
        data: this.data(),
        columns: this.columns,
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    }));
}

const meta: Meta<DataTablePreviewComponent> = {
    title: 'Layout/Data Table',
    component: DataTablePreviewComponent,
};

export default meta;
type Story = StoryObj<DataTablePreviewComponent>;

export const Default: Story = {};
