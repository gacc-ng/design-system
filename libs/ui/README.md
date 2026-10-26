# @gacc-ng/ui

Accessible, composable, signal-based Angular UI primitive directives built on top of [Spartan](https://spartan.ng) (Brain headless logic + Helm visual layer), Tailwind CSS v4, and Angular CDK.

Designed strictly for modern Angular (v22+), supporting **Zoneless change detection** (with **OnPush by default**), and **Signals** (`input()`, `computed()`, `output()`).

---

## Architecture

- **Brain Layer (`@spartan-ng/brain/*`)**: Headless behavioral and accessibility primitives (CDK, WAI-ARIA states, focus management).
- **Helm Layer (`@gacc-ng/ui/*`)**: Presentational directives applying Tailwind CSS v4 design tokens and `class-variance-authority` (`cva()`).
- **Secondary Entry Points**: Each primitive is packaged independently under `@gacc-ng/ui/<primitive>` for fine-grained tree-shaking and isolated imports.

---

## Installation & Setup

### 1. Peer Dependencies

```bash
pnpm add @angular/cdk @angular/forms @spartan-ng/brain class-variance-authority clsx tailwind-merge tailwindcss tw-animate-css
```

### 2. Design System Preset

Import the unified preset in your application's global stylesheet (e.g., `src/styles.css`):

```css
@import 'tailwindcss';
@import '@gacc-ng/ui/preset.css';
```

> [!TIP]
> The preset automatically includes self-contained `@source` detection for Tailwind CSS v4, so consumers do not need to configure any manual `@source` paths in their application stylesheets.

### 3. Overlay Provider

Register `provideGaccUi()` in your application config (`app.config.ts`):

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideGaccUi } from '@gacc-ng/ui/utils';

