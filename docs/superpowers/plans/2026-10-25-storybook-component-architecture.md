# Storybook Component Architecture — API Controls Table, Standalone Code Snippets & State Matrix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize and elevate Storybook Autodocs documentation across all 32 primitives in `@gacc-ng/ui`, formalizing categorized API control tables (`Inputs`, `Events`, `Slots`, `Brain Directives`), high-fidelity copy-pasteable Angular Standalone code synthesis in `preview.ts`, and a mandatory 5-story state matrix (`Default`, `AllVariants`, `AllSizes`, `States`, `WithIcon`/`Composition`).

**Architecture:**

- Universal barrel adoption in `apps/storybook/.storybook/preview.ts` replacing hardcoded whitelists with `Hlm*Imports` and dynamic `@ng-icons/lucide` provider synthesis.
- Coordinated Storybook CSF3 schema across `libs/ui/**/*.stories.ts` defining typed `Meta<StoryArgs>` with granular `table.category` mappings.
- Exhaustive visual coverage providing static CVA variant grids, scale steps, interactive disabled/loading states, and slotted compound examples.

**Tech Stack:** Storybook 10 (`@storybook/angular-vite`), Angular 20.3 (Standalone, Zoneless, Signals), Spartan NG (`@spartan-ng/brain`, `@spartan-ng/helm`), Tailwind CSS, `@ng-icons/core` & `@ng-icons/lucide`.

