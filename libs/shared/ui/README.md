# @gacc-ng/ui

Accessible, composable, signal-based Angular UI primitive directives built on top of [Spartan](https://spartan.ng) (Brain headless logic + Helm visual layer), Tailwind CSS v4, and Angular CDK.

Designed strictly for modern Angular (v22+), supporting **Zoneless change detection**, **`ChangeDetectionStrategy.OnPush`**, and **Signals** (`input()`, `computed()`, `output()`).

---

## Architecture Overview

`@gacc-ng/ui` separates headless behavioral logic from presentation using the Spartan dual-layer pattern:

```text
┌─────────────────────────────────────────────────────────────┐
│                     Consumer Application                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 @gacc-ng/ui (Library Package)               │
│                                                             │
│  ┌─────────────────────────┐     ┌───────────────────────┐  │
│  │   Helm Layer (Visual)   │     │  Brain Layer (Logic)  │  │
│  │  Tailwind CSS + CVA     │ ──► │  Angular CDK + A11y   │  │
│  │  Class Merging (hlm)    │     │  Headless Directives  │  │
│  └─────────────────────────┘     └───────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

- **Brain Layer (`@spartan-ng/brain/*`)**: Headless behavioral and accessibility primitives. Manages keyboard navigation, focus trapping, and ARIA states without applying styles.
- **Helm Layer (`@gacc-ng/ui/*`)**: Presentational directives applying Tailwind design tokens via `class-variance-authority` (`cva()`) and the `hlm()` merging utility.
- **Secondary Entry Points**: Each primitive is packaged independently under its own subpath (e.g. `@gacc-ng/ui/button`, `@gacc-ng/ui/badge`) for optimal bundle size and fine-grained tree-shaking.

---

## Installation & Setup

### 1. Peer Dependencies

Ensure your project has the required peer dependencies installed:

```bash
pnpm add @angular/cdk @spartan-ng/brain class-variance-authority clsx tailwind-merge tailwindcss tw-animate-css
```

### 2. Import the Design System Tailwind Preset

Add the unified design system preset to your application stylesheet (e.g., `src/styles.css`):

```css
@import '@gacc-ng/ui/preset.css';
```

This preset configures the semantic color palette, border radii, animations, and typography variables for light and dark modes.

### 3. Register Overlay Provider (Recommended)

In Angular 21+, Angular CDK introduced `usePopover` by default. To ensure Spartan overlay primitives (dialogs, tooltips, popovers) render with standard DOM layering, register `provideSpartanHlm()` in your application config (`app.config.ts`):

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideSpartanHlm } from '@gacc-ng/ui/utils';

export const appConfig: ApplicationConfig = {
    providers: [
        provideSpartanHlm(),
        // other application providers...
    ],
};
```

---

## Available Primitives

All components are standalone directives and can be imported directly into any component `imports` array:

| Primitive  | Entry Point          | Primary Directive / Component  | Selectors                         | CVA Variants Helper |
| :--------- | :------------------- | :----------------------------- | :-------------------------------- | :------------------ |
| **Button** | `@gacc-ng/ui/button` | `HlmButton`                    | `button[hlmBtn]`, `a[hlmBtn]`     | `buttonVariants`    |
| **Badge**  | `@gacc-ng/ui/badge`  | `HlmBadge`                     | `span[hlmBadge]`, `div[hlmBadge]` | `badgeVariants`     |
| **Input**  | `@gacc-ng/ui/input`  | `HlmInput`                     | `input[hlmInput]`                 | `inputVariants`     |
| **Label**  | `@gacc-ng/ui/label`  | `HlmLabel`                     | `label[hlmLabel]`                 | `labelVariants`     |
| **Utils**  | `@gacc-ng/ui/utils`  | `hlm()`, `provideSpartanHlm()` | N/A                               | N/A                 |

---

## Usage Examples

### Button (`@gacc-ng/ui/button`)

Applies visual styling and accessible interactions to native `<button>` and `<a>` elements:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButton } from '@gacc-ng/ui/button';

@Component({
    selector: 'app-button-demo',
    standalone: true,
    imports: [HlmButton],
    template: `
        <!-- Default button -->
        <button hlmBtn>Default Button</button>

        <!-- Variants: default | secondary | destructive | outline | ghost | link -->
        <button hlmBtn variant="secondary">Secondary</button>
        <button hlmBtn variant="destructive">Destructive</button>
        <button hlmBtn variant="outline">Outline</button>

        <!-- Sizes: default | sm | lg | icon -->
        <button hlmBtn size="sm">Small</button>
        <button hlmBtn size="lg">Large</button>

        <!-- Disabled state -->
        <button hlmBtn disabled>Disabled</button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoComponent {}
```

### Badge (`@gacc-ng/ui/badge`)

Semantic status badges supporting static text or indicator elements:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmBadge } from '@gacc-ng/ui/badge';

@Component({
    selector: 'app-badge-demo',
    standalone: true,
    imports: [HlmBadge],
    template: `
        <!-- Variants: default | secondary | destructive | outline -->
        <span hlmBadge>Default</span>
        <span hlmBadge variant="secondary">Secondary</span>
        <span hlmBadge variant="destructive">Destructive</span>
        <span hlmBadge variant="outline">Outline</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeDemoComponent {}
```

### Form Input & Label (`@gacc-ng/ui/input`, `@gacc-ng/ui/label`)

Fully accessible form fields composed with native labels and inputs:

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmLabel } from '@gacc-ng/ui/label';

@Component({
    selector: 'app-form-demo',
    standalone: true,
    imports: [FormsModule, HlmInput, HlmLabel],
    template: `
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <label hlmLabel for="email-field">Email address</label>
            <input hlmInput id="email-field" type="email" placeholder="name@company.com" [(ngModel)]="email" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDemoComponent {
    readonly email = signal('');
}
```

---

## Utility Functions (`@gacc-ng/ui/utils`)

### `hlm(...inputs: ClassValue[]): string`

Merges Tailwind utility classes safely, combining `clsx` conditionals with `tailwind-merge` resolution to prevent CSS conflict bugs:

```typescript
import { hlm } from '@gacc-ng/ui/utils';

// Resolves duplicate padding classes cleanly:
const mergedClasses = hlm('px-4 py-2 bg-primary', isActive && 'bg-destructive', customClass);
```

---

## Development & Quality Standards

When working on `@gacc-ng/ui`, ensure the following monorepo quality standards are upheld:

- **Strict Signal-based API**: Always prefer `input()`, `computed()`, and `output()` over legacy `@Input` or `@Output` decorators.
- **OnPush Change Detection**: Every component must explicitly declare `changeDetection: ChangeDetectionStrategy.OnPush`.
- **Secondary Entry Points**: Maintain isolation across secondary entry points. Do not cross-import private internals between primitives; import public APIs through `@gacc-ng/ui/<subpath>`.

### Common Commands

```bash
# Build the library in Angular Package Format (APF)
pnpm nx build ui-helm

# Run Vitest unit tests across all primitives
pnpm nx test ui-helm

# Lint TypeScript, templates, and package.json dependency checks
pnpm nx lint ui-helm
```