export const appConfig: ApplicationConfig = {
    providers: [provideGaccUi()],
};
```

---

## Secondary Entry Points

Each primitive is documented within its own secondary entry point:

| Entry Point                 | Primary Exports                                                                                                      | Documentation                                        |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| `@gacc-ng/ui/aspect-ratio`  | `HlmAspectRatio`, `HlmAspectRatioImports`                                                                            | [aspect-ratio/README.md](./aspect-ratio/README.md)   |
| `@gacc-ng/ui/autocomplete`  | `HlmAutocomplete`, `HlmAutocompleteSearch`, `HlmAutocompleteContent`, `HlmAutocompleteImports`                       | [autocomplete/README.md](./autocomplete/README.md)   |
| `@gacc-ng/ui/avatar`        | `HlmAvatar`, `HlmAvatarImage`, `HlmAvatarFallback`, `HlmAvatarBadge`, `HlmAvatarGroup`                               | [avatar/README.md](./avatar/README.md)               |
| `@gacc-ng/ui/badge`         | `HlmBadge`, `badgeVariants`                                                                                          | [badge/README.md](./badge/README.md)                 |
| `@gacc-ng/ui/button`        | `HlmButton`, `HlmButtonImports`, `buttonVariants`                                                                    | [button/README.md](./button/README.md)               |
| `@gacc-ng/ui/button-group`  | `HlmButtonGroup`, `HlmButtonGroupImports`                                                                            | [button-group/README.md](./button-group/README.md)   |
| `@gacc-ng/ui/calendar`      | `HlmCalendar`, `HlmCalendarMulti`, `HlmCalendarRange`, `HlmMonthYearCalendar`, `HlmCalendarImports`                  | [calendar/README.md](./calendar/README.md)           |
| `@gacc-ng/ui/card`          | `HlmCard`, `HlmCardHeader`, `HlmCardTitle`, `HlmCardDescription`, `HlmCardContent`, `HlmCardFooter`, `HlmCardAction` | [card/README.md](./card/README.md)                   |
| `@gacc-ng/ui/checkbox`      | `HlmCheckbox`, `HlmCheckboxImports`                                                                                  | [checkbox/README.md](./checkbox/README.md)           |
| `@gacc-ng/ui/combobox`      | `HlmCombobox`, `HlmComboboxTrigger`, `HlmComboboxContent`, `HlmComboboxInput`, `HlmComboboxImports`                  | [combobox/README.md](./combobox/README.md)           |
| `@gacc-ng/ui/date-picker`   | `HlmDatePicker`, `HlmDatePickerTrigger`, `HlmDatePickerInput`, `HlmDateRangePicker`, `HlmDatePickerImports`          | [date-picker/README.md](./date-picker/README.md)     |
| `@gacc-ng/ui/drawer`        | `HlmDrawer`, `HlmDrawerContent`, `HlmDrawerTrigger`, `HlmDrawerImports`                                              | [drawer/README.md](./drawer/README.md)               |
| `@gacc-ng/ui/input`         | `HlmInput`                                                                                                           | [input/README.md](./input/README.md)                 |
| `@gacc-ng/ui/input-group`   | `HlmInputGroup`, `HlmInputGroupInput`, `HlmInputGroupButton`, `HlmInputGroupAddon`, `HlmInputGroupImports`           | [input-group/README.md](./input-group/README.md)     |
| `@gacc-ng/ui/kbd`           | `HlmKbd`, `HlmKbdGroup`, `HlmKbdImports`                                                                             | [kbd/README.md](./kbd/README.md)                     |
| `@gacc-ng/ui/label`         | `HlmLabel`                                                                                                           | [label/README.md](./label/README.md)                 |
| `@gacc-ng/ui/native-select` | `HlmNativeSelect`, `HlmNativeSelectOption`, `HlmNativeSelectOptgroup`, `HlmNativeSelectImports`                      | [native-select/README.md](./native-select/README.md) |
| `@gacc-ng/ui/radio-group`   | `HlmRadioGroup`, `HlmRadio`, `HlmRadioIndicator`, `HlmRadioGroupImports`                                             | [radio-group/README.md](./radio-group/README.md)     |
| `@gacc-ng/ui/resizable`     | `HlmResizableGroup`, `HlmResizablePanel`, `HlmResizableHandle`, `HlmResizableImports`                                | [resizable/README.md](./resizable/README.md)         |
| `@gacc-ng/ui/scroll-area`   | `HlmScrollArea`, `HlmScrollAreaImports`                                                                              | [scroll-area/README.md](./scroll-area/README.md)     |
| `@gacc-ng/ui/separator`     | `HlmSeparator`, `HlmSeparatorImports`                                                                                | [separator/README.md](./separator/README.md)         |
| `@gacc-ng/ui/sidebar`       | `HlmSidebar`, `HlmSidebarTrigger`, `HlmSidebarContent`, `HlmSidebarService`, `HlmSidebarImports`                     | [sidebar/README.md](./sidebar/README.md)             |
| `@gacc-ng/ui/skeleton`      | `HlmSkeleton`, `HlmSkeletonImports`                                                                                  | [skeleton/README.md](./skeleton/README.md)           |
| `@gacc-ng/ui/spinner`       | `HlmSpinner`, `HlmSpinnerImports`                                                                                    | [spinner/README.md](./spinner/README.md)             |
| `@gacc-ng/ui/switch`        | `HlmSwitch`, `HlmSwitchThumb`, `HlmSwitchImports`                                                                    | [switch/README.md](./switch/README.md)               |
| `@gacc-ng/ui/textarea`      | `HlmTextarea`, `HlmTextareaImports`                                                                                  | [textarea/README.md](./textarea/README.md)           |
| `@gacc-ng/ui/utils`         | `hlm()`, `classes()`, `provideGaccUi()`                                                                              | [utils/README.md](./utils/README.md)                 |

### Layout & Panel Surfaces

Layout and panel surface primitives provide structural scaffolding, viewport management, and responsive panel architectures:

- **[Aspect Ratio](./aspect-ratio/README.md)** (`@gacc-ng/ui/aspect-ratio`): Displays content within a desired ratio (16/9, 4/3, 1, etc.) preventing layout shift during media loading.
- **[Drawer](./drawer/README.md)** (`@gacc-ng/ui/drawer`): Vaul-style sliding drawer component for mobile sheets, dialogs, and panels with multi-direction docking and snap-point support.
- **[Resizable](./resizable/README.md)** (`@gacc-ng/ui/resizable`): Accessible split-pane resizable panel layouts powered by Spartan Brain and Angular CDK with keyboard handle navigation.
- **[Scroll Area](./scroll-area/README.md)** (`@gacc-ng/ui/scroll-area`): Cross-browser custom styled scrollbar wrapper built on `ngx-scrollbar` with design token integration.
- **[Sidebar](./sidebar/README.md)** (`@gacc-ng/ui/sidebar`): Full-featured composable application sidebar with desktop collapsible modes (`offcanvas`, `icon`, `none`), mobile sheet overlay, keyboard shortcuts (`Ctrl+B` / `Cmd+B`), state persistence via cookie, and nested submenus.

---

## Development Commands

```bash
# Build the library in Angular Package Format (APF)
pnpm nx build ui

# Run unit tests across all primitives
pnpm nx test ui

# Lint TypeScript, templates, and dependency checks
pnpm nx lint ui
```
