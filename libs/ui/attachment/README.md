# @gacc-ng/ui/attachment

File preview tile with upload state lifecycle, media icon/image preview, and contextual actions.

## Installation & Setup

```typescript
import { HlmAttachmentImports } from '@gacc-ng/ui/attachment';
```

## Features

- State transitions: `idle`, `uploading`, `processing`, `error`, `done`.
- Sizes: `sm`, `default`, `lg`.
- Orientations: `horizontal`, `vertical`.
- Semantic sub-directives: `HlmAttachmentMedia`, `HlmAttachmentContent`, `HlmAttachmentTitle`, `HlmAttachmentDescription`, `HlmAttachmentActions`, `HlmAttachmentAction`.

## Usage

```html
<div hlmAttachmentGroup>
    <div hlmAttachment state="done" size="default">
        <div hlmAttachmentMedia>
            <span>📄</span>
        </div>
        <div hlmAttachmentContent>
            <div hlmAttachmentTitle>architecture-plan.pdf</div>
            <div hlmAttachmentDescription>2.4 MB • Completed</div>
        </div>
        <div hlmAttachmentActions>
            <button hlmAttachmentAction aria-label="Remove">✕</button>
        </div>
    </div>
</div>
```
