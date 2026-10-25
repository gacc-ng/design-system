---
name: github-issue
description: 'Trigger: issue, github issue, create issue, open issue, bug report, feature request. Author and publish high-standard GitHub Issues with DoR, AC, and DoD.'
license: Apache-2.0
metadata:
    author: 'gacc-ng'
    version: '1.0'
---

# GitHub Issues Engineering Standards & Workflow

Author, structure, and publish high-standard, audit-ready **GitHub Issues** for committed work units: reproducible bug fixes, approved feature implementations, chore/maintenance tasks, and actionable work derived from approved RFCs.

---

## Activation Contract

Activate this skill when:

- Creating, authoring, or publishing an actionable task or bug report in GitHub Issues.
- Converting an approved RFC or architecture discussion into actionable backlog issues.
- Planning non-trivial technical work that requires structured traceability before branching.

Do NOT use this skill for:

- Open-ended architectural debates or exploratory proposals without consensus (use [`.agents/skills/github-rfc/SKILL.md`](../github-rfc/SKILL.md) instead).
- Trivial one-line edits or direct typo fixes where an issue is explicitly deemed unnecessary.

---

## Hard Rules

1. **Strict English Only:** All issue titles, descriptions, criteria, and comments MUST be written strictly in **English**.
2. **Actionable Scope:** Issues are reserved strictly for executable work units. Never use issues for open-ended philosophical debates.
3. **Mandatory Schema:** Every GitHub Issue created in this repository MUST contain the 7 standard engineering sections:
    - `## 🎯 Context & Problem Statement`
    - `## 🏗️ Architecture & Target Solution`
    - `## 🚦 Definition of Ready (DoR)`
    - `## 🧪 Acceptance Criteria (AC)`
    - `## 📋 Implementation Checklist`
    - `## ✅ Definition of Done (DoD)`
    - `## 🔒 Security & Governance`
4. **Issue Title Convention:** Format: `<type>(<scope>): <emoji> <short description>` matching Conventional Commits and Gitmoji (e.g. `feat(ui): ✨ implement avatar badge component` or `chore(ci): 🔧 migrate release orchestration to Release Please PR workflow`).
5. **Labels:** Always attach relevant labels (`bug`, `enhancement`, `ci/cd`, `documentation`, `priority: high`, etc.).
6. **RFC Linkage:** If derived from an RFC discussion, explicitly state `Derived from RFC #<NUMBER>` in the Context section and link to the discussion.
7. **Post-Creation:** Record the issue creation and architectural decision to Engram via `mem_save`.

---

## Issue Markdown Template

```markdown
## 🎯 Context & Problem Statement

<Provide clear diagnostic context, root cause, user story, or origin RFC discussion link (e.g. "Derived from RFC #106"). Include incident runs, log citations, or error codes when applicable.>

---

## 🏗️ Architecture & Target Solution

<Explain the technical approach, design patterns, components affected, and how this solution integrates with the monorepo architecture.>

1. **<Key Aspect 1>:** <Specification detail.>
2. **<Key Aspect 2>:** <Specification detail.>

---

## 🚦 Definition of Ready (DoR)

Before implementation begins, ensure the following preconditions are satisfied:

- [ ] **Root Cause / Specification Verified:** <Precondition 1, e.g. root cause reproduced or spec validated.>
- [ ] **Baseline SemVer / Codebase State Identified:** <Precondition 2, e.g. version v0.1.8, branch origin/main clean.>
- [ ] **Dependencies / Tooling Confirmed:** <Precondition 3, e.g. pnpm@12.3.4, required libraries identified.>
- [ ] **Permissions / Tokens Verified:** <Precondition 4, e.g. GitHub Actions tokens, OIDC scopes.>

---

## 🧪 Acceptance Criteria (AC)

- **AC-1 (<Feature/Behavior 1>):** <Testable, binary-verifiable statement of expected behavior.>
- **AC-2 (<Feature/Behavior 2>):** <Testable, binary-verifiable statement of expected behavior.>
- **AC-3 (<Error/Edge Case Handling>):** <Testable condition on error boundaries, fallbacks, or edge cases.>

---

## 📋 Implementation Checklist

- [ ] <Actionable task item 1>
- [ ] <Actionable task item 2>
- [ ] <Actionable task item 3>

---

## ✅ Definition of Done (DoD)

- [ ] Isolated worktree branch (\`<type>/<kebab-name>\`) created from \`origin/main\`.
- [ ] Code formatting verified with \`pnpm nx format:check\` (and formatted via \`pnpm nx format:write\`).
- [ ] All relevant quality gates pass locally and in CI (\`pnpm nx affected -t lint test build\`).
- [ ] Unit and component tests implemented with thorough coverage for new/modified behaviors.
- [ ] Pull Request opened targeting \`origin/main\` with conventional commit title referencing this Issue (#<NUMBER>).
- [ ] Verified that no \`Co-Authored-By\` or AI attribution tags exist in commit messages.
- [ ] Pre-merge conflict check confirms clean, non-conflicting mergeable status against \`origin/main\`.
- [ ] Explicit human authorization obtained before any merge action.

---

## 🔒 Security & Governance

<Detail security impact: DevSecOps checks (CodeQL, Dependency Review), secret handling, permissions required, or compliance with branch protection rulesets.>
```

---

## CLI Execution Command

Create the issue via GitHub CLI (`gh`):

```bash
gh issue create \
  --title "<type>(<scope>): <emoji> <description>" \
  --label "<label1>,<label2>" \
  --body "<Body formatted with the template above>"
```
