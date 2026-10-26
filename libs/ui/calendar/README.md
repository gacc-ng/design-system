# Calendar

An accessible calendar component for Spartan Helm, supporting single date, multi-date, date range, and month-year selection with customizable date adapters.

## Installation

```bash
pnpm add @spartan-ng/brain
```

## Import

```typescript
import { HlmCalendarImports } from '@gacc-ng/ui/calendar';
import { provideNativeDateAdapter } from '@spartan-ng/brain/date-time';

// In application config or component providers:
providers: [provideNativeDateAdapter()];
```
