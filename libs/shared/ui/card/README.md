# @gacc-ng/ui/card

Card visual container primitive with header, title, description, content, action, and footer directives.

## Usage

```html
<hlm-card class="w-full max-w-sm">
    <hlm-card-header>
        <h3 hlmCardTitle>Account Overview</h3>
        <p hlmCardDescription>Manage your workspace subscription and settings</p>
        <div hlmCardAction>
            <button hlmBtn variant="outline" size="sm">Edit</button>
        </div>
    </hlm-card-header>

    <div hlmCardContent>
        <p>Card content goes here.</p>
    </div>

    <hlm-card-footer>
        <button hlmBtn class="w-full">Save Changes</button>
    </hlm-card-footer>
</hlm-card>
```
