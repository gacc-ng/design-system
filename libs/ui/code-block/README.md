# @gacc-ng/ui/code-block

A syntax-friendly, preformatted code block primitive for Angular with header bar, actions, copy-to-clipboard button, and line-level diff styling.

## Installation & Setup

```typescript
import { HlmCodeBlockImports } from '@gacc-ng/ui/code-block';
```

## Features

- Optional header with filename/title and custom action buttons.
- One-click copy-to-clipboard button with transient feedback state.
- Optional line numbering with customizable starting index (`startLine`).
- Line wrapping toggle (`wrap`).
- Semantic line diff variants (`default`, `added`, `removed`, `highlighted`).
- Destructive and sm styling variants.

## Usage

```html
<hlm-code-block>
    <hlm-code-block-header>
        <hlm-code-block-title>example.ts</hlm-code-block-title>
        <hlm-code-block-actions>
            <button hlmCodeBlockCopyButton [value]="code"></button>
        </hlm-code-block-actions>
    </hlm-code-block-header>
    <pre hlmCodeBlockContent [code]="code" lineNumbers></pre>
</hlm-code-block>
```
