# @gacc-ng/ui/resizable

Accessible resizable panel layout splitter primitives built on top of `@spartan-ng/brain/resizable` and styled with Tailwind CSS. Supports horizontal and vertical orientations, minimum and maximum constraints, collapsible panels, and customizable resize handles with keyboard navigation.

## Installation / Import

```typescript
import { HlmResizableGroup, HlmResizableHandle, HlmResizableImports, HlmResizablePanel } from '@gacc-ng/ui/resizable';
```

## Usage

### Horizontal Two-Panel Layout

```html
<hlm-resizable-group class="min-h-[200px] max-w-md rounded-lg border">
    <hlm-resizable-panel [defaultSize]="50">
        <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Panel One</span>
        </div>
    </hlm-resizable-panel>
    <hlm-resizable-handle />
    <hlm-resizable-panel [defaultSize]="50">
        <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Panel Two</span>
        </div>
    </hlm-resizable-panel>
</hlm-resizable-group>
```

### Vertical Split Layout

```html
<hlm-resizable-group direction="vertical" class="min-h-[200px] max-w-sm rounded-lg border">
    <hlm-resizable-panel [defaultSize]="25">
        <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Header</span>
        </div>
    </hlm-resizable-panel>
    <hlm-resizable-handle />
    <hlm-resizable-panel [defaultSize]="75">
        <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Content</span>
        </div>
    </hlm-resizable-panel>
</hlm-resizable-group>
```

### With Draggable Handle Notch

```html
<hlm-resizable-group class="min-h-[200px] max-w-md rounded-lg border">
    <hlm-resizable-panel [defaultSize]="30">
        <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Sidebar</span>
        </div>
    </hlm-resizable-panel>
    <hlm-resizable-handle withHandle />
    <hlm-resizable-panel [defaultSize]="70">
        <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Main Content</span>
        </div>
    </hlm-resizable-panel>
</hlm-resizable-group>
```

### Nested Resizable Layout

```html
<hlm-resizable-group class="min-h-[250px] max-w-lg rounded-lg border">
    <hlm-resizable-panel [defaultSize]="40">
        <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Sidebar</span>
        </div>
    </hlm-resizable-panel>
    <hlm-resizable-handle withHandle />
    <hlm-resizable-panel [defaultSize]="60">
        <hlm-resizable-group direction="vertical">
            <hlm-resizable-panel [defaultSize]="35">
                <div class="flex h-full items-center justify-center p-6">
                    <span class="font-semibold">Top Panel</span>
                </div>
            </hlm-resizable-panel>
            <hlm-resizable-handle withHandle />
            <hlm-resizable-panel [defaultSize]="65">
                <div class="flex h-full items-center justify-center p-6">
                    <span class="font-semibold">Bottom Panel</span>
                </div>
            </hlm-resizable-panel>
        </hlm-resizable-group>
    </hlm-resizable-panel>
</hlm-resizable-group>
```

## API Reference

### `HlmResizableGroup`

- **Selector:** `[hlmResizableGroup],hlm-resizable-group`
- **Export As:** `hlmResizableGroup`
- **Inputs:**
    - `direction: 'horizontal' | 'vertical'` (default: `'horizontal'`)
    - `layout: number[]`
- **Outputs:**
    - `dragStart: void`
    - `dragEnd: void`
    - `layoutChange: number[]`

### `HlmResizablePanel`

- **Selector:** `[hlmResizablePanel],hlm-resizable-panel`
- **Export As:** `hlmResizablePanel`
- **Inputs:**
    - `defaultSize: number`
    - `minSize: number`
    - `maxSize: number`
    - `collapsible: boolean`
    - `id: string`
- **Methods:**
    - `setSize(size: number): void`

### `HlmResizableHandle`

- **Selector:** `hlm-resizable-handle`
- **Export As:** `hlmResizableHandle`
- **Inputs:**
    - `withHandle: boolean`
    - `disabled: boolean`
