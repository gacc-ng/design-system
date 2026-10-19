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
pnpm add @angular/cdk @spartan-ng/brain class-variance-authority clsx tailwind-merge tailwindcss tw-animate-css
```

### 2. Design System Preset

Import the unified preset in your application's global stylesheet (e.g., `src/styles.css`):

```css
@import '@gacc-ng/ui/preset.css';
```

### 3. Overlay Provider

Register `provideSpartanHlm()` in your application config (`app.config.ts`):

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideSpartanHlm } from '@gacc-ng/ui/utils';

export const appConfig: ApplicationConfig = {
    providers: [provideSpartanHlm()],
};
```

---

## Secondary Entry Points

Each primitive is documented within its own secondary entry point:

| Entry Point          | Primary Exports                | Documentation                          |
| :------------------- | :----------------------------- | :------------------------------------- |
| `@gacc-ng/ui/button` | `HlmButton`, `buttonVariants`  | [button/README.md](./button/README.md) |
| `@gacc-ng/ui/badge`  | `HlmBadge`, `badgeVariants`    | [badge/README.md](./badge/README.md)   |
| `@gacc-ng/ui/input`  | `HlmInput`, `inputVariants`    | [input/README.md](./input/README.md)   |
| `@gacc-ng/ui/label`  | `HlmLabel`, `labelVariants`    | [label/README.md](./label/README.md)   |
| `@gacc-ng/ui/utils`  | `hlm()`, `provideSpartanHlm()` | [utils/README.md](./utils/README.md)   |

---

## Development Commands

```bash
# Build the library in Angular Package Format (APF)
pnpm nx build ui-helm

# Run unit tests across all primitives
pnpm nx test ui-helm

# Lint TypeScript, templates, and dependency checks
pnpm nx lint ui-helm
```
