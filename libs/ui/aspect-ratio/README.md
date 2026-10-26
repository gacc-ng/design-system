# @gacc-ng/ui/aspect-ratio

Aspect ratio surface directive primitive built for responsive media, embedding, and cards using Tailwind CSS modern aspect-ratio variables.

## Installation / Import

```typescript
import { HlmAspectRatio, HlmAspectRatioImports } from '@gacc-ng/ui/aspect-ratio';
```

## Usage

### 16:9 Landscape (Default)

```html
<div class="w-[450px] overflow-hidden rounded-md border">
    <div [hlmAspectRatio]="16 / 9">
        <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop&q=80"
            alt="Showcase image"
            class="size-full object-cover"
        />
    </div>
</div>
```

### String Fraction Format

```html
<div class="w-[300px]">
    <div hlmAspectRatio="16/9">
        <img src="..." alt="Showcase" class="size-full object-cover" />
    </div>
</div>
```

### 1:1 Square

```html
<div class="w-[200px]">
    <div hlmAspectRatio="1/1">
        <img src="..." alt="Square showcase" class="size-full object-cover" />
    </div>
</div>
```

### 9:16 Portrait

```html
<div class="w-[200px]">
    <div hlmAspectRatio="9/16">
        <img src="..." alt="Portrait showcase" class="size-full object-cover" />
    </div>
</div>
```

### 21:9 Ultra-Wide Banner

```html
<div class="w-full max-w-[800px]">
    <div hlmAspectRatio="21/9">
        <img src="..." alt="Banner showcase" class="size-full object-cover" />
    </div>
</div>
```
