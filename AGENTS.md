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

## Architecture Standards

- **Component Architecture:** Presentational (Dumb Components), Standalone components, OnPush change detection, Zoneless, Signal-based (`input()`, `computed()`, `output()`).
