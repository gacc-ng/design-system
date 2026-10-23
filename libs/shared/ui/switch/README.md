# @gacc-ng/ui/switch

Switch component and thumb directive built on Spartan Brain (`BrnSwitch`, `BrnSwitchThumb`) and Angular forms (`ControlValueAccessor`).

## Usage

```html
<!-- Standalone Switch -->
<hlm-switch />

<!-- Sized Switch: default | sm -->
<hlm-switch size="sm" />

<!-- Form Binding & Checked State -->
<div class="flex items-center gap-3">
    <hlm-switch id="notifications" [checked]="true" />
    <label hlmLabel for="notifications">Enable Push Notifications</label>
</div>
```