**Spec:** [GitHub Discussion #82: RFC: Component Storybook Architecture — API Controls Table, Standalone Code Snippets & State Matrix](https://github.com/gacc-ng/design-system/discussions/82)

---

## Global Constraints

- **Package Manager:** Strictly `pnpm` (`packageManager: pnpm@12.3.4`). Never run `npm`, `npx` or `yarn`. Always prefix commands with `pnpm nx`.
- **Language Standard:** Strict English only in all code, comments, identifiers, stories, commit messages, and documentation.
- **Commit Convention:** Conventional Commits with Gitmoji (`<type>(<scope>): <emoji> <description>` or `<type>: <emoji> <description>`).
- **Angular Conventions:** Standalone components, OnPush change detection, Zoneless execution, Signal-based APIs (`input()`, `output()`, `computed()`).
- **Spartan Directives:** Compose Brain logic (`@spartan-ng/brain/*`) and Helm visual directives (`@spartan-ng/helm/*`) via `Hlm*Imports` barrels.

---

## Review Focus

1. **Multi-Part & Compound Primitives:** For compound components (e.g., `Dialog`, `Accordion`, `Select`, `Tabs`), the synthesized snippet must import the universal barrel `Hlm<Name>Imports` which provides all sub-directives, ensuring the standalone component snippet compiles without missing declarations.
2. **Icon Provider Synthesis:** When a story template uses `<ng-icon name="lucide..." />`, `preview.ts`'s `formatStandaloneComponentSource` must automatically parse icon names and synthesize `import { NgIcon, provideIcons } from '@ng-icons/core';` and `import { lucide... } from '@ng-icons/lucide';` in `providers: [provideIcons({ ... })]`.
3. **Template Extraction Edge Cases:** CSF3 render functions with complex inline template strings or multiline interpolation must dedent cleanly without leaving dangling backticks, broken escaped characters, or mismatched quotation marks.
4. **ArgTypes Category Segregation:** Every story argument in `argTypes` must explicitly declare `table.category` (`Inputs`, `Events`, `Slots`, or `Brain Primitives`) to avoid uncategorized argument pollution in the Storybook Controls table.
5. **Zero Storybook Build Regressions:** Storybook production build (`pnpm nx run storybook:build-storybook -c ci`) must pass cleanly with 0 TypeScript, template compilation, or Vite bundling errors across all 32 primitives.

---

## Task Decomposition

### Task 1: Universal Barrel & Icon Provider Synthesis in `preview.ts`

**Files:**

- Modify: `apps/storybook/.storybook/preview.ts:20-125`
- Test: `apps/storybook/.storybook/preview-transform.spec.ts`

**Interfaces:**

- Consumes: All 32 primitives' `Hlm*Imports` barrels from `@gacc-ng/ui/*`.
- Produces: Enhanced `formatStandaloneComponentSource(code: string, context?: { title?: string }): string` supporting universal `Hlm${pascalName}Imports` and automatic `@ng-icons` detection.

- [ ] **Step 1: Write unit tests verifying code snippet transformation**
      Create `apps/storybook/.storybook/preview-transform.spec.ts` testing:
    1. Standard single primitive (`title: 'Primitives/Button'`) transforms to `import { HlmButtonImports } from '@gacc-ng/ui/button';`.
    2. Compound primitive (`title: 'Primitives/Accordion'`) transforms to `import { HlmAccordionImports } from '@gacc-ng/ui/accordion';`.
    3. Template with `<ng-icon name="lucideMail" />` adds `@ng-icons/core` and `@ng-icons/lucide` imports, adds `NgIcon` to `imports: [...]`, and registers `providers: [provideIcons({ lucideMail })]`.
    4. Template with multiple icons `<ng-icon name="lucideLoader2" />` and `<ng-icon name="lucideCheck" />` registers both icons uniquely.

- [ ] **Step 2: Run test to verify it fails**
      Run: `pnpm nx test storybook --testFile=preview-transform.spec.ts`
      Expected: FAIL with missing icon provider parsing or whitelist mismatch.

- [ ] **Step 3: Implement universal barrel & icon extraction in `preview.ts`**
    - Remove hardcoded `MULTI_PART_COMPONENTS` Set.
    - Set `const importSymbol = \`Hlm\${pascalName}Imports\`;` universally.
    - Add regex matcher for icon names: `const iconMatches = Array.from(dedentedTemplate.matchAll(/<ng-icon[^>]*name=["']([^"']+)["']/g), m => m[1]);`.
    - Deduplicate matched icons. If matches exist, inject `NgIcon, provideIcons` and `lucide...` imports, add `NgIcon` to `@Component.imports`, and append `providers: [provideIcons({ ... })]`.

- [ ] **Step 4: Run test to verify it passes**
      Run: `pnpm nx test storybook --testFile=preview-transform.spec.ts`
      Expected: PASS

- [ ] **Step 5: Commit changes**
    ```bash
    git add apps/storybook/.storybook/preview.ts apps/storybook/.storybook/preview-transform.spec.ts
    git commit -m "feat(storybook): ✨ synthesize universal imports and icon providers in code preview"
    ```

---

### Task 2: Standardize Button Reference Implementation (Benchmark)

**Files:**

- Modify: `libs/ui/button/src/lib/hlm-button.stories.ts`

**Interfaces:**

- Consumes: `HlmButton`, `HlmButtonImports`, `ButtonVariants`, `NgIcon`, `provideIcons`, `lucideLoader2`, `lucideMail`, `lucideChevronRight`.
- Produces: Complete 5-story reference implementation satisfying all 4 RFC criteria.

- [ ] **Step 1: Update `ButtonStoryArgs` and `argTypes`**
    - Add `Slots` category for default label slot (`text` or content projection).
    - Add `Brain Primitives` category for `BrnButton` inherited behavior if applicable.
    - Ensure all categories (`Inputs`, `Events`, `Slots`) have `table.type.summary` and `table.defaultValue.summary`.

- [ ] **Step 2: Add `Loading` and `WithIcon` stories**
    - Add `Loading` story rendering `<button hlmBtn disabled><ng-icon name="lucideLoader2" class="size-4 animate-spin mr-2" /> Please wait</button>`.
    - Add `WithIcon` story rendering buttons with prefix icon (`lucideMail`), suffix icon (`lucideChevronRight`), and icon-only (`size="icon"`).
    - Add icon providers to story `moduleMetadata`: `imports: [HlmButton, NgIcon]`, `providers: [provideIcons({ lucideLoader2, lucideMail, lucideChevronRight })]`.

- [ ] **Step 3: Verify Storybook build on Button**
      Run: `pnpm nx run storybook:build-storybook -c ci`
      Expected: Successful build with clean code preview.

- [ ] **Step 4: Commit changes**
    ```bash
    git add libs/ui/button/src/lib/hlm-button.stories.ts
    git commit -m "feat(button): ✨ enrich storybook autodocs with loading, icon variants, and slots"
    ```

---

### Task 3: Batch 1 — Simple Presentational Primitives (7 Components)

**Files:**

- Modify: `libs/ui/badge/src/lib/hlm-badge.stories.ts`
- Modify: `libs/ui/card/src/lib/hlm-card.stories.ts`
- Modify: `libs/ui/separator/src/lib/hlm-separator.stories.ts`
- Modify: `libs/ui/skeleton/src/lib/hlm-skeleton.stories.ts`
- Modify: `libs/ui/kbd/src/lib/hlm-kbd.stories.ts`
- Modify: `libs/ui/label/src/lib/hlm-label.stories.ts`
- Modify: `libs/ui/avatar/src/lib/hlm-avatar.stories.ts`

**Specifications per primitive:**

- **`Badge`**: Controls for `variant` (`default`, `secondary`, `destructive`, `outline`). Stories: `Default`, `AllVariants`, `WithIcon`, `Pill`.
- **`Card`**: Sub-directives documented in `argTypes`. Stories: `Default`, `Interactive`, `WithForm`, `Minimal`.
- **`Separator`**: Controls for `orientation` (`horizontal`, `vertical`), `decorative`. Stories: `Default`, `Vertical`, `WithText`.
- **`Skeleton`**: Controls for `class` dimensions. Stories: `Default`, `CardPreview`, `AvatarWithText`.
- **`Kbd`**: Controls for `size`. Stories: `Default`, `AllSizes`, `KeyCombination` (`Cmd + K`).
- **`Label`**: Controls for `disabled`, `required`. Stories: `Default`, `WithInput`, `RequiredAsterisk`.
- **`Avatar`**: Controls for `src`, `alt`, `fallback`. Stories: `Default`, `WithFallback`, `AllSizes`, `AvatarGroup`.

- [ ] **Step 1: Implement Batch 1 stories and argTypes**
      Update each story file with typed `StoryArgs`, categorized `argTypes`, and full story matrix.

- [ ] **Step 2: Run verification and linting on Batch 1**
      Run: `pnpm nx run-many -t lint --projects=badge,card,separator,skeleton,kbd,label,avatar`
      Expected: PASS

- [ ] **Step 3: Commit Batch 1**
    ```bash
    git add libs/ui/badge/ libs/ui/card/ libs/ui/separator/ libs/ui/skeleton/ libs/ui/kbd/ libs/ui/label/ libs/ui/avatar/
    git commit -m "feat(ui): ✨ standardize storybook autodocs for presentational primitives batch 1"
    ```

---

### Task 4: Batch 2 — Interactive Single-Directive & Form Primitives (6 Components)

**Files:**

- Modify: `libs/ui/input/src/lib/hlm-input.stories.ts`
- Modify: `libs/ui/textarea/src/lib/hlm-textarea.stories.ts`
- Modify: `libs/ui/switch/src/lib/hlm-switch.stories.ts`
- Modify: `libs/ui/slider/src/lib/hlm-slider.stories.ts`
- Modify: `libs/ui/toggle/src/lib/hlm-toggle.stories.ts`
- Modify: `libs/ui/spinner/src/lib/hlm-spinner.stories.ts`

**Specifications per primitive:**

- **`Input`**: Controls for `type`, `placeholder`, `disabled`, `readonly`, `error`. Stories: `Default`, `WithLabel`, `WithIcon`, `Disabled`, `File`.
- **`Textarea`**: Controls for `placeholder`, `disabled`, `rows`. Stories: `Default`, `WithLabel`, `Disabled`, `Resizable`.
- **`Switch`**: Controls for `checked`, `disabled`. Stories: `Default`, `WithLabel`, `Disabled`, `FormBinding`.
- **`Slider`**: Controls for `value`, `min`, `max`, `step`, `disabled`. Stories: `Default`, `Range`, `Disabled`, `Steps`.
- **`Toggle`**: Controls for `variant` (`default`, `outline`), `size`, `pressed`. Stories: `Default`, `AllVariants`, `AllSizes`, `Disabled`.
- **`Spinner`**: Controls for `size` (`xs`, `sm`, `default`, `lg`), `class`. Stories: `Default`, `AllSizes`, `WithButton`, `ColorVariants`.

- [ ] **Step 1: Implement Batch 2 stories and argTypes**
      Update each story file with typed `StoryArgs`, categorized `argTypes`, and full story matrix.

- [ ] **Step 2: Run verification and linting on Batch 2**
      Run: `pnpm nx run-many -t lint --projects=input,textarea,switch,slider,toggle,spinner`
      Expected: PASS

- [ ] **Step 3: Commit Batch 2**
    ```bash
    git add libs/ui/input/ libs/ui/textarea/ libs/ui/switch/ libs/ui/slider/ libs/ui/toggle/ libs/ui/spinner/
    git commit -m "feat(ui): ✨ standardize storybook autodocs for form primitives batch 2"
    ```

---

### Task 5: Batch 3 — Compound & Selection Primitives (9 Components)

**Files:**

- Modify: `libs/ui/breadcrumb/src/lib/hlm-breadcrumb.stories.ts`
- Modify: `libs/ui/checkbox/src/lib/hlm-checkbox.stories.ts`
- Modify: `libs/ui/collapsible/src/lib/hlm-collapsible.stories.ts`
- Modify: `libs/ui/radio-group/src/lib/hlm-radio-group.stories.ts`
- Modify: `libs/ui/toggle-group/src/lib/hlm-toggle-group.stories.ts`
- Modify: `libs/ui/field/src/lib/hlm-field.stories.ts`
- Modify: `libs/ui/input-otp/src/lib/hlm-input-otp.stories.ts`
- Modify: `libs/ui/tabs/src/lib/hlm-tabs.stories.ts`
- Modify: `libs/ui/accordion/src/lib/hlm-accordion.stories.ts`

**Specifications per primitive:**

- **`Breadcrumb`**: Stories: `Default`, `WithDropdown`, `CustomSeparator`, `Collapsed`.
- **`Checkbox`**: Controls for `checked`, `disabled`, `indeterminate`. Stories: `Default`, `WithText`, `Disabled`, `Indeterminate`.
- **`Collapsible`**: Stories: `Default`, `Disabled`, `CustomTrigger`.
- **`Radio Group`**: Controls for `orientation`, `disabled`. Stories: `Default`, `DisabledItem`, `CardSelection`.
- **`Toggle Group`**: Controls for `type` (`single`, `multiple`), `variant`, `size`. Stories: `Default`, `Single`, `Multiple`, `AllSizes`.
- **`Field`**: Controls for label, hint, error states. Stories: `Default`, `WithError`, `WithHint`, `Disabled`.
- **`Input OTP`**: Controls for `length`, `disabled`. Stories: `Default`, `FourDigits`, `SixDigits`, `WithSeparator`.
- **`Tabs`**: Controls for `orientation`. Stories: `Default`, `Vertical`, `Underlined`, `DisabledTab`.
- **`Accordion`**: Controls for `type` (`single`, `multiple`). Stories: `Default`, `Multiple`, `DisabledItem`.

- [ ] **Step 1: Implement Batch 3 stories and argTypes**
      Update each story file with typed `StoryArgs`, categorized `argTypes`, and full story matrix.

- [ ] **Step 2: Run verification and linting on Batch 3**
      Run: `pnpm nx run-many -t lint --projects=breadcrumb,checkbox,collapsible,radio-group,toggle-group,field,input-otp,tabs,accordion`
      Expected: PASS

- [ ] **Step 3: Commit Batch 3**
    ```bash
    git add libs/ui/breadcrumb/ libs/ui/checkbox/ libs/ui/collapsible/ libs/ui/radio-group/ libs/ui/toggle-group/ libs/ui/field/ libs/ui/input-otp/ libs/ui/tabs/ libs/ui/accordion/
    git commit -m "feat(ui): ✨ standardize storybook autodocs for compound primitives batch 3"
    ```

---

### Task 6: Batch 4 — Overlays, Dialogs & Floating Primitives (9 Components)

**Files:**

- Modify: `libs/ui/dialog/src/lib/hlm-dialog.stories.ts`
- Modify: `libs/ui/alert-dialog/src/lib/hlm-alert-dialog.stories.ts`
- Modify: `libs/ui/alert/src/lib/hlm-alert.stories.ts`
- Modify: `libs/ui/sheet/src/lib/hlm-sheet.stories.ts`
- Modify: `libs/ui/popover/src/lib/hlm-popover.stories.ts`
- Modify: `libs/ui/tooltip/src/lib/hlm-tooltip.stories.ts`
- Modify: `libs/ui/select/src/lib/hlm-select.stories.ts`
- Modify: `libs/ui/dropdown-menu/src/lib/hlm-dropdown-menu.stories.ts`
- Modify: `libs/ui/command/src/lib/hlm-command.stories.ts`

**Specifications per primitive:**

- **`Dialog`**: Stories: `Default`, `CustomContent`, `Scrollable`, `Nested`.
- **`Alert Dialog`**: Stories: `Default`, `DestructiveAction`, `SimpleAlert`.
- **`Alert`**: Controls for `variant` (`default`, `destructive`). Stories: `Default`, `Destructive`, `WithIcon`, `Simple`.
- **`Sheet`**: Controls for `side` (`top`, `bottom`, `left`, `right`). Stories: `Default`, `AllSides`, `WithForm`.
- **`Popover`**: Stories: `Default`, `WithForm`, `Positioning`.
- **`Tooltip`**: Controls for `position` (`top`, `bottom`, `left`, `right`). Stories: `Default`, `AllPositions`, `CustomDelay`.
- **`Select`**: Controls for `placeholder`, `disabled`. Stories: `Default`, `WithGroups`, `Disabled`, `FormBinding`.
- **`Dropdown Menu`**: Stories: `Default`, `WithSubmenus`, `WithCheckboxItems`, `WithRadioGroup`.
- **`Command`**: Stories: `Default`, `InDialog`, `EmptyState`.

- [ ] **Step 1: Implement Batch 4 stories and argTypes**
      Update each story file with typed `StoryArgs`, categorized `argTypes`, and full story matrix.

- [ ] **Step 2: Run verification and linting on Batch 4**
      Run: `pnpm nx run-many -t lint --projects=dialog,alert-dialog,alert,sheet,popover,tooltip,select,dropdown-menu,command`
      Expected: PASS

- [ ] **Step 3: Commit Batch 4**
    ```bash
    git add libs/ui/dialog/ libs/ui/alert-dialog/ libs/ui/alert/ libs/ui/sheet/ libs/ui/popover/ libs/ui/tooltip/ libs/ui/select/ libs/ui/dropdown-menu/ libs/ui/command/
    git commit -m "feat(ui): ✨ standardize storybook autodocs for overlay primitives batch 4"
    ```

---

### Task 7: Comprehensive Workspace Storybook Build & Lint Gates

**Files:**

- Verify: Full workspace repository integrity

- [ ] **Step 1: Execute Storybook production build**
      Run: `pnpm nx run storybook:build-storybook -c ci`
      Expected: Production Storybook bundle built with zero errors in `dist/storybook`.

- [ ] **Step 2: Execute workspace lint and test suites**
      Run: `pnpm nx run-many -t lint test build`
      Expected: All 32 primitives pass lint, test, and build tasks.

- [ ] **Step 3: Run storybook interaction test suite**
      Run: `pnpm nx run storybook:test-storybook` (if devserver active or against static build)
      Expected: All stories render without unhandled errors.

---

## User Review Required

> [!IMPORTANT]
> **Open Architectural Decisions from RFC #82 for User Input:**
>
> 1. **Multi-Part Component Documentation Scope:**
>     - **Option A (Recommended):** Consolidate each compound primitive (e.g. `Dialog`, `Accordion`) into a single root story page with categorized tables (`Inputs (Root)`, `Inputs (Trigger)`, `Slots`).
>     - **Option B:** Split each sub-directive into its own dedicated Storybook story page (increases navigation depth).
> 2. **Icon Provider Integration:**
>     - We propose standardizing on `@ng-icons/lucide` across all `WithIcon` and `Composition` stories to ensure consistent visual aesthetics and reliable automated code synthesis.
> 3. **Execution Strategy:**
>     - Do you want to execute this plan via **Subagent-driven development** (batch-by-batch subagents with isolated review gates) or **Native execution** (sequential in-session implementation)?
