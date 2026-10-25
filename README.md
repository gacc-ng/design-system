# GACC Design System

> Modern, accessible, and high-performance Angular UI component library powered by Nx, Spartan NG, Tailwind CSS, and Zoneless Signals.

---

## ⚡ Quick Start

### Prerequisites

- **Node.js:** `>= 20.x`
- **pnpm:** `12.3.4` (strictly enforced — do not use `npm` or `yarn`)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/gacc-ng/design-system.git
cd design-system

# Install dependencies
pnpm install

# Start the interactive Showcase application
pnpm nx serve showcase
```

Open [http://localhost:4200](http://localhost:4200) to view the showcase.

---

## 🏗️ Architecture

This repository follows a strict two-layer component architecture based on **Spartan NG**:

| Layer        | Package / Source      | Role & Characteristics                                                                                                             |
| ------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Brain**    | `@spartan-ng/brain/*` | **Headless & Behavioral:** CDK logic, WAI-ARIA states, focus management, and keyboard interactions. Zero styling.                  |
| **Helm**     | `@spartan-ng/helm/*`  | **Presentational & Styled:** Visual presentation directives powered by Tailwind CSS, `cva()` variants, and `hlm()` merging helper. |
| **Showcase** | `apps/showcase`       | Interactive catalog and documentation for validating components across themes and viewports.                                       |

### Component Design Principles

- **Modern Angular:** Standalone components and directives only.
- **Performance:** `ChangeDetectionStrategy.OnPush` with Zoneless signals (`input()`, `computed()`, `output()`).
- **Composition:** Headless Brain primitives are composed onto elements via Angular `hostDirectives`.

---

## 🛠️ Common Commands

All tasks are executed through `pnpm nx`:

| Task           | Command                    | Description                                  |
| -------------- | -------------------------- | -------------------------------------------- |
| **Dev Server** | `pnpm nx serve showcase`   | Run the showcase app locally                 |
| **Build**      | `pnpm nx build showcase`   | Create production bundle for showcase        |
| **Lint**       | `pnpm nx run-many -t lint` | Lint all projects with ESLint 10 flat config |
| **Test**       | `pnpm nx run-many -t test` | Run unit tests via Vitest                    |
| **Format**     | `pnpm prettier --write .`  | Format all files with Prettier               |
| **Graph**      | `pnpm nx graph`            | Visualize monorepo dependency graph          |

---

## 🤖 AI Agent & MCP Integration

This monorepo is fully equipped with MCP servers and specialized skills for Claude Code, Cursor, Codex, Gemini CLI, and Antigravity:

- **Spartan MCP (`@spartan-ng/mcp`):** Query available components, retrieve implementation code, inspect dependencies, and verify accessibility.
    - _Tools:_ `spartan_components_list`, `spartan_components_get`, `spartan_components_dependencies`, `spartan_docs_get`, `spartan_accessibility_check`.
- **Nx MCP (`nx-mcp`):** Monorepo navigation, task execution, and generator inspection.
- **Skills:** Centralized under [`.agents/skills/`](.agents/skills/) as the single source of truth across all agent runtimes (Antigravity, Cursor, Codex, Claude Code, Gemini CLI).

---

## 📋 Contributing & Git Standards

### Branch Protection & Pull Requests

Direct pushes to `main` are strictly blocked. All changes must be proposed via feature branches and Pull Requests:

```bash
git checkout -b feat/your-feature-name
```

### Commit Message Convention (Gitmoji)

Commits must adhere to Conventional Commits with a typed Gitmoji **immediately after the colon**:

Format: `<type>(<scope>): <emoji> <description>` or `<type>: <emoji> <description>`

| Type       | Emoji | Description                              | Example                                        |
| ---------- | :---: | ---------------------------------------- | ---------------------------------------------- |
| `feat`     |  ✨   | New feature or component                 | `feat(ui): ✨ add button directive`            |
| `fix`      |  🐛   | Bug fix                                  | `fix(dialog): 🐛 prevent backdrop scroll leak` |
| `docs`     |  📝   | Documentation only                       | `docs: 📝 update README guide`                 |
| `style`    |  💄   | Code formatting / markup cleanup         | `style: 💄 align tailwind utility order`       |
| `refactor` |  ♻️   | Code refactoring without behavior change | `refactor(ui): ♻️ extract variant helper`      |
| `perf`     |  ⚡   | Performance improvements                 | `perf(showcase): ⚡ optimize bundle chunks`    |
| `test`     |  ✅   | Adding or correcting tests               | `test(showcase): ✅ add vitest test suite`     |
| `build`    |  🏗️   | Build system or dependency updates       | `build: 🏗️ upgrade angular dependencies`       |
| `ci`       |  👷   | CI workflow adjustments                  | `ci: 👷 add concurrency group to workflow`     |
| `chore`    |  🔧   | Tooling, configuration, or chores        | `chore: 🔧 update commitlint rules`            |
| `revert`   |  ⏪   | Reverting a previous commit              | `revert: ⏪ revert commit 1234abc`             |

Git hooks are managed automatically via **Lefthook** (`pre-commit`, `commit-msg`, `pre-push`).

---

## 📄 License

MIT © [gacc-ng](https://github.com/gacc-ng)
