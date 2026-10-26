# @gacc-ng/ui/empty

A flexible empty state visual placeholder container styled with Tailwind CSS.

## Installation

```bash
pnpm add @gacc-ng/ui
```

## Usage

```typescript
import { Component } from '@angular/core';
import { HlmEmptyImports } from '@gacc-ng/ui/empty';
import { HlmButton } from '@gacc-ng/ui/button';

@Component({
    standalone: true,
    imports: [HlmEmptyImports, HlmButton],
    template: `
        <hlm-empty>
            <hlm-empty-header>
                <div hlmEmptyTitle>No Projects Found</div>
                <div hlmEmptyDescription>You haven't created any projects yet.</div>
            </hlm-empty-header>
            <hlm-empty-content>
                <button hlmBtn>Create Project</button>
            </hlm-empty-content>
        </hlm-empty>
    `,
})
export class EmptyDemoComponent {}
```
