# Phase 2.3 Layout and Panel Surfaces Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Phase 2.3 layout and panel surfaces (`aspect-ratio`, `scroll-area`, `resizable`, `drawer`, `sidebar`) under `@gacc-ng/ui` categorized under `Layout/*` in Storybook, adhering strictly to Angular 22 zoneless signals and Spartan Helm standards.

**Architecture:** Pure presentational Spartan Helm directives and components composed with `@spartan-ng/brain` primitives (`@spartan-ng/brain/resizable`, `@spartan-ng/brain/drawer`, `@spartan-ng/brain/dialog`, `@spartan-ng/brain/tooltip`) and `ngx-scrollbar`. Secondary entry points are built with isolated `ng-package.json` files and registered in `tsconfig.base.json`.

**Tech Stack:** Angular 22, Spartan NG (`@spartan-ng/brain` 1.8.1, Helm utils), Tailwind CSS 4, `ngx-scrollbar`, Vitest, Storybook 10.

**Spec:** [GitHub Issue #129](https://github.com/gacc-ng/design-system/issues/129) derived from [RFC #126](https://github.com/gacc-ng/design-system/discussions/126).

---

## Global Constraints

- **Package Manager:** Strictly `pnpm` (`packageManager: pnpm@12.3.4`). Never run `npm` or `yarn`.
- **Language:** English only for all code, identifiers, types, comments, docstrings, commit messages, PR descriptions, and documentation.
- **Commit Format:** Conventional Commits + Gitmoji (`<type>(<scope>): <emoji> <description>` or `<type>: <emoji> <description>`). Never add "Co-Authored-By" or AI attribution.
- **Secondary Entrypoint Configuration:** `ng-package.json` files must strictly only contain `{"lib": {"entryFile": "src/index.ts"}}`. Never include `dest` or `$schema`.
- **Human Merge Gate:** Never merge any Pull Request without explicit affirmative human authorization in the prompt. Validate zero conflicts against `origin/main` before requesting merge.

---

## Review Focus

1. **Aspect Ratio string division parsing:** Fractions like `"16/9"`, `"4/3"`, `"1/1"` as string inputs must parse accurately into numerical aspect ratios, and zero/negative numbers must fall back safely to `1`.
2. **Scroll Area headless host bindings:** `ng-scrollbar[hlm]` must properly apply Tailwind theme CSS variables (`--scrollbar-thumb-color`, `--scrollbar-track-color`) and prevent layout shifts.
3. **Resizable panel keyboard & boundary constraints:** `hlm-resizable-handle` and `hlm-resizable-panel` must respect `minSize`, `maxSize`, and keyboard navigation via arrow keys.
4. **Drawer touch gesture & positioning classes:** `hlm-drawer-content` must correctly render directional classes (`data-[vaul-drawer-direction=bottom]`, `top`, `left`, `right`) and grab notch indicator.
5. **Sidebar responsive viewport & shortcut handling:** `HlmSidebarService` must handle `⌘B` / `Ctrl+B` toggle, cookie state persistence (`sidebar_state`), and smoothly transition between desktop rail/gap and mobile off-canvas sheet (`hlm-sheet`).

---

## Task Decomposition

### Task 1: Environment & Dependency Setup

**Files:**

- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `tsconfig.base.json`

**Interfaces:**

- Consumes: None
- Produces: `ngx-scrollbar` dependency installed; TypeScript path aliases for `@gacc-ng/ui/aspect-ratio`, `@gacc-ng/ui/scroll-area`, `@gacc-ng/ui/resizable`, `@gacc-ng/ui/drawer`, `@gacc-ng/ui/sidebar`.

- [ ] **Step 1: Install `ngx-scrollbar` via pnpm**

Run: `pnpm add ngx-scrollbar`
Expected: `package.json` updated with `"ngx-scrollbar": "^19.1.5"` and lockfile cleanly generated.

- [ ] **Step 2: Add path aliases to `tsconfig.base.json`**

Register the 5 secondary entrypoints in `compilerOptions.paths`:

```json
"@gacc-ng/ui/aspect-ratio": ["./libs/ui/aspect-ratio/src/index.ts"],
"@gacc-ng/ui/scroll-area": ["./libs/ui/scroll-area/src/index.ts"],
"@gacc-ng/ui/resizable": ["./libs/ui/resizable/src/index.ts"],
"@gacc-ng/ui/drawer": ["./libs/ui/drawer/src/index.ts"],
"@gacc-ng/ui/sidebar": ["./libs/ui/sidebar/src/index.ts"]
```

- [ ] **Step 3: Verify formatting and workspace integrity**

Run: `pnpm run format:check`
Expected: PASS (or run `pnpm run format:write` if needed).

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.base.json
git commit -m "build: 🏗️ add ngx-scrollbar and configure layout path aliases"
```

---

### Task 2: Implement `aspect-ratio` Surface Primitive

**Files:**

- Create: `libs/ui/aspect-ratio/ng-package.json`
- Create: `libs/ui/aspect-ratio/README.md`
- Create: `libs/ui/aspect-ratio/src/index.ts`
- Create: `libs/ui/aspect-ratio/src/lib/hlm-aspect-ratio.directive.ts`
- Create: `libs/ui/aspect-ratio/src/lib/hlm-aspect-ratio.directive.spec.ts`
- Create: `libs/ui/aspect-ratio/src/lib/hlm-aspect-ratio.stories.ts`

**Interfaces:**

- Consumes: `@angular/cdk/coercion`, `@spartan-ng/helm/utils` (`classes`)
- Produces: `HlmAspectRatio`, `HlmAspectRatioImports`

- [ ] **Step 1: Write failing unit test for `HlmAspectRatio`**

Test covers:

- Default ratio is `1` (`--ratio: 1`).
- Numerical input (`16 / 9`) sets `--ratio: 1.7777777777777777`.
- String fraction input (`"16/9"`) sets `--ratio: 1.7777777777777777`.
- Zero or negative input falls back to `1`.
- Host attribute `data-slot="aspect-ratio"` and class `relative aspect-(--ratio)`.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm nx test ui --testFile=hlm-aspect-ratio.directive.spec.ts`
Expected: FAIL with missing module.

- [ ] **Step 3: Implement `HlmAspectRatio` and secondary entrypoint files**

Create:

- `libs/ui/aspect-ratio/ng-package.json`:
    ```json
    {
        "lib": {
            "entryFile": "src/index.ts"
        }
    }
    ```
- `libs/ui/aspect-ratio/src/lib/hlm-aspect-ratio.directive.ts`:
  Directive with selector `[hlmAspectRatio]`, exportAs `hlmAspectRatio`, `ratio` input with `parseDividedString` and `coerceNumberProperty`, host bindings `data-slot="aspect-ratio"` and `[style.--ratio]="ratio()"`, applying classes `relative aspect-(--ratio)`.
- `libs/ui/aspect-ratio/src/index.ts`:
  Export `HlmAspectRatio` and `HlmAspectRatioImports`.
- `libs/ui/aspect-ratio/src/lib/hlm-aspect-ratio.stories.ts`:
  CSF3 stories under title `Layout/Aspect Ratio` with Default (16/9), Square (1/1), Portrait (9/16), and Banner (21/9) variants with mock media containers.
- `libs/ui/aspect-ratio/README.md`:
  Component usage documentation.

- [ ] **Step 4: Run unit test to verify it passes**

Run: `pnpm nx test ui --testFile=hlm-aspect-ratio.directive.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/aspect-ratio/
git commit -m "feat(ui): ✨ implement aspect-ratio component"
```

---

### Task 3: Implement `scroll-area` Surface Primitive

**Files:**

- Create: `libs/ui/scroll-area/ng-package.json`
- Create: `libs/ui/scroll-area/README.md`
- Create: `libs/ui/scroll-area/src/index.ts`
- Create: `libs/ui/scroll-area/src/lib/hlm-scroll-area.directive.ts`
- Create: `libs/ui/scroll-area/src/lib/hlm-scroll-area.directive.spec.ts`
- Create: `libs/ui/scroll-area/src/lib/hlm-scroll-area.stories.ts`

**Interfaces:**

- Consumes: `ngx-scrollbar` (`provideScrollbarOptions`), `@spartan-ng/helm/utils` (`classes`)
- Produces: `HlmScrollArea`, `HlmScrollAreaImports`

- [ ] **Step 1: Write failing unit test for `HlmScrollArea`**

Test covers:

- Selector `ng-scrollbar[hlm],ng-scrollbar[hlmScrollbar]`.
- Host attribute `data-slot="scroll-area"`.
- Host style variables for `--scrollbar-thumb-color`, `--scrollbar-track-color`, etc.
- Classes `rounded-md [--scrollbar-thumb-shape:9999px] block`.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm nx test ui --testFile=hlm-scroll-area.directive.spec.ts`
Expected: FAIL with missing module.

- [ ] **Step 3: Implement `HlmScrollArea` and secondary entrypoint files**

Create:

- `libs/ui/scroll-area/ng-package.json`:
    ```json
    {
        "lib": {
            "entryFile": "src/index.ts"
        }
    }
    ```
- `libs/ui/scroll-area/src/lib/hlm-scroll-area.directive.ts`:
  Directive providing `provideScrollbarOptions({ visibility: 'hover' })` and styling properties.
- `libs/ui/scroll-area/src/index.ts`:
  Export `HlmScrollArea` and `HlmScrollAreaImports`.
- `libs/ui/scroll-area/src/lib/hlm-scroll-area.stories.ts`:
  CSF3 stories under title `Layout/Scroll Area` with Vertical scroll list, Horizontal tag track, and Bordered container.
- `libs/ui/scroll-area/README.md`:
  Component usage documentation.

- [ ] **Step 4: Run unit test to verify it passes**

Run: `pnpm nx test ui --testFile=hlm-scroll-area.directive.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/scroll-area/
git commit -m "feat(ui): ✨ implement scroll-area component"
```

---

### Task 4: Implement `resizable` Panel Splitter Primitives

**Files:**

- Create: `libs/ui/resizable/ng-package.json`
- Create: `libs/ui/resizable/README.md`
- Create: `libs/ui/resizable/src/index.ts`
- Create: `libs/ui/resizable/src/lib/hlm-resizable-group.directive.ts`
- Create: `libs/ui/resizable/src/lib/hlm-resizable-handle.component.ts`
- Create: `libs/ui/resizable/src/lib/hlm-resizable-panel.directive.ts`
- Create: `libs/ui/resizable/src/lib/hlm-resizable.spec.ts`
- Create: `libs/ui/resizable/src/lib/hlm-resizable.stories.ts`

**Interfaces:**

- Consumes: `@spartan-ng/brain/resizable` (`BrnResizableGroup`, `BrnResizableHandle`, `BrnResizablePanel`), `@spartan-ng/helm/utils` (`classes`)
- Produces: `HlmResizableGroup`, `HlmResizableHandle`, `HlmResizablePanel`, `HlmResizableImports`

- [ ] **Step 1: Write failing unit tests for `resizable` directives and component**

Test covers:

- `HlmResizableGroup` attaches `BrnResizableGroup`, binds `direction` and layout outputs, adds `data-slot="resizable-group"`.
- `HlmResizableHandle` renders handle notch when `withHandle` is true, applies vertical/horizontal cursor and transition classes.
- `HlmResizablePanel` attaches `BrnResizablePanel`, passes `defaultSize`, `minSize`, `maxSize`, exposes `setSize()` method.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm nx test ui --testFile=hlm-resizable.spec.ts`
Expected: FAIL with missing module.

- [ ] **Step 3: Implement `HlmResizableGroup`, `HlmResizableHandle`, `HlmResizablePanel`**

Create:

- `libs/ui/resizable/ng-package.json`:
    ```json
    {
        "lib": {
            "entryFile": "src/index.ts"
        }
    }
    ```
- Implementation files for group directive, handle component, panel directive.
- `libs/ui/resizable/src/index.ts`:
  Export all directives and `HlmResizableImports = [HlmResizableGroup, HlmResizablePanel, HlmResizableHandle] as const`.
- `libs/ui/resizable/src/lib/hlm-resizable.stories.ts`:
  Stories under `Layout/Resizable`: Two-Panel Horizontal, Vertical Split, With Draggable Handle, and Nested Resizable Groups.
- `libs/ui/resizable/README.md`:
  Component documentation.

- [ ] **Step 4: Run unit test to verify it passes**

Run: `pnpm nx test ui --testFile=hlm-resizable.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/resizable/
git commit -m "feat(ui): ✨ implement resizable component"
```

---

### Task 5: Implement `drawer` Modal / Sheet Gesture Primitive

**Files:**

- Create: `libs/ui/drawer/ng-package.json`
- Create: `libs/ui/drawer/README.md`
- Create: `libs/ui/drawer/src/index.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer.component.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer-close.directive.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer-content.component.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer-description.directive.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer-footer.directive.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer-header.directive.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer-overlay.directive.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer-portal.directive.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer-title.directive.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer-trigger.directive.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer.spec.ts`
- Create: `libs/ui/drawer/src/lib/hlm-drawer.stories.ts`

**Interfaces:**

- Consumes: `@spartan-ng/brain/drawer`, `@spartan-ng/brain/dialog`, `@spartan-ng/brain/core`
- Produces: `HlmDrawer`, `HlmDrawerClose`, `HlmDrawerContent`, `HlmDrawerDescription`, `HlmDrawerFooter`, `HlmDrawerHeader`, `HlmDrawerOverlay`, `HlmDrawerPortal`, `HlmDrawerTitle`, `HlmDrawerTrigger`, `HlmDrawerImports`

- [ ] **Step 1: Write failing unit tests for `drawer`**

Test covers:

- `HlmDrawer` provides `BrnDrawer` and `BrnDialog`.
- `HlmDrawerTrigger` opens drawer on click.
- `HlmDrawerContent` renders drag handle notch when direction is bottom, applies directional slide-in classes.
- `HlmDrawerClose` closes active drawer.
- `HlmDrawerTitle` and `HlmDrawerDescription` attach accessible labels.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm nx test ui --testFile=hlm-drawer.spec.ts`
Expected: FAIL with missing module.

- [ ] **Step 3: Implement `HlmDrawer` and companion directives**

Create:

- `libs/ui/drawer/ng-package.json`:
    ```json
    {
        "lib": {
            "entryFile": "src/index.ts"
        }
    }
    ```
- Component and directive files adhering to Spartan brain composition.
- `libs/ui/drawer/src/index.ts`:
  Export all primitives and `HlmDrawerImports`.
- `libs/ui/drawer/src/lib/hlm-drawer.stories.ts`:
  Stories under `Layout/Drawer`: Default (Bottom Sheet), Positions (Top, Left, Right), With Form Inputs, and Nested Scroll.
- `libs/ui/drawer/README.md`:
  Component documentation.

- [ ] **Step 4: Run unit test to verify it passes**

Run: `pnpm nx test ui --testFile=hlm-drawer.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/drawer/
git commit -m "feat(ui): ✨ implement drawer component"
```

---

### Task 6: Implement `sidebar` Responsive Layout System

**Files:**

- Create: `libs/ui/sidebar/ng-package.json`
- Create: `libs/ui/sidebar/README.md`
- Create: `libs/ui/sidebar/src/index.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar.service.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar.token.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar.component.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-content.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-footer.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-group.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-group-action.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-group-content.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-group-label.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-header.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-input.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-inset.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-menu.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-menu-action.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-menu-badge.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-menu-button.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-menu-item.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-menu-skeleton.component.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-menu-sub.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-menu-sub-button.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-menu-sub-item.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-rail.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-separator.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-trigger.component.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar-wrapper.directive.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar.spec.ts`
- Create: `libs/ui/sidebar/src/lib/hlm-sidebar.stories.ts`

**Interfaces:**

- Consumes: `@gacc-ng/ui/button`, `@gacc-ng/ui/input`, `@gacc-ng/ui/separator`, `@gacc-ng/ui/sheet`, `@gacc-ng/ui/skeleton`, `@gacc-ng/ui/tooltip`, `@ng-icons/core`, `@ng-icons/lucide` (`lucidePanelLeft`)
- Produces: `HlmSidebarService`, `HlmSidebarConfig`, `provideHlmSidebarConfig`, `injectHlmSidebarConfig`, `HlmSidebar`, `HlmSidebarTrigger`, `HlmSidebarContent`, `HlmSidebarFooter`, `HlmSidebarHeader`, `HlmSidebarGroup`, `HlmSidebarMenu`, `HlmSidebarMenuItem`, `HlmSidebarMenuButton`, `HlmSidebarRail`, `HlmSidebarWrapper`, `HlmSidebarInset`, `HlmSidebarImports`.

- [ ] **Step 1: Write failing unit tests for `sidebar`**

Test covers:

- `HlmSidebarService`:
    - `open`, `openMobile`, `isMobile`, `state` signals.
    - `toggleSidebar()` toggles desktop open state or mobile sheet state.
    - Keyboard shortcut (`⌘B` / `ctrl+B`) triggers sidebar toggle.
    - Cookie state restoration on initialization.
- `HlmSidebar`:
    - Renders desktop container and gap when not mobile.
    - Delegates to `hlm-sheet` with `hlm-sheet-content` when `isMobile()` is true.
    - Respects `collapsible="icon"` and `collapsible="offcanvas"`.
- `HlmSidebarTrigger`:
    - Renders `lucidePanelLeft` icon and toggles sidebar on click.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm nx test ui --testFile=hlm-sidebar.spec.ts`
Expected: FAIL with missing module.

- [ ] **Step 3: Implement `HlmSidebarService`, directives, components, and token**

Create:

- `libs/ui/sidebar/ng-package.json`:
    ```json
    {
        "lib": {
            "entryFile": "src/index.ts"
        }
    }
    ```
- `libs/ui/sidebar/src/lib/hlm-sidebar.token.ts`: configuration token and default values.
- `libs/ui/sidebar/src/lib/hlm-sidebar.service.ts`: injectable service with matchMedia, keyboard shortcut, cookie persistence.
- Component and directive files.
- `libs/ui/sidebar/src/index.ts`: Export all primitives and `HlmSidebarImports`.
- `libs/ui/sidebar/src/lib/hlm-sidebar.stories.ts`:
  Stories under `Layout/Sidebar`: Default App Shell, Inset Variant, Floating Variant, Collapsible Icon Rail, and Mobile Responsive.
- `libs/ui/sidebar/README.md`:
  Comprehensive sidebar usage documentation.

- [ ] **Step 4: Run unit test to verify it passes**

Run: `pnpm nx test ui --testFile=hlm-sidebar.spec.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/sidebar/
git commit -m "feat(ui): ✨ implement sidebar component"
```

---

### Task 7: Universal Barrels & Integration Verification

**Files:**

- Modify: `libs/ui/src/index.ts`
- Modify: `libs/ui/src/barrels.spec.ts`
- Modify: `libs/ui/README.md`

**Interfaces:**

- Consumes: All 5 layout entry points
- Produces: Universal exports from root `@gacc-ng/ui`

- [ ] **Step 1: Export secondary entrypoints in `libs/ui/src/index.ts`**

Export:

```ts
export * from '@gacc-ng/ui/aspect-ratio';
export * from '@gacc-ng/ui/drawer';
export * from '@gacc-ng/ui/resizable';
export * from '@gacc-ng/ui/scroll-area';
export * from '@gacc-ng/ui/sidebar';
```

- [ ] **Step 2: Add all 5 new modules to `libs/ui/src/barrels.spec.ts`**

Register in `barrels` dictionary:

- `'aspect-ratio'`: `HlmAspectRatioImports`
- `'scroll-area'`: `HlmScrollAreaImports`
- `'resizable'`: `HlmResizableImports`
- `'drawer'`: `HlmDrawerImports`
- `'sidebar'`: `HlmSidebarImports`

- [ ] **Step 3: Update `libs/ui/README.md`**

Add Layout components section listing `Aspect Ratio`, `Drawer`, `Resizable`, `Scroll Area`, and `Sidebar`.

- [ ] **Step 4: Run all workspace tests and formatting check**

Run:

```bash
pnpm run format:check
pnpm nx test ui
pnpm nx run-many -t lint
pnpm nx build ui
pnpm nx run storybook:build-storybook -c ci
```

Expected: All suites PASS with 0 errors.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/src/index.ts libs/ui/src/barrels.spec.ts libs/ui/README.md
git commit -m "feat(ui): ✨ export layout primitives and update barrels"
```

---

### Task 8: Git Branch Management, Pull Request & Human Merge Gate

**Files:** None

- [ ] **Step 1: Create feature branch and verify clean git status**

Create branch: `git checkout -b feat/phase-2-3-layout-surfaces origin/main`
Verify status: `git status`

- [ ] **Step 2: Pre-merge conflict check against `origin/main`**

Verify ancestry:

```bash
git fetch origin main
git merge-base --is-ancestor origin/main HEAD
```

Expected: Exit code 0 (clean ancestry without conflicts).

- [ ] **Step 3: Push feature branch and create Pull Request**

Push: `git push origin feat/phase-2-3-layout-surfaces`
Create PR:

```bash
gh pr create --base main --head feat/phase-2-3-layout-surfaces --title "feat(ui): ✨ implement Phase 2.3 layout and panel surfaces" --body "..."
```

- [ ] **Step 4: Monitor CI pipeline and present PR for Human Merge Gate**

Verify CI status with GitHub CLI and report PR link to human reviewer.
Strict Rule: Await explicit affirmative authorization before executing merge.
