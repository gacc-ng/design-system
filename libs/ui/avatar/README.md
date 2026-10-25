# @gacc-ng/ui/avatar

Accessible avatar component with image loading, fallback initials, size variants, notification badge, and avatar grouping.

## Features

- Headless image lifecycle and fallback handling via `@spartan-ng/brain/avatar`.
- Sizes: `default` (32px), `sm` (24px), `lg` (40px).
- Status badge and avatar stack grouping (`hlm-avatar-group`, `hlm-avatar-group-count`).
- Synchronized with dark OLED (`#000000`) and clean white light tokens.

## Installation / Import

```typescript
import { HlmAvatarImports } from '@gacc-ng/ui/avatar';
```

## Usage

```html
<hlm-avatar>
    <img hlmAvatarImage src="/assets/profile.png" alt="User Avatar" />
    <span hlmAvatarFallback>JD</span>
    <hlm-avatar-badge class="bg-emerald-500" />
</hlm-avatar>
```
