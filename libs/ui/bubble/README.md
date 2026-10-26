# @gacc-ng/ui/bubble

Chat bubble container with sender/assistant variants, alignment, and reaction badge positioning.

## Installation & Setup

```typescript
import { HlmBubbleImports } from '@gacc-ng/ui/bubble';
```

## Features

- Flexible variants: `default`, `secondary`, `muted`, `tinted`, `outline`, `ghost`, and `destructive`.
- Message alignment: `start` (assistant) or `end` (user).
- Reaction chips (`hlmBubbleReactions`) with configurable `side` (`top` / `bottom`) and `align` (`start` / `end`).
- Group container (`hlmBubbleGroup`) for continuous message streams.

## Usage

```html
<div hlmBubble align="end">
    <div hlmBubbleContent>Hello! Can you help me fix this bug?</div>
</div>

<div hlmBubbleGroup>
    <div hlmBubble variant="muted">
        <div hlmBubbleContent>Sure! Could you provide the error stack trace?</div>
        <div hlmBubbleReactions>
            <span>👍</span>
        </div>
    </div>
</div>
```
