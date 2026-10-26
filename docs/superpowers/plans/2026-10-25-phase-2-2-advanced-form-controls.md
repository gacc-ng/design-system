# Phase 2.2 Advanced Form Controls and Pickers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement and integrate the 7 Phase 2.2 Spartan UI components (`button-group`, `input-group`, `native-select`, `combobox`, `autocomplete`, `calendar`, `date-picker`) into `@gacc-ng/ui` with full Storybook CSF3 autodocs, unit test coverage, and barrel exports.

**Architecture:** Standalone Angular 22 components and directives combining Spartan Brain (`@spartan-ng/brain/*`) headless behaviors with Helm presentation directives styled via Tailwind CSS, `class-variance-authority`, and `classes()` / `hlm()` utilities under `OnPush` change detection and signal inputs.

**Tech Stack:** Angular 22, Spartan NG (`@spartan-ng/brain`, `@spartan-ng/helm`), Tailwind CSS v4, Storybook 10 (`@storybook/angular-vite`), Vitest, Nx Monorepo.

**Spec:** [GitHub Issue #128](https://github.com/gacc-ng/design-system/issues/128) derived from [RFC #126](https://github.com/gacc-ng/design-system/discussions/126).

## Global Constraints

- Strictly `pnpm` (`packageManager: pnpm@12.3.4`); never invoke `npm` or `yarn`.
- Strictly English for all code, identifiers, types, comments, docstrings, commits, and PR descriptions.
- Conventional Commits + Gitmoji format: `<type>(<scope>): <emoji> <description>` without AI attribution or "Co-Authored-By".
- Standalone components/directives with `ChangeDetectionStrategy.OnPush` and signal-based inputs (`input()`, `computed()`, `output()`, `linkedSignal()`).
- Universal barrel exports: each component must export a canonical `Hlm<Name>Imports` tuple and be mapped in `tsconfig.base.json` and `libs/ui/src/index.ts`.
- Quality gates: `pnpm run format:check`, `pnpm nx run-many -t lint test`, and `pnpm nx run storybook:build-storybook -c ci` must pass with 0 errors.

## Review Focus

- Combobox & Autocomplete keyboard interactions: ArrowDown, ArrowUp, Enter to select, Escape to close, focus preservation on input.
- Input Group focus & invalid states: `ring-ring` and `border-destructive` ring styles apply cleanly around the entire group wrapper when the inner input receives focus or validation errors.
- Native Select form integration: ControlValueAccessor (`writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`) binds smoothly with reactive forms and signal inputs.
- Calendar & Date Picker date formatting: `provideNativeDateAdapter()` handles date math without timezone drift or NaN errors on manual text entry.
- Storybook CSF3 argTypes & providers: Storybook stories provide required environment providers (e.g. `applicationConfig({ providers: [provideNativeDateAdapter()] })`) to avoid `NG0207` injector errors.

---

### Task 1: Scaffolding Workspace & Branch Setup

**Files:**

- Create: branch `feat/phase-2-2-advanced-form-controls`

- [ ] **Step 1:** Create and switch to feature branch `feat/phase-2-2-advanced-form-controls` off `origin/main`.
- [ ] **Step 2:** Verify clean working tree with `git status`.

---

### Task 2: Implement `button-group` Component

**Files:**

- Create: `libs/ui/button-group/ng-package.json`
- Create: `libs/ui/button-group/README.md`
- Create: `libs/ui/button-group/src/index.ts`
- Create: `libs/ui/button-group/src/lib/hlm-button-group.ts`
- Create: `libs/ui/button-group/src/lib/hlm-button-group-separator.ts`
- Create: `libs/ui/button-group/src/lib/hlm-button-group-text.ts`
- Create: `libs/ui/button-group/src/lib/hlm-button-group.spec.ts`
- Create: `libs/ui/button-group/src/lib/hlm-button-group.stories.ts`
- Modify: `tsconfig.base.json` (add `@gacc-ng/ui/button-group` path)

- [ ] **Step 1:** Create `libs/ui/button-group/ng-package.json` pointing to `src/index.ts`.
- [ ] **Step 2:** Write failing unit test in `libs/ui/button-group/src/lib/hlm-button-group.spec.ts`.
- [ ] **Step 3:** Implement `HlmButtonGroup`, `HlmButtonGroupSeparator`, `HlmButtonGroupText`, and export `HlmButtonGroupImports`.
- [ ] **Step 4:** Run tests: `pnpm nx test ui --testFile=hlm-button-group.spec.ts` to verify pass.
- [ ] **Step 5:** Create CSF3 stories in `hlm-button-group.stories.ts` under `Forms/Button Group` with Horizontal, Vertical, WithSeparator, and Split variants.
- [ ] **Step 6:** Commit work unit: `feat(ui): ✨ implement button-group component (Phase 2.2)`.

---

### Task 3: Implement `input-group` Component

**Files:**

- Create: `libs/ui/input-group/ng-package.json`
- Create: `libs/ui/input-group/README.md`
- Create: `libs/ui/input-group/src/index.ts`
- Create: `libs/ui/input-group/src/lib/hlm-input-group.ts`
- Create: `libs/ui/input-group/src/lib/hlm-input-group-addon.ts`
- Create: `libs/ui/input-group/src/lib/hlm-input-group-button.ts`
- Create: `libs/ui/input-group/src/lib/hlm-input-group-input.ts`
- Create: `libs/ui/input-group/src/lib/hlm-input-group-text.ts`
- Create: `libs/ui/input-group/src/lib/hlm-input-group-textarea.ts`
- Create: `libs/ui/input-group/src/lib/hlm-input-group.spec.ts`
- Create: `libs/ui/input-group/src/lib/hlm-input-group.stories.ts`
- Modify: `tsconfig.base.json` (add `@gacc-ng/ui/input-group` path)

- [ ] **Step 1:** Create `libs/ui/input-group/ng-package.json`.
- [ ] **Step 2:** Write failing unit test in `libs/ui/input-group/src/lib/hlm-input-group.spec.ts`.
- [ ] **Step 3:** Implement `HlmInputGroup`, `HlmInputGroupAddon`, `HlmInputGroupButton`, `HlmInputGroupInput`, `HlmInputGroupText`, `HlmInputGroupTextarea`, and export `HlmInputGroupImports`.
- [ ] **Step 4:** Run tests: `pnpm nx test ui --testFile=hlm-input-group.spec.ts` to verify pass.
- [ ] **Step 5:** Create CSF3 stories in `hlm-input-group.stories.ts` under `Forms/Input Group` covering search addons, icon buttons, and text prefixes/suffixes.
- [ ] **Step 6:** Commit work unit: `feat(ui): ✨ implement input-group component (Phase 2.2)`.

---

### Task 4: Implement `native-select` Component

**Files:**

- Create: `libs/ui/native-select/ng-package.json`
- Create: `libs/ui/native-select/README.md`
- Create: `libs/ui/native-select/src/index.ts`
- Create: `libs/ui/native-select/src/lib/hlm-native-select.ts`
- Create: `libs/ui/native-select/src/lib/hlm-native-select-option.ts`
- Create: `libs/ui/native-select/src/lib/hlm-native-select-optgroup.ts`
- Create: `libs/ui/native-select/src/lib/hlm-native-select.spec.ts`
- Create: `libs/ui/native-select/src/lib/hlm-native-select.stories.ts`
- Modify: `tsconfig.base.json` (add `@gacc-ng/ui/native-select` path)

- [ ] **Step 1:** Create `libs/ui/native-select/ng-package.json`.
- [ ] **Step 2:** Write failing unit test in `libs/ui/native-select/src/lib/hlm-native-select.spec.ts` testing ControlValueAccessor binding.
- [ ] **Step 3:** Implement `HlmNativeSelect`, `HlmNativeSelectOption`, `HlmNativeSelectOptGroup`, and export `HlmNativeSelectImports`.
- [ ] **Step 4:** Run tests: `pnpm nx test ui --testFile=hlm-native-select.spec.ts` to verify pass.
- [ ] **Step 5:** Create CSF3 stories in `hlm-native-select.stories.ts` under `Forms/Native Select` with sizes (`sm`, `default`), disabled, and invalid states.
- [ ] **Step 6:** Commit work unit: `feat(ui): ✨ implement native-select component (Phase 2.2)`.

---

### Task 5: Implement `combobox` Component

**Files:**

- Create: `libs/ui/combobox/ng-package.json`
- Create: `libs/ui/combobox/README.md`
- Create: `libs/ui/combobox/src/index.ts`
- Create: `libs/ui/combobox/src/lib/hlm-combobox.ts`
- Create: `libs/ui/combobox/src/lib/hlm-combobox-input.ts`
- Create: `libs/ui/combobox/src/lib/hlm-combobox-content.ts`
- Create: `libs/ui/combobox/src/lib/hlm-combobox-item.ts`
- Create: `libs/ui/combobox/src/lib/hlm-combobox-list.ts`
- Create: `libs/ui/combobox/src/lib/hlm-combobox-trigger.ts`
- Create: `libs/ui/combobox/src/lib/hlm-combobox-chips.ts`
- Create: `libs/ui/combobox/src/lib/hlm-combobox.spec.ts`
- Create: `libs/ui/combobox/src/lib/hlm-combobox.stories.ts`
- Modify: `tsconfig.base.json` (add `@gacc-ng/ui/combobox` path)

- [ ] **Step 1:** Create `libs/ui/combobox/ng-package.json`.
- [ ] **Step 2:** Write failing unit test in `libs/ui/combobox/src/lib/hlm-combobox.spec.ts`.
- [ ] **Step 3:** Implement `HlmCombobox` directives, components, and export `HlmComboboxImports`.
- [ ] **Step 4:** Run tests: `pnpm nx test ui --testFile=hlm-combobox.spec.ts` to verify pass.
- [ ] **Step 5:** Create CSF3 stories in `hlm-combobox.stories.ts` under `Forms/Combobox` with Single Select, Trigger variant, Multi Select, and Disabled.
- [ ] **Step 6:** Commit work unit: `feat(ui): ✨ implement combobox component (Phase 2.2)`.

---

### Task 6: Implement `autocomplete` Component

**Files:**

- Create: `libs/ui/autocomplete/ng-package.json`
- Create: `libs/ui/autocomplete/README.md`
- Create: `libs/ui/autocomplete/src/index.ts`
- Create: `libs/ui/autocomplete/src/lib/hlm-autocomplete.ts`
- Create: `libs/ui/autocomplete/src/lib/hlm-autocomplete-input.ts`
- Create: `libs/ui/autocomplete/src/lib/hlm-autocomplete-content.ts`
- Create: `libs/ui/autocomplete/src/lib/hlm-autocomplete-item.ts`
- Create: `libs/ui/autocomplete/src/lib/hlm-autocomplete-list.ts`
- Create: `libs/ui/autocomplete/src/lib/hlm-autocomplete.spec.ts`
- Create: `libs/ui/autocomplete/src/lib/hlm-autocomplete.stories.ts`
- Modify: `tsconfig.base.json` (add `@gacc-ng/ui/autocomplete` path)

- [ ] **Step 1:** Create `libs/ui/autocomplete/ng-package.json`.
- [ ] **Step 2:** Write failing unit test in `libs/ui/autocomplete/src/lib/hlm-autocomplete.spec.ts`.
- [ ] **Step 3:** Implement `HlmAutocomplete` directives, components, and export `HlmAutocompleteImports`.
- [ ] **Step 4:** Run tests: `pnpm nx test ui --testFile=hlm-autocomplete.spec.ts` to verify pass.
- [ ] **Step 5:** Create CSF3 stories in `hlm-autocomplete.stories.ts` under `Forms/Autocomplete` with synchronous filtering and search clear triggers.
- [ ] **Step 6:** Commit work unit: `feat(ui): ✨ implement autocomplete component (Phase 2.2)`.

---

### Task 7: Implement `calendar` Component

**Files:**

- Create: `libs/ui/calendar/ng-package.json`
- Create: `libs/ui/calendar/README.md`
- Create: `libs/ui/calendar/src/index.ts`
- Create: `libs/ui/calendar/src/lib/hlm-calendar.ts`
- Create: `libs/ui/calendar/src/lib/hlm-calendar-multi.ts`
- Create: `libs/ui/calendar/src/lib/hlm-calendar-range.ts`
- Create: `libs/ui/calendar/src/lib/hlm-month-year-calendar.ts`
- Create: `libs/ui/calendar/src/lib/hlm-calendar.spec.ts`
- Create: `libs/ui/calendar/src/lib/hlm-calendar.stories.ts`
- Modify: `tsconfig.base.json` (add `@gacc-ng/ui/calendar` path)

- [ ] **Step 1:** Create `libs/ui/calendar/ng-package.json`.
- [ ] **Step 2:** Write failing unit test in `libs/ui/calendar/src/lib/hlm-calendar.spec.ts`.
- [ ] **Step 3:** Implement `HlmCalendar`, `HlmCalendarMulti`, `HlmCalendarRange`, `HlmMonthYearCalendar`, and export `HlmCalendarImports`.
- [ ] **Step 4:** Run tests: `pnpm nx test ui --testFile=hlm-calendar.spec.ts` to verify pass.
- [ ] **Step 5:** Create CSF3 stories in `hlm-calendar.stories.ts` under `Forms/Calendar` with Single Date, Date Range, Multiple Dates, and Dropdown Navigation. Provide `provideNativeDateAdapter()` in `applicationConfig`.
- [ ] **Step 6:** Commit work unit: `feat(ui): ✨ implement calendar component (Phase 2.2)`.

---

### Task 8: Implement `date-picker` Component

**Files:**

- Create: `libs/ui/date-picker/ng-package.json`
- Create: `libs/ui/date-picker/README.md`
- Create: `libs/ui/date-picker/src/index.ts`
- Create: `libs/ui/date-picker/src/lib/hlm-date-picker.ts`
- Create: `libs/ui/date-picker/src/lib/hlm-date-picker-trigger.ts`
- Create: `libs/ui/date-picker/src/lib/hlm-date-picker-input.ts`
- Create: `libs/ui/date-picker/src/lib/hlm-date-range-input.ts`
- Create: `libs/ui/date-picker/src/lib/hlm-date-multi-input.ts`
- Create: `libs/ui/date-picker/src/lib/hlm-date-picker.spec.ts`
- Create: `libs/ui/date-picker/src/lib/hlm-date-picker.stories.ts`
- Modify: `tsconfig.base.json` (add `@gacc-ng/ui/date-picker` path)

- [ ] **Step 1:** Create `libs/ui/date-picker/ng-package.json`.
- [ ] **Step 2:** Write failing unit test in `libs/ui/date-picker/src/lib/hlm-date-picker.spec.ts`.
- [ ] **Step 3:** Implement `HlmDatePicker`, `HlmDatePickerTrigger`, `HlmDatePickerInput`, `HlmDateRangeInput`, `HlmDateMultiInput`, and export `HlmDatePickerImports`.
- [ ] **Step 4:** Run tests: `pnpm nx test ui --testFile=hlm-date-picker.spec.ts` to verify pass.
- [ ] **Step 5:** Create CSF3 stories in `hlm-date-picker.stories.ts` under `Forms/Date Picker` with Popover Trigger, Input typing, Range picker, and Form binding.
- [ ] **Step 6:** Commit work unit: `feat(ui): ✨ implement date-picker component (Phase 2.2)`.

---

### Task 9: Universal Barrels & Workspace Integration Verification

**Files:**

- Modify: `libs/ui/src/index.ts` (export all 7 new entry points)
- Modify: `libs/ui/src/barrels.spec.ts` (register and test the 7 new barrels)
- Modify: `libs/ui/README.md` (document newly available form controls)

- [ ] **Step 1:** Export all 7 components from root `libs/ui/src/index.ts`.
- [ ] **Step 2:** Register the 7 barrels in `libs/ui/src/barrels.spec.ts` and verify with `pnpm nx test ui --testFile=barrels.spec.ts`.
- [ ] **Step 3:** Update `libs/ui/README.md` catalog table.
- [ ] **Step 4:** Run full quality gates: `pnpm run format:check`, `pnpm nx run-many -t lint test`, `pnpm nx run storybook:build-storybook -c ci`.
- [ ] **Step 5:** Commit work unit: `feat(ui): ✨ register Phase 2.2 barrels and documentation`.

---

### Task 10: Pull Request & Pre-Merge Validation

- [ ] **Step 1:** Push branch `feat/phase-2-2-advanced-form-controls` to `origin`.
- [ ] **Step 2:** Create Pull Request linking Issue #128.
- [ ] **Step 3:** Verify CI checks on GitHub Actions and ensure clean mergeable status without conflicts.
- [ ] **Step 4:** Request human authorization to merge.
