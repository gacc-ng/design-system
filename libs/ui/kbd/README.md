# @gacc-ng/ui/kbd

Keyboard shortcut representation directives with semantic typography and theme token synchronization.

## Features

- Semantic `<kbd>` elements for keyboard accelerators and keys.
- Standalone directives: `HlmKbd` and `HlmKbdGroup`.
- Synchronized with `--muted` and `--muted-foreground` tokens.

## Installation / Import

```typescript
import { HlmKbdImports } from '@gacc-ng/ui/kbd';
```

## Usage

```html
<kbd hlmKbdGroup>
    <kbd hlmKbd>⌘</kbd>
    <kbd hlmKbd>K</kbd>
</kbd>
```
