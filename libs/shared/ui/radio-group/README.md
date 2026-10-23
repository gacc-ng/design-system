# @gacc-ng/ui/radio-group

Accessible radio group component composed on Spartan Brain `BrnRadioGroup` and `BrnRadio` with custom indicators and OKLCH color token synchronization.

## Features

- Headless accessibility logic via `@spartan-ng/brain/radio-group`.
- WAI-ARIA radio group keyboard navigation (`ArrowUp`, `ArrowDown`, `Space`).
- Standalone components: `HlmRadioGroup`, `HlmRadio`, `HlmRadioIndicator`.
- Clean white in light mode, OLED true black (`#000000`) in dark mode.

## Installation / Import

```typescript
import { HlmRadioGroupImports } from '@gacc-ng/ui/radio-group';
```

## Usage

```html
<hlm-radio-group [(ngModel)]="selectedPlan">
    <div class="flex items-center gap-3">
        <hlm-radio value="monthly" inputId="plan-monthly">
            <hlm-radio-indicator indicator />
        </hlm-radio>
        <label hlmLabel for="plan-monthly">Monthly</label>
    </div>
    <div class="flex items-center gap-3">
        <hlm-radio value="yearly" inputId="plan-yearly">
            <hlm-radio-indicator indicator />
        </hlm-radio>
        <label hlmLabel for="plan-yearly">Yearly</label>
    </div>
</hlm-radio-group>
```
