# @gacc-ng/ui/spinner

Circular loading spinner component with accessible ARIA status role and motion-safe spin animation.

## Features

- WAI-ARIA `role="status"` and configurable `aria-label`.
- Default icon: `lucideLoader2` via `@ng-icons/lucide`.
- Respects `motion-safe:animate-spin`.
- Synchronized with theme color tokens.

## Installation / Import

```typescript
import { HlmSpinner, HlmSpinnerImports } from '@gacc-ng/ui/spinner';
```

## Usage

```html
<hlm-spinner /> <button hlmBtn disabled><hlm-spinner class="mr-2" /> Loading...</button>
```
