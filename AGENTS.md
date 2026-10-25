<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Project Standards & Conventions

## Package Manager (Strict Requirement)

- **pnpm Exclusively:** This repository strictly uses `pnpm` (`packageManager: pnpm@12.3.4`).
- **Never run `npm` or `yarn`:** Never run `npm install`, `npm i`, `npx` (for local project tasks), or `yarn`.
- Always use `pnpm add`, `pnpm install`, `pnpm exec`, and prefix all nx tasks with `pnpm nx <command>`.
- Never generate or commit `package-lock.json` or `yarn.lock`. Strict dependency isolation (`shamefully-hoist=false`) and scoped routing (`@gacc-ng`) are enforced.

## Language Standards (Mandatory)

- **Strict English Only:** All source code, identifiers, types, comments, docstrings, configuration files, commit messages, PR descriptions, and documentation artifacts within this repository MUST be strictly written in English.
- Never write comments or documentation in Spanish or other languages inside repository files.

## Commit Message Standards (Conventional Commits + Gitmoji)

- **Format:** `<type>(<scope>): <emoji> <description>` or `<type>: <emoji> <description>`.
- The emoji must be placed strictly **after the colon** (e.g. `feat(ui): ✨ add button component` or `chore: 🔧 update dependencies`).
- Allowed types & required emojis:
    - `feat`: `✨`
    - `fix`: `🐛`
    - `docs`: `📝`
    - `style`: `💄`
    - `refactor`: `♻️`
    - `perf`: `⚡`
    - `test`: `✅`
    - `build`: `🏗️`
    - `ci`: `👷`
    - `chore`: `🔧`
    - `revert`: `⏪`

## Git Workflow & Multi-Agent Isolation

- **Trunk-Based Branching:** Never apply changes directly to `main`. Always branch off `origin/main` using `<type>/<kebab-case-name>` (e.g., `feat/avatar-badge`, `fix/tabs-overflow`).
- **Multi-Agent / Concurrent Work Isolation:**
    - When running concurrent tasks, background tasks, or multiple agents/subagents, ALWAYS isolate the workspace using a Git Worktree in `.worktrees/<branch-name>` or native branched workspaces.
    - Never run `git checkout` on the root workspace if another process or uncommitted change is active.
    - Clean up worktrees (`git worktree remove`) after the branch is pushed and PR is created.
- **Pull Request Protocol & Human Merge Gate (Fundamental Rule):**
    - Autonomous agents are fully authorized to branch, commit, push, and open Pull Requests (PRs) freely.
    - **STRICT MERGE PROHIBITION:** Autonomous agents MUST NEVER merge any Pull Request (via `gh pr merge`, `git merge`, or API) without explicit, affirmative human authorization in the current prompt.
    - **Pre-Merge Conflict Validation (Mandatory):**
        - Before requesting human authorization to merge or executing any authorized merge, ALWAYS validate that the branch has NO merge conflicts against the base branch (`origin/main`).
        - Verify conflict status via GitHub CLI (`gh pr view <number> --json mergeable,mergeStateStatus`) or local fetch/merge-base check (`git fetch origin main && git merge-base --is-ancestor origin/main HEAD` or dry-run `git merge --no-commit --no-ff origin/main`).
        - If conflicts or a dirty state exist, resolve them on the feature branch, re-verify CI gates, and confirm a clean mergeable status before proceeding.
    - Always verify CI quality gates on the PR and present the review link to the user.

## Architecture Standards

- **Component Architecture:** Presentational (Dumb Components), Standalone components, OnPush change detection, Zoneless, Signal-based (`input()`, `computed()`, `output()`).

## Governance & Decision Making (RFCs vs. Issues)

- **RFCs & Architecture Proposals (GitHub Discussions):**
    - All architectural proposals, strategic designs, and RFCs MUST be published in **GitHub Discussions** under the **Ideas** category (`id: DIC_kwDOVNy4CM4DJjpk`), NEVER as Pull Requests with markdown files.
    - Always invoke and follow the [`.agents/skills/github-rfc/SKILL.md`](.agents/skills/github-rfc/SKILL.md) skill to draft, structure, and publish RFCs via `gh api graphql`.
- **Actionable Work & Backlog (GitHub Issues):**
    - **GitHub Issues** are strictly reserved for committed, actionable work: reproducible bug fixes, approved features, chore/maintenance tasks, and work units derived from approved RFCs.
    - Never open an Issue for open-ended architectural debate. When implementing an approved RFC, create an Issue linking back to the Discussion (`Derived from RFC #<NUMBER>`).
    - **Mandatory Engineering Structure (DoR, AC, DoD):**
        - Every GitHub Issue created by agents or contributors MUST strictly follow the standard schema defined in [`.agents/skills/github-issue/SKILL.md`](.agents/skills/github-issue/SKILL.md):
            1. **Context & Problem Statement:** Diagnostic background, incident run/log citations, or origin RFC discussion link.
            2. **Architecture & Target Solution:** Technical design, component mapping, and expected architectural shift.
            3. **Definition of Ready (DoR):** Checkable preconditions satisfied before implementation begins (root cause validated, baseline SemVer identified, tooling/permissions confirmed, runtime environment verified).
            4. **Acceptance Criteria (AC):** Numbered, testable, binary-verifiable conditions (`AC-1`, `AC-2`, etc.).
            5. **Implementation Checklist:** Concrete actionable tasks.
            6. **Definition of Done (DoD):** Non-negotiable quality and compliance gates required for PR completion and issue closure (worktree isolation, `pnpm nx format:check`, lint/test/build quality gates, conventional commit + gitmoji without AI attribution, clean mergeable status, and human authorization gate).
            7. **Security & Governance:** DevSecOps impact, branch protection compliance, permissions, or supply-chain considerations.

## Agent Skills Architecture

- **Canonical Shared Skills Hub:** All workspace skills are strictly centralized in [`.agents/skills/`](.agents/skills/). Individual tool harnesses (`.github/`, `.gemini/`, `.codex/`, `.claude/`) retain ONLY their proprietary configuration (workflows, agent definitions, prompts, commands, or plugins), eliminating cross-harness skill duplication.

## Spartan NG Standards & MCP Tools

- **Spartan Architecture:**
    - **Brain Layer (`@spartan-ng/brain/*`):** Headless logic, CDK behaviors, WAI-ARIA states, focus management, and keyboard interactions. Strictly no Tailwind utility classes or styling inside Brain directives.
    - **Helm Layer (`@spartan-ng/helm/*`):** Visual presentation directives using Tailwind CSS, `class-variance-authority` (`cva()`), and `hlm()` merging helper (`clsx` + `tailwind-merge`).
    - **Composition:** Compose Brain logic onto Helm directives using Angular `hostDirectives`.
- **Spartan MCP Tools:** Query the running `@spartan-ng/mcp` server tools (`spartan_components_list`, `spartan_components_get`, `spartan_components_dependencies`, `spartan_docs_get`, `spartan_health_instructions`, `spartan_accessibility_check`) before creating, extending, or debugging UI components.
- **Skill Reference:** Always consult `.agents/skills/spartan-ng/SKILL.md` when building, scaffolding, or styling Spartan-based components.
