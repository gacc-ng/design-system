# @gacc-ng/ui/message-scroller

Auto-scrolling message container optimized for conversational AI token streaming, scroll anchoring, and scroll-to-bottom indicators.

## Installation & Setup

```typescript
import { HlmMessageScrollerImports } from '@gacc-ng/ui/message-scroller';
```

## Features

- Composed onto `@spartan-ng/brain/message-scroller`.
- Auto-scroll lock behavior that stays pinned to the bottom during live streaming unless scrolled up.
- Smooth transition scroll-to-bottom indicator button.
- Item registration with stable `messageId` for scroll anchoring and history prepending.

## Usage

```html
<div hlmMessageScrollerProvider autoScroll="smooth">
    <div hlmMessageScroller class="h-96">
        <div hlmMessageScrollerViewport>
            <div hlmMessageScrollerContent>
                <div hlmMessageScrollerItem messageId="msg-1">First message</div>
                <div hlmMessageScrollerItem messageId="msg-2">Second message</div>
            </div>
        </div>
        <button hlmMessageScrollerButton aria-label="Scroll to bottom">↓</button>
    </div>
</div>
```
