---
name: spartan-ng
description: 'Design, scaffold, and implement accessible UI components using Spartan NG (Brain headless primitives + Helm visual directives). USE WHEN building, styling, or refactoring UI components, working with Tailwind design tokens, applying CVA variants, querying Spartan components via MCP, or running Spartan health checks.'
---

# Spartan NG Component Architecture & Workflow

Spartan NG provides accessible, composable UI building blocks for Angular by uniting two distinct layers:

1. **Brain (`@spartan-ng/brain/*`)**: Headless behavioral and accessibility primitives (built on Angular CDK, WAI-ARIA, and Signals).
2. **Helm (`@spartan-ng/helm/*`)**: Presentational directives and styles using Tailwind CSS and `class-variance-authority` (CVA).

---

## 1. Core Architectural Separation

```plain text
┌─────────────────────────────────────────────────────────────────┐
│                       Consumer Application                      │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    @gacc-ng/ui Component Library                │
│                                                                 │
│  ┌─────────────────────────┐       ┌─────────────────────────┐  │
│  │   Spartan Helm Layer    │       │   Spartan Brain Layer   │  │
│  │ (Tailwind + CVA + hlm)  │ ────► │ (Headless / CDK / A11y) │  │
│  └─────────────────────────┘       └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

- **Brain is Headless:** Never add Tailwind utility classes or custom styles inside Brain directives. Brain manages state, accessibility attributes (`aria-*`), focus trapping, keyboard navigation, and event dispatching.
- **Helm is Presentational:** Directives that apply styling via `cva()` and the `hlm()` merging helper (`tailwind-merge` + `clsx`).

---

## 2. Using Spartan MCP Tools (`@spartan-ng/mcp`)

When creating, customizing, or checking Spartan components, always query the running Spartan MCP server first:

### Available MCP Tools:

- **`spartan_components_list`**: Lists all available components (`accordion`, `button`, `dialog`, `input`, `sheet`, `table`, `tabs`, etc.).
- **`spartan_components_get`**: Retrieves official source code, types, directives, and sample usages for a specific component.
    - _Example:_ Call with `{ "name": "button" }` to inspect `HlmButton`, `buttonVariants`, and `BrnButton`.
- **`spartan_components_dependencies`**: Identifies all peer dependencies, CDK modules, or icons needed by a component.
- **`spartan_docs_get`**: Retrieves documentation on topics like `theming`, `dark-mode`, `cli`, and `typography`.
- **`spartan_accessibility_check`**: Checks compliance against WAI-ARIA standards.
- **`spartan_health_instructions`**: Scans the workspace and provides instructions to fix outdated imports or broken configurations.

---

## 3. Scaffolding & Adding Components in Nx

To add a new Spartan primitive or component to the design system:

```bash
# Preview or fetch source code via MCP first:
# call_mcp_tool -> ServerName: "spartan-ui", ToolName: "spartan_components_get", Arguments: { "name": "<component>" }

# Or scaffold via Spartan CLI:
pnpm nx g @spartan-ng/cli:ui <component> --directory=libs/shared/ui/src/lib
```

---

## 4. Key Implementation Rules in this Workspace

1. **Angular Standards:**
    - **Standalone Directives & Components:** Every Spartan primitive is Standalone (`imports: [...]`).
    - **Change Detection:** Strictly `ChangeDetectionStrategy.OnPush`.
    - **Signal Inputs & State:** Use `input()`, `computed()`, and `signal()`. Avoid legacy `@Input()` decorators.
    - **Host Directives:** Compose Brain logic onto elements using Angular `hostDirectives`:
        ```typescript
        @Directive({
            selector: 'button[hlmBtn], a[hlmBtn]',
            exportAs: 'hlmBtn',
            hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
            host: { 'data-slot': 'button' },
        })
        export class HlmButton { ... }
        ```

2. **Overlay Configuration (`provideSpartanHlm`):**
    - In Angular 21+, Angular CDK introduced `usePopover` for overlays which can interfere with fixed elements (e.g. toasts, modals).
    - In application configs (`app.config.ts`), always register:
        ```typescript
        import { provideSpartanHlm } from '@spartan-ng/helm/utils';

        export const appConfig: ApplicationConfig = {
            providers: [
                provideSpartanHlm(),
                // ...
            ],
        };
        ```

3. **Design Tokens & Styling:**
    - Use semantic CSS variables mapped to HSL (`bg-primary`, `text-primary-foreground`, `border-border`, `ring-ring`).
    - Use `classes()` and `hlm()` to merge caller classes safely without overriding component defaults.
