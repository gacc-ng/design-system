# @gacc-ng/ui/typography

Semantic prose and typography directives for `@gacc-ng/ui`, bringing Spartan NG typography styling to headings, paragraphs, blockquotes, lists, inline code, and muted elements.

## Installation

```bash
pnpm add @gacc-ng/ui
```

## Import

```typescript
import { HlmTypographyImports } from '@gacc-ng/ui/typography';

// Or individually:
import {
    HlmBlockquote,
    HlmCode,
    HlmH1,
    HlmH2,
    HlmH3,
    HlmH4,
    HlmLarge,
    HlmLead,
    HlmMuted,
    HlmP,
    HlmSmall,
    HlmUl,
} from '@gacc-ng/ui/typography';
```

## Usage

```html
<h1 hlmH1>Taxing Laughter: The Joke Tax Chronicles</h1>
<p hlmLead>A satirical look at modern economic policy and its unintended cultural consequences.</p>
<h2 hlmH2>The People's Response</h2>
<p hlmP>The king ordered laughter to be metered and taxed at every town square.</p>
<blockquote hlmBlockquote>
    "After all," he said, "laughter is a luxury that only the prosperous can truly afford."
</blockquote>
<h3 hlmH3>Summary of Levies</h3>
<ul hlmUl>
    <li>Chuckles: 1 silver crown</li>
    <li>Giggles: 5 copper farthings</li>
    <li>Full-bellied roars: 1 gold sovereign</li>
</ul>
<p hlmP>Execute the tax collection script via <code hlmCode>npm run collect-laughter</code>.</p>
<p hlmMuted>Issued under royal decree #402. All rates subject to change without notice.</p>
```
