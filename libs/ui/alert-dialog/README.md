# @gacc-ng/ui/alert-dialog

Alert Dialog component with Maia aesthetic preset, built on `@spartan-ng/brain/alert-dialog`.

## Features

- Accessible confirmation and destructive action modal dialog
- Maia curved styling (`rounded-4xl` surface, refined typography)
- Action and Cancel directives with integrated `@gacc-ng/ui/button` styling
- Media slot support for icon or visual indicators

## Usage

```html
<hlm-alert-dialog>
    <button hlmAlertDialogTrigger hlmBtn variant="destructive">Delete Account</button>
    <hlm-alert-dialog-content *hlmAlertDialogPortal="let ctx">
        <hlm-alert-dialog-header>
            <h3 hlmAlertDialogTitle>Are you absolutely sure?</h3>
            <p hlmAlertDialogDescription>This action cannot be undone. This will permanently delete your account.</p>
        </hlm-alert-dialog-header>
        <hlm-alert-dialog-footer>
            <button hlmAlertDialogCancel>Cancel</button>
            <button hlmAlertDialogAction variant="destructive">Continue</button>
        </hlm-alert-dialog-footer>
    </hlm-alert-dialog-content>
</hlm-alert-dialog>
```
