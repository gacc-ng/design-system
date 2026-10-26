# @gacc-ng/ui/drawer

Gesture-driven sheet and modal drawer primitives built on top of `@spartan-ng/brain/drawer` and `@spartan-ng/brain/dialog` with Tailwind CSS styling and smooth slide animations. Supports all four viewport directions (`bottom`, `top`, `left`, `right`), touch swipe/drag gestures, backdrop blur, grab notch indicator, and accessible dialog semantics.

## Installation / Import

```typescript
import {
    HlmDrawer,
    HlmDrawerClose,
    HlmDrawerContent,
    HlmDrawerDescription,
    HlmDrawerFooter,
    HlmDrawerHeader,
    HlmDrawerImports,
    HlmDrawerOverlay,
    HlmDrawerPortal,
    HlmDrawerTitle,
    HlmDrawerTrigger,
} from '@gacc-ng/ui/drawer';
```

## Features

- **Directional Support:** Slide in from `bottom` (default bottom sheet), `top`, `left`, or `right`.
- **Gesture Drag Handle:** Grab notch indicator displayed automatically for bottom-oriented sheets.
- **Accessible Dialog Semantics:** Built on `@spartan-ng/brain/dialog` and `@spartan-ng/brain/drawer` adhering to WAI-ARIA dialog specifications.
- **Customizable Overlays:** Configurable backdrop opacity and backdrop blur with smooth transition styles.
- **Compound Components:** Modular composition with header, title, description, footer, close trigger, and portal directives.

## Usage

### Default Bottom Sheet Drawer

```html
<hlm-drawer>
    <button hlmBtn hlmDrawerTrigger variant="outline">Open Drawer</button>
    <hlm-drawer-content *hlmDrawerPortal="let ctx">
        <hlm-drawer-header>
            <h3 hlmDrawerTitle>Drawer Title</h3>
            <p hlmDrawerDescription>Supporting description explaining the drawer action.</p>
        </hlm-drawer-header>
        <div class="p-4 text-sm">Drawer main content body.</div>
        <hlm-drawer-footer>
            <button hlmBtn>Confirm</button>
            <button hlmBtn hlmDrawerClose variant="outline">Cancel</button>
        </hlm-drawer-footer>
    </hlm-drawer-content>
</hlm-drawer>
```

### Directional Slide-in (Top, Left, Right)

Set the direction on `hlmDrawerTrigger` or `hlm-drawer`:

```html
<hlm-drawer direction="right">
    <button hlmBtn hlmDrawerTrigger direction="right" variant="outline">Open Right Drawer</button>
    <hlm-drawer-content *hlmDrawerPortal="let ctx">
        <hlm-drawer-header>
            <h3 hlmDrawerTitle>Settings</h3>
            <p hlmDrawerDescription>Manage preferences and notifications.</p>
        </hlm-drawer-header>
        <div class="p-4 text-sm">Settings panel options.</div>
        <hlm-drawer-footer>
            <button hlmBtn hlmDrawerClose variant="outline">Close</button>
        </hlm-drawer-footer>
    </hlm-drawer-content>
</hlm-drawer>
```

### Form Inputs within Drawer

```html
<hlm-drawer>
    <button hlmBtn hlmDrawerTrigger variant="outline">Edit Profile</button>
    <hlm-drawer-content *hlmDrawerPortal="let ctx">
        <hlm-drawer-header>
            <h3 hlmDrawerTitle>Edit Profile</h3>
            <p hlmDrawerDescription>Make changes to your profile details here.</p>
        </hlm-drawer-header>
        <div class="space-y-4 px-4 py-2">
            <div class="space-y-1.5">
                <label hlmLabel for="name">Name</label>
                <input hlmInput id="name" value="Jane Doe" />
            </div>
            <div class="space-y-1.5">
                <label hlmLabel for="username">Username</label>
                <input hlmInput id="username" value="@janedoe" />
            </div>
        </div>
        <hlm-drawer-footer>
            <button hlmBtn>Save Changes</button>
            <button hlmBtn hlmDrawerClose variant="outline">Cancel</button>
        </hlm-drawer-footer>
    </hlm-drawer-content>
</hlm-drawer>
```

## API Reference

### `HlmDrawer`

- **Selector:** `hlm-drawer`
- **Export As:** `hlmDrawer`
- **Extends:** `BrnDrawer`
- **Inputs:**
    - `direction: 'bottom' | 'top' | 'left' | 'right'` (default: `'bottom'`)

### `HlmDrawerTrigger`

- **Selector:** `button[hlmDrawerTrigger]`
- **Export As:** `hlmDrawerTrigger`
- **Host Directives:** `BrnDrawerTrigger`
- **Inputs:**
    - `direction?: 'bottom' | 'top' | 'left' | 'right'`
    - `id?: string`
    - `type?: string`
- **Host Attributes:** `data-slot="drawer-trigger"`

### `HlmDrawerPortal`

- **Selector:** `[hlmDrawerPortal]`
- **Export As:** `hlmDrawerPortal`
- **Host Directives:** `BrnDrawerContent`

### `HlmDrawerContent`

- **Selector:** `hlm-drawer-content`
- **Export As:** `hlmDrawerContent`
- **Host Directives:** `BrnDrawerHandle`
- **Inputs:**
    - `closeThreshold?: number`
- **Host Attributes:** `data-slot="drawer-content"`, `[attr.data-vaul-drawer-direction]`, `[attr.data-state]`

### `HlmDrawerHeader`

- **Selector:** `[hlmDrawerHeader],hlm-drawer-header`
- **Export As:** `hlmDrawerHeader`
- **Host Attributes:** `data-slot="drawer-header"`

### `HlmDrawerTitle`

- **Selector:** `[hlmDrawerTitle]`
- **Export As:** `hlmDrawerTitle`
- **Host Directives:** `BrnDrawerTitle`
- **Host Attributes:** `data-slot="drawer-title"`

### `HlmDrawerDescription`

- **Selector:** `[hlmDrawerDescription]`
- **Export As:** `hlmDrawerDescription`
- **Host Directives:** `BrnDrawerDescription`
- **Host Attributes:** `data-slot="drawer-description"`

### `HlmDrawerFooter`

- **Selector:** `[hlmDrawerFooter],hlm-drawer-footer`
- **Export As:** `hlmDrawerFooter`
- **Host Attributes:** `data-slot="drawer-footer"`

### `HlmDrawerClose`

- **Selector:** `button[hlmDrawerClose]`
- **Export As:** `hlmDrawerClose`
- **Host Directives:** `BrnDrawerClose`
- **Host Attributes:** `data-slot="drawer-close"`

### `HlmDrawerOverlay`

- **Selector:** `[hlmDrawerOverlay],hlm-drawer-overlay`
- **Export As:** `hlmDrawerOverlay`
- **Host Directives:** `BrnDrawerOverlay`
- **Inputs:**
    - `class?: ClassValue`
