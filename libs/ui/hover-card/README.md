# Hover Card

For sighted users to preview content available behind a link, powered by `@spartan-ng/brain/hover-card`.

## Usage

```html
<hlm-hover-card>
    <button hlmBtn variant="link" hlmHoverCardTrigger>@angular</button>
    <hlm-hover-card-content *hlmHoverCardPortal class="w-80">
        <div class="flex justify-between space-x-4">
            <div class="space-y-1">
                <h4 class="text-sm font-semibold">@angular</h4>
                <p class="text-sm">The modern web developer's platform.</p>
            </div>
        </div>
    </hlm-hover-card-content>
</hlm-hover-card>
```
