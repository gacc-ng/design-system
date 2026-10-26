# @gacc-ng/ui/carousel

A flexible, accessible, swipeable carousel primitive for Angular built on top of [Embla Carousel](https://www.embla-carousel.com/) and Spartan Helm styling.

## Installation & Setup

Install peer dependencies if not already present:

```bash
pnpm add embla-carousel embla-carousel-angular
```

## Features

- Fully responsive touch and swipe interactions.
- Horizontal and vertical orientation support.
- Built-in previous and next trigger controls.
- Keyboard navigation with Left/Right arrow keys.
- Screen-reader accessible slide counter and announce region.
- RTL layout direction awareness.

## Usage

```html
<hlm-carousel class="w-full max-w-xs">
    <hlm-carousel-content>
        <hlm-carousel-item>
            <div class="p-4 bg-muted rounded-lg text-center font-bold">Slide 1</div>
        </hlm-carousel-item>
        <hlm-carousel-item>
            <div class="p-4 bg-muted rounded-lg text-center font-bold">Slide 2</div>
        </hlm-carousel-item>
    </hlm-carousel-content>
    <button hlm-carousel-previous></button>
    <button hlm-carousel-next></button>
</hlm-carousel>
```
