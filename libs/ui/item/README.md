# @gacc-ng/ui/item

A flexible list/record item container directive and component system styled with Tailwind CSS.

## Installation

```bash
pnpm add @gacc-ng/ui
```

## Usage

```typescript
import { Component } from '@angular/core';
import { HlmItemImports } from '@gacc-ng/ui/item';
import { HlmButton } from '@gacc-ng/ui/button';

@Component({
    standalone: true,
    imports: [HlmItemImports, HlmButton],
    template: `
        <hlm-item variant="outline">
            <hlm-item-content>
                <hlm-item-title>Item Title</hlm-item-title>
                <p hlmItemDescription>Item description text.</p>
            </hlm-item-content>
            <hlm-item-actions>
                <button hlmBtn variant="outline" size="sm">Action</button>
            </hlm-item-actions>
        </hlm-item>
    `,
})
export class ItemDemoComponent {}
```
