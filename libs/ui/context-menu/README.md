# Context Menu

A contextual menu overlay triggered by pointer secondary click or long press, powered by `@angular/cdk/menu` and `@gacc-ng/ui/dropdown-menu`.

## Usage

```html
<div
    [hlmContextMenuTrigger]="menu"
    class="flex h-40 w-80 items-center justify-center rounded-md border border-dashed text-sm"
>
    Right click here
</div>

<ng-template #menu>
    <hlm-dropdown-menu class="w-64">
        <hlm-dropdown-menu-group>
            <button hlmDropdownMenuItem>
                Back
                <hlm-dropdown-menu-shortcut>⌘[</hlm-dropdown-menu-shortcut>
            </button>
            <button hlmDropdownMenuItem disabled>
                Forward
                <hlm-dropdown-menu-shortcut>⌘]</hlm-dropdown-menu-shortcut>
            </button>
            <button hlmDropdownMenuItem>
                Reload
                <hlm-dropdown-menu-shortcut>⌘R</hlm-dropdown-menu-shortcut>
            </button>
        </hlm-dropdown-menu-group>
    </hlm-dropdown-menu>
</ng-template>
```
