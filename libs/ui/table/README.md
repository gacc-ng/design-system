# @gacc-ng/ui/table

A semantic HTML table component system providing Tailwind CSS styling and responsive overflow wrapping.

## Installation

```bash
pnpm add @gacc-ng/ui
```

## Usage

```typescript
import { Component } from '@angular/core';
import { HlmTableImports } from '@gacc-ng/ui/table';

@Component({
    standalone: true,
    imports: [HlmTableImports],
    template: `
        <div hlmTableContainer>
            <table hlmTable>
                <caption hlmTableCaption>
                    Recent Invoices
                </caption>
                <thead hlmTableHeader>
                    <tr hlmTableRow>
                        <th hlmTableHead>Invoice</th>
                        <th hlmTableHead>Status</th>
                        <th hlmTableHead class="text-right">Amount</th>
                    </tr>
                </thead>
                <tbody hlmTableBody>
                    <tr hlmTableRow>
                        <td hlmTableCell>INV001</td>
                        <td hlmTableCell>Paid</td>
                        <td hlmTableCell class="text-right">$250.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
})
export class TableDemoComponent {}
```
