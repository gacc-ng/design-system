# @gacc-ng/ui/popover

Popover overlay component with Maia aesthetic preset, built on `@spartan-ng/brain/popover`.

## Features

- Headless positioning and focus management via `@spartan-ng/brain/popover`
- Maia curved styling (`rounded-2xl` card surface, smooth drop-shadow)
- Rich title, description, and custom header directives
- Dynamic trigger directive with keyboard navigation support

## Usage

```html
<div hlmPopover>
    <button hlmPopoverTrigger hlmBtn variant="outline">Open Popover</button>
    <div *hlmPopoverPortal="let ctx" hlmPopoverContent>
        <div hlmPopoverHeader>
            <h4 hlmPopoverTitle>Dimensions</h4>
            <p hlmPopoverDescription>Set the width and height layers.</p>
        </div>
        <div class="grid gap-2">
            <span class="text-xs">Custom popover content</span>
        </div>
    </div>
</div>
```
