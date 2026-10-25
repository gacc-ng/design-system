# @gacc-ng/ui/checkbox

Accessible, signal-based checkbox component implementing WAI-ARIA checkbox guidelines, Spartan Brain headless logic, and OKLCH design tokens.

## Features

- Headless foundation via `@spartan-ng/brain/checkbox`.
- Standard Angular `ControlValueAccessor` integration (`[(ngModel)]`, `formControlName`, reactive forms).
- Tri-state support: `checked`, `unchecked`, and `indeterminate`.
- Fully synchronized with design tokens for dark OLED (`#000000`) and light (`white`) modes.

## Installation / Import

```typescript
import { HlmCheckbox, HlmCheckboxImports } from '@gacc-ng/ui/checkbox';
```

## Usage

```html
<hlm-checkbox inputId="terms" [checked]="accepted" (checkedChange)="accepted = $event" />
<label hlmLabel for="terms">Accept terms and conditions</label>
```
