# Sonner

An opinionated, stacked toast notification manager, powered by `@spartan-ng/brain/sonner`.

## Usage

Add `<hlm-toaster />` to your application root (e.g. `app.component.html`):

```html
<hlm-toaster />
```

Dispatch toasts from any component or service using `toast`:

```typescript
import { toast } from '@gacc-ng/ui/sonner';

// Default toast
toast('Event has been created');

// Success toast
toast.success('Your changes have been saved');

// Error toast
toast.error('Something went wrong');

// Action toast
toast('File deleted', {
    action: {
        label: 'Undo',
        onClick: () => console.log('Undo delete'),
    },
});
```
