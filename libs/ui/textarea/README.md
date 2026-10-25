# @gacc-ng/ui/textarea

Multiline input directive composed on Spartan Brain `BrnTextarea` and synchronized with OKLCH form control tokens.

## Features

- Headless input control behaviors via `@spartan-ng/brain/textarea`.
- Dynamic field sizing (`field-sizing-content`).
- Focus rings and error borders synced to `--ring` and `--destructive`.
- Clean white in light mode, OLED true black (`#000000`) in dark mode.

## Installation / Import

```typescript
import { HlmTextarea, HlmTextareaImports } from '@gacc-ng/ui/textarea';
```

## Usage

```html
<textarea hlmTextarea placeholder="Type your message here..."></textarea>
```
