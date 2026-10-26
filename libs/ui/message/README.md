# @gacc-ng/ui/message

Structured chat message container with avatar, header, content, and footer alignment.

## Installation & Setup

```typescript
import { HlmMessageImports } from '@gacc-ng/ui/message';
```

## Features

- Dynamic alignment: `start` (assistant) or `end` (user, reverses layout flow).
- Semantic slots: `hlmMessageAvatar`, `hlmMessageHeader`, `hlmMessageContent`, `hlmMessageFooter`.
- Group container (`hlmMessageGroup`) for continuous message streams.

## Usage

```html
<div hlmMessage align="start">
    <div hlmMessageAvatar>
        <img src="/avatar.png" alt="Assistant" class="size-8 rounded-full" />
    </div>
    <div hlmMessageContent>
        <div hlmMessageHeader>Assistant</div>
        <div>How can I help you today?</div>
        <div hlmMessageFooter>Just now</div>
    </div>
</div>
```
