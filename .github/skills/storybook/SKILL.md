---
name: storybook
description: 'Storybook 10 workflow, story authoring, and MCP tooling for Spartan NG components with Angular and Vite. USE WHEN creating or updating stories, running visual verification, querying the Storybook MCP server, building the Storybook catalog, or auditing accessibility.'
---

# Storybook Architecture & MCP Workflow

This repository uses **Storybook 10** with **`@storybook/angular-vite`**, **`@storybook/addon-a11y`**, and **`@storybook/addon-mcp`** to develop, document, and test UI primitive components for `@gacc-ng/ui`.

---

## 1. Project Architecture & Configuration

- **Host Application:** [`apps/storybook`](file:///apps/storybook)
- **Configuration Entrypoint:** [`apps/storybook/.storybook/main.ts`](file:///apps/storybook/.storybook/main.ts)
- **Preview Decorators & Tokens:** [`apps/storybook/.storybook/preview.ts`](file:///apps/storybook/.storybook/preview.ts)
- **Vite Bundler Config:** [`apps/storybook/vite.config.mts`](file:///apps/storybook/vite.config.mts)
- **Stories Pattern:** Colocated alongside primitives in [`libs/ui/**/*.stories.ts`](file:///libs/ui)

### Core Tasks (Nx CLI)

Always prefix tasks with `pnpm nx`:

```bash
# Start local Storybook development server (port 4400)
pnpm nx run storybook:storybook

# Build static Storybook distribution (Vite/Rolldown production bundle)
pnpm nx run storybook:build-storybook -c ci

# Execute automated story interaction tests with test-runner
pnpm nx run storybook:test-storybook
```

---

## 2. Storybook MCP Server (`@storybook/addon-mcp`)

The project integrates `@storybook/addon-mcp` to expose live component metadata and story capabilities to AI agents via the Model Context Protocol.

### Server Connection

- **Protocol:** HTTP / Server-Sent Events (SSE)
- **Endpoint:** `http://localhost:4400/mcp`
- **Config:** Registered in [`.mcp.json`](file:///.mcp.json) as `"storybook"`

> [!NOTE]
> The Storybook MCP server runs within the Vite development server. To use live Storybook MCP tools, the dev server must be running (`pnpm nx run storybook:storybook`).

### Available MCP Tools

1. **`docs-list`**: Lists all registered components and documentation entries in Storybook.
    - Use `withStoryIds: true` to retrieve story IDs without scanning the filesystem.
2. **`docs-show`**: Retrieves component documentation, prop definitions, and live story examples.
    - Example: `{ "id": "button" }` returns the stories, arguments, and TypeScript types.
3. **`docs-show-story`**: Retrieves the exact code and configuration for a specific story variant (`storyId`).
4. **`stories-preview`**: Returns preview URLs for rendered stories.
    - Call this after modifying component styles, tokens, or templates to review visual changes.
5. **`stories-get-instructions`**: Returns conventions for writing or updating stories for a target component.
6. **`stories-save`**: Updates or creates story code directly in the target story file.
7. **`stories-list-for-component`**: Identifies existing story files that render a specific component.

---

## 3. Story Authoring Standards for Spartan NG Primitives

When creating stories for `@gacc-ng/ui` components:

1. **Standalone & Zoneless:** All primitives are standalone components and directives.
2. **Import Boundaries:** Import primitives directly from `@gacc-ng/ui/<primitive>` or local secondary entry points.
3. **Module Metadata:** Always use `moduleMetadata` to declare required directives, icons, or providers:

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HlmButtonDirective } from './hlm-button.directive';

const meta: Meta = {
    title: 'Primitives/Button',
    decorators: [
        moduleMetadata({
            imports: [HlmButtonDirective],
        }),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon'],
        },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: (args) => ({
        props: args,
        template: `<button hlmBtn [variant]="variant" [size]="size">Button</button>`,
    }),
};
```

---

## 4. Accessibility Testing (`@storybook/addon-a11y`)

Accessibility checks are active on all stories:

- The A11y panel automatically runs axe-core tests on component renders.
- Verify color contrast (WCAG AA/AAA compliance) under both light and dark modes.
- Verify focus rings and keyboard interaction (`Tab`, `Enter`, `Space`, `Escape`).
