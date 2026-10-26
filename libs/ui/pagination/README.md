# @gacc-ng/ui/pagination

Accessible pagination controls and numbered navigation components styled with Tailwind CSS.

## Installation

```bash
pnpm add @gacc-ng/ui
```

## Usage

```typescript
import { Component } from '@angular/core';
import { HlmPaginationImports } from '@gacc-ng/ui/pagination';

@Component({
    standalone: true,
    imports: [HlmPaginationImports],
    template: `
        <nav hlmPagination>
            <ul hlmPaginationContent>
                <li hlmPaginationItem>
                    <hlm-pagination-previous link="/docs" />
                </li>
                <li hlmPaginationItem>
                    <a hlmPaginationLink link="/docs" [isActive]="true">1</a>
                </li>
                <li hlmPaginationItem>
                    <a hlmPaginationLink link="/docs/page-2">2</a>
                </li>
                <li hlmPaginationItem>
                    <hlm-pagination-ellipsis />
                </li>
                <li hlmPaginationItem>
                    <hlm-pagination-next link="/docs/page-2" />
                </li>
            </ul>
        </nav>
    `,
})
export class PaginationDemoComponent {}
```
