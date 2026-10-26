# Menubar

A desktop-grade horizontal menu bar with submenus and keyboard navigation, powered by `@angular/cdk/menu` and `@gacc-ng/ui/dropdown-menu`.

## Usage

```html
<div hlmMenubar>
    <button [hlmMenubarTrigger]="fileMenu" hlmMenubarTrigger>File</button>
    <button [hlmMenubarTrigger]="editMenu" hlmMenubarTrigger>Edit</button>
</div>

<ng-template #fileMenu>
    <hlm-dropdown-menu class="w-48">
        <hlm-dropdown-menu-group>
            <button hlmDropdownMenuItem>New Tab</button>
            <button hlmDropdownMenuItem>New Window</button>
        </hlm-dropdown-menu-group>
    </hlm-dropdown-menu>
</ng-template>

<ng-template #editMenu>
    <hlm-dropdown-menu class="w-48">
        <hlm-dropdown-menu-group>
            <button hlmDropdownMenuItem>Undo</button>
            <button hlmDropdownMenuItem>Redo</button>
        </hlm-dropdown-menu-group>
    </hlm-dropdown-menu>
</ng-template>
```
