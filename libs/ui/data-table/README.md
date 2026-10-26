# @gacc-ng/ui/data-table

Composable data table helper components and view options integrated with `@tanstack/angular-table` and `@gacc-ng/ui/table`.

## Features

- **Column Header (`HlmDataTableColumnHeader`)**: Sortable and hideable column headers with interactive sort direction indicators and dropdown menu actions.
- **Pagination (`HlmDataTablePagination`)**: Comprehensive table pagination controls including rows per page selector, row selection summary, and direct page navigation buttons.
- **View Options (`HlmDataTableViewOptions`)**: Column visibility toggles allowing users to dynamically hide and show columns.

## Installation

```bash
pnpm add @tanstack/angular-table
```

## Basic Usage

```html
<div [tanStackTable]="table">
    <div class="flex items-center py-4">
        <hlm-data-table-view-options />
    </div>

    <table hlmTable>
        <!-- semantic table elements -->
    </table>

    <hlm-data-table-pagination class="py-4" />
</div>
```
