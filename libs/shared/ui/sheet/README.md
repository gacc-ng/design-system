# @gacc-ng/ui/sheet

Sheet side drawer overlay component with Maia aesthetic preset, built on `@spartan-ng/brain/sheet`.

## Features

- Drawer overlay supporting all 4 viewport sides (`left`, `right`, `top`, `bottom`)
- Maia transition easing and backdrop blur support
- Built-in close button with `lucideX` icon
- Accessible headers, footers, titles, and descriptions

## Usage

```html
<hlm-sheet>
    <button hlmSheetTrigger hlmBtn variant="outline">Open Drawer</button>
    <hlm-sheet-content *hlmSheetPortal="let ctx" side="right">
        <hlm-sheet-header>
            <h3 hlmSheetTitle>Edit Profile</h3>
            <p hlmSheetDescription>Update your personal details here.</p>
        </hlm-sheet-header>
        <div class="p-6">
            <span class="text-xs">Sheet content details</span>
        </div>
        <hlm-sheet-footer>
            <button hlmBtn variant="outline" hlmSheetClose>Close</button>
        </hlm-sheet-footer>
    </hlm-sheet-content>
</hlm-sheet>
```
