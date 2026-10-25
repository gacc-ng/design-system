---
name: component-docs
description: Look up the components of a project with Storybook, with their props and usage examples, to answer questions about them or to reuse them instead of building duplicates. Use when the project's agent instructions (such as AGENTS.md) or the user ask for it. For a UI change, use ui-workflow, which includes the same component lookup.
---

Prerequisites:

1. Storybook must be installed in the project.
2. The Storybook dev server or MCP server should be active (`pnpm nx run storybook:storybook`).

To inspect components and documentation:

1. Query `docs-list` via Storybook MCP (`http://localhost:4400/mcp`) to retrieve available component IDs and story IDs.
2. Fetch details for a component with `docs-show` passing `{ "id": "<component-id>" }`.
3. Use `docs-show-story` with `{ "storyId": "<story-id>" }` to inspect usage examples and props.
