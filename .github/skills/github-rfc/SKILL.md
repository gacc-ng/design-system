---
name: github-rfc
description: 'Trigger: rfc, request for comments, propose architecture, architectural discussion, idea. Author and publish RFCs to GitHub Discussions.'
license: Apache-2.0
metadata:
    author: 'gacc-ng'
    version: '1.0'
---

# GitHub Discussions RFC Workflow

Author, format, and publish Request for Comments (RFCs) for architecture proposals, cross-cutting features, and design decisions into **GitHub Discussions** under the **Ideas** category.

---

## Activation Contract

Activate this skill when:

- The user asks to open, create, author, or propose an RFC.
- An architectural or strategic design decision needs team consensus before implementation.
- Exploring large features, major refactors, or new platform tooling.

Do NOT use this skill for:

- Actionable bug reports or confirmed implementation tasks (use **GitHub Issues** instead).
- Pull requests (RFCs MUST be published as Discussions, never as standalone markdown PRs).

---

## Hard Rules

1. **GitHub Discussions Exclusively:** Never create a branch or Pull Request with `.md` files to open an RFC. Always publish to GitHub Discussions.
2. **Category Target:** Always publish under the **Ideas** category (`id: DIC_kwDOVNy4CM4DJjpk`).
3. **Repository Scope:** Target repository `gacc-ng/design-system` (`id: R_kgDOVNy4CA`).
4. **Language Standard:** The RFC body and title MUST be written strictly in **English**.
5. **Title Format:** Always prefix with `RFC: <concise title>` (e.g., `RFC: Native GitHub code quality & security architecture`).
6. **Required Structure:** Every RFC MUST contain the 4 standard sections:
    - `## Summary`
    - `## Motivation & Context`
    - `## Proposed Architecture & Design`
    - `## Questions for Discussion`
7. **Post-Publication:** Always save the published RFC decision to Engram via `mem_save`.

---

## RFC Markdown Template

```markdown
## Summary

<High-level executive summary: what is proposed, what problem it solves, and target scope.>

## Motivation & Context

<Why this is needed. Current pain points, technical limitations, or downstream benefits. Contrast with existing setup.>

## Proposed Architecture & Design

<Technical specification. Break down mechanisms, components, workflows, diagrams, and tool mapping.>

1. **<Component/Area 1>:** <Detail specification.>
2. **<Component/Area 2>:** <Detail specification.>

## Questions for Discussion

- <Open question 1 on tradeoffs or user preferences.>
- <Open question 2 on defaults or rollout sequencing.>
```

---

## Execution Steps

### 1. Draft the RFC Body

Structure the title and content using the standard template above.

### 2. Publish to GitHub Discussions

Execute the mutation using GitHub CLI (`gh`):

```bash
gh api graphql \
  -f query='
mutation($repositoryId: ID!, $categoryId: ID!, $title: String!, $body: String!) {
  createDiscussion(input: { repositoryId: $repositoryId, categoryId: $categoryId, title: $title, body: $body }) {
    discussion {
      number
      url
      title
    }
  }
}' \
  -F repositoryId="R_kgDOVNy4CA" \
  -F categoryId="DIC_kwDOVNy4CM4DJjpk" \
  -F title="RFC: <Title>" \
  -F body="<Body>"
```

### 3. Record in Engram Persistent Memory

Call `mem_save` with:

- `title`: `Opened RFC: <Title>`
- `type`: `decision`
- `content`: Summary of the RFC, discussion URL, and motivation.

---

## Bridging RFCs to GitHub Issues

Once an RFC achieves team consensus in GitHub Discussions:

1. Do NOT implement speculative work without approval.
2. Create actionable **GitHub Issues** linked back to the Discussion URL.
3. Reference the discussion: `Derived from RFC #<NUMBER> (<URL>).`
4. Formulate acceptance criteria and link pull requests to the issue with `closes #<ISSUE_NUMBER>`.
