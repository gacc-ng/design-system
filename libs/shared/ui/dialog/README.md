# @gacc-ng/ui/dialog

Dialog modal component with Maia aesthetic preset, built on `@spartan-ng/brain/dialog`.

## Features

- Headless dialog orchestration via `@spartan-ng/brain/dialog`
- Maia curved styling (`rounded-4xl` surface, refined backdrop blur and overlay)
- Integrated close trigger with `lucideX` icon
- Service-based and template-based dialog opening support

## Usage

```html
<hlm-dialog>
    <button hlmDialogTrigger hlmBtn variant="outline">Open Dialog</button>
    <hlm-dialog-content *hlmDialogPortal="let ctx">
        <hlm-dialog-header>
            <h3 hlmDialogTitle>Dialog Title</h3>
            <p hlmDialogDescription>Informative description goes here.</p>
        </hlm-dialog-header>
        <hlm-dialog-footer>
            <button hlmBtn variant="outline" hlmDialogClose>Cancel</button>
            <button hlmBtn>Save</button>
        </hlm-dialog-footer>
    </hlm-dialog-content>
</hlm-dialog>
```
