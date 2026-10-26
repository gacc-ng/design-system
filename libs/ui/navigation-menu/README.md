# Navigation Menu

A collection of links for navigating websites including multi-column mega-menus, powered by `@spartan-ng/brain/navigation-menu`.

## Usage

```html
<nav hlmNavigationMenu>
    <ul hlmNavigationMenuList>
        <li hlmNavigationMenuItem>
            <button hlmNavigationMenuTrigger>Getting started</button>
            <hlm-navigation-menu-content *hlmNavigationMenuPortal>
                <ul class="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li class="row-span-3">
                        <a
                            hlmNavigationMenuLink
                            href="/"
                            class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                            <div class="mb-2 mt-4 text-lg font-medium">@gacc-ng/ui</div>
                            <p class="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components built with Tailwind CSS and Spartan NG.
                            </p>
                        </a>
                    </li>
                </ul>
            </hlm-navigation-menu-content>
        </li>
        <li hlmNavigationMenuItem>
            <a hlmNavigationMenuLink href="/docs">Documentation</a>
        </li>
    </ul>
</nav>
```
