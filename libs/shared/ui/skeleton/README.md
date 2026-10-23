# @gacc-ng/ui/skeleton

Loading state placeholder directive with subtle pulse animation and OKLCH background tokens.

## Features

- Uses `--muted` design token with `motion-safe:animate-pulse`.
- Can be used as attribute directive (`[hlmSkeleton]`) or element (`<hlm-skeleton />`).
- Seamless support for avatar, text, and card skeletons.

## Installation / Import

```typescript
import { HlmSkeleton, HlmSkeletonImports } from '@gacc-ng/ui/skeleton';
```

## Usage

```html
<hlm-skeleton class="h-4 w-48" /> <hlm-skeleton class="size-10 rounded-full" />
```
