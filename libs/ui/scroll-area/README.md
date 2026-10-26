# @gacc-ng/ui/scroll-area

Custom scrollable area primitive augmenting `ngx-scrollbar` with Spartan Helm styling and design system tokens.

## Installation / Import

```typescript
import { HlmScrollArea, HlmScrollAreaImports } from '@gacc-ng/ui/scroll-area';
import { NgScrollbar } from 'ngx-scrollbar';
```

## Usage

### Vertical Scroll Area

```html
<ng-scrollbar hlm class="h-72 w-48 rounded-md border">
    <div class="p-4" scrollViewport>
        <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
        <div class="space-y-2 text-sm">
            <div>v1.2.0-beta.50</div>
            <div class="h-px bg-border"></div>
            <div>v1.2.0-beta.49</div>
            <div class="h-px bg-border"></div>
            <div>v1.2.0-beta.48</div>
        </div>
    </div>
</ng-scrollbar>
```

### Horizontal Scroll Area

```html
<ng-scrollbar hlm class="w-96 rounded-md border whitespace-nowrap">
    <div class="flex w-max space-x-4 p-4" scrollViewport>
        <div class="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
            Item 1
        </div>
        <div class="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
            Item 2
        </div>
        <div class="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
            Item 3
        </div>
    </div>
</ng-scrollbar>
```

### Bordered Scrollable Container

```html
<div class="w-80 rounded-xl border bg-card p-4 shadow-sm">
    <div class="mb-3">
        <h3 class="text-base font-semibold">Activity</h3>
    </div>
    <ng-scrollbar hlm class="h-48 rounded-md bg-muted/40 p-2">
        <div class="space-y-3 p-2 text-xs" scrollViewport>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
        </div>
    </ng-scrollbar>
</div>
```

## Styling & Custom Properties

`HlmScrollArea` applies the following default CSS variables and classes to the host `ng-scrollbar`:

- `--scrollbar-thumb-color`: `var(--border)`
- `--scrollbar-thumb-hover-color`: `var(--border)`
- `--scrollbar-track-color`: `transparent`
- `--scrollbar-track-thickness`: `0.625rem`
- `--scrollbar-track-offset`: `1.5px`
- Default classes: `rounded-md [--scrollbar-thumb-shape:9999px] block`
