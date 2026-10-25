# @gacc-ng/ui

Accessible, composable, signal-based Angular UI primitive directives built on top of [Spartan](https://spartan.ng) (Brain headless logic + Helm visual layer), Tailwind CSS v4, and Angular CDK.

Designed strictly for modern Angular (v22+), supporting **Zoneless change detection**, **`ChangeDetectionStrategy.OnPush`**, and **Signals** (`input()`, `computed()`, `output()`).

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

| Entry Point               | Primary Exports                                                                                                      | Documentation                                    |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| `@gacc-ng/ui/avatar`      | `HlmAvatar`, `HlmAvatarImage`, `HlmAvatarFallback`, `HlmAvatarBadge`, `HlmAvatarGroup`                               | [avatar/README.md](./avatar/README.md)           |
| `@gacc-ng/ui/badge`       | `HlmBadge`, `badgeVariants`                                                                                          | [badge/README.md](./badge/README.md)             |
| `@gacc-ng/ui/button`      | `HlmButton`, `buttonVariants`                                                                                        | [button/README.md](./button/README.md)           |
| `@gacc-ng/ui/card`        | `HlmCard`, `HlmCardHeader`, `HlmCardTitle`, `HlmCardDescription`, `HlmCardContent`, `HlmCardFooter`, `HlmCardAction` | [card/README.md](./card/README.md)               |
| `@gacc-ng/ui/checkbox`    | `HlmCheckbox`, `HlmCheckboxImports`                                                                                  | [checkbox/README.md](./checkbox/README.md)       |
| `@gacc-ng/ui/input`       | `HlmInput`                                                                                                           | [input/README.md](./input/README.md)             |
| `@gacc-ng/ui/kbd`         | `HlmKbd`, `HlmKbdGroup`, `HlmKbdImports`                                                                             | [kbd/README.md](./kbd/README.md)                 |
| `@gacc-ng/ui/label`       | `HlmLabel`                                                                                                           | [label/README.md](./label/README.md)             |
| `@gacc-ng/ui/radio-group` | `HlmRadioGroup`, `HlmRadio`, `HlmRadioIndicator`, `HlmRadioGroupImports`                                             | [radio-group/README.md](./radio-group/README.md) |
| `@gacc-ng/ui/separator`   | `HlmSeparator`, `HlmSeparatorImports`                                                                                | [separator/README.md](./separator/README.md)     |
| `@gacc-ng/ui/skeleton`    | `HlmSkeleton`, `HlmSkeletonImports`                                                                                  | [skeleton/README.md](./skeleton/README.md)       |
| `@gacc-ng/ui/spinner`     | `HlmSpinner`, `HlmSpinnerImports`                                                                                    | [spinner/README.md](./spinner/README.md)         |
| `@gacc-ng/ui/switch`      | `HlmSwitch`, `HlmSwitchThumb`, `HlmSwitchImports`                                                                    | [switch/README.md](./switch/README.md)           |
| `@gacc-ng/ui/textarea`    | `HlmTextarea`, `HlmTextareaImports`                                                                                  | [textarea/README.md](./textarea/README.md)       |
| `@gacc-ng/ui/utils`       | `hlm()`, `classes()`, `provideGaccUi()`                                                                              | [utils/README.md](./utils/README.md)             |

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
