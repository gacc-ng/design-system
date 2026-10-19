# @gacc-ng/ui/utils

Utility helpers for class merging and overlay provider setup in `@gacc-ng/ui`.

## Usage

### `hlm(...inputs: ClassValue[]): string`

Merges Tailwind utility classes safely using `clsx` and `tailwind-merge` to prevent class conflict issues:

```typescript
import { hlm } from '@gacc-ng/ui/utils';

const className = hlm('px-4 py-2 bg-primary', isActive && 'bg-destructive', customClass);
```

### `provideSpartanHlm(): Provider[]`

Registers overlay providers to ensure Spartan floating elements (dialogs, popovers) render properly with Angular CDK:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideSpartanHlm } from '@gacc-ng/ui/utils';

export const appConfig: ApplicationConfig = {
    providers: [provideSpartanHlm()],
};
```
