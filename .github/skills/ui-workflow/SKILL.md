---
name: ui-workflow
description: "Storybook's workflow for UI changes in a project with Storybook - look up the components to reuse, write and update stories, run story tests, and publish a review of the result. Use when working on UI changes or creating/modifying components."
---

# UI Workflow with Storybook

When making UI changes or adding new primitives to `@gacc-ng/ui`:

1. **Check existing components first:** Use `docs-list` or Spartan MCP `spartan_components_list` before creating a duplicate.
2. **Develop the component:** Follow Spartan NG presentational (Helm) and headless (Brain) separation with signal inputs and OnPush.
3. **Colocate stories:** Add `<component>.stories.ts` next to the component in `libs/ui/<primitive>/src/lib/`.
4. **Visual verification:** Run `pnpm nx run storybook:storybook` and verify component states (default, hover, focus, dark mode).
5. **Accessibility check:** Verify Axe-core rules pass in Storybook's A11y panel.
6. **Automated tests:** Verify interaction tests with `pnpm nx run storybook:test-storybook`.
