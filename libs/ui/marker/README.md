# @gacc-ng/ui/marker

Milestone and timeline marker for conversational step progression, compaction separators, and task status pins.

## Installation & Setup

```typescript
import { HlmMarkerImports } from '@gacc-ng/ui/marker';
```

## Features

- Variants: `default`, `separator` (with horizontal dividing rule), `border` (timeline margin).
- Statuses: `idle`, `running`, `success`, `error`, `warning`.
- Semantic slots: `hlmMarker`, `hlmMarkerIcon`, `hlmMarkerContent`.

## Usage

```html
<!-- Separator Compaction Marker -->
<div hlmMarker variant="separator" status="idle">
    <div hlmMarkerContent>
        <span>Earlier messages compacted</span>
    </div>
</div>

<!-- Step Progress Marker -->
<div hlmMarker variant="default" status="running">
    <div hlmMarkerIcon>●</div>
    <div hlmMarkerContent>Generating unit tests...</div>
</div>
```
