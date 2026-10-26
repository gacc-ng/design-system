# @gacc-ng/ui/progress

An accessible progress bar indicator built using Spartan NG Brain (`@spartan-ng/brain/progress`) and styled with Tailwind CSS.

## Installation

```bash
pnpm add @gacc-ng/ui
```

## Usage

```typescript
import { Component } from '@angular/core';
import { HlmProgressImports } from '@gacc-ng/ui/progress';

@Component({
    standalone: true,
    imports: [HlmProgressImports],
    template: `
        <hlm-progress [value]="value">
            <hlm-progress-indicator />
        </hlm-progress>
    `,
})
export class ProgressDemoComponent {
    value = 60;
}
```
