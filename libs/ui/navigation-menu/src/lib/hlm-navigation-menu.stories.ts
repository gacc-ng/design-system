import { ChangeDetectionStrategy, Component } from '@angular/core';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmNavigationMenu, HlmNavigationMenuImports } from '../index';

@Component({
    selector: 'gacc-navigation-menu-demo',
    standalone: true,
    imports: [HlmNavigationMenuImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="flex items-center justify-center p-8">
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
                                <li>
                                    <a
                                        hlmNavigationMenuLink
                                        href="/introduction"
                                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                        <div class="text-sm font-medium leading-none">Introduction</div>
                                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                            Re-usable components built using Spartan NG and Tailwind CSS.
                                        </p>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        hlmNavigationMenuLink
                                        href="/installation"
                                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    >
                                        <div class="text-sm font-medium leading-none">Installation</div>
                                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                            How to install dependencies and structure your app.
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </hlm-navigation-menu-content>
                    </li>
                    <li hlmNavigationMenuItem>
                        <button hlmNavigationMenuTrigger>Components</button>
                        <hlm-navigation-menu-content *hlmNavigationMenuPortal>
                            <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                <li>
                                    <a
                                        hlmNavigationMenuLink
                                        href="/docs/primitives/alert-dialog"
                                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <div class="text-sm font-medium leading-none">Alert Dialog</div>
                                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                            A modal dialog that interrupts the user with important content.
                                        </p>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        hlmNavigationMenuLink
                                        href="/docs/primitives/hover-card"
                                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <div class="text-sm font-medium leading-none">Hover Card</div>
                                        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                            For sighted users to preview content available behind a link.
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </hlm-navigation-menu-content>
                    </li>
                    <li hlmNavigationMenuItem>
                        <a hlmNavigationMenuLink href="/documentation">Documentation</a>
                    </li>
                </ul>
            </nav>
        </div>
    `,
})
class NavigationMenuDemoComponent {}

const meta: Meta = {
    title: 'Overlays/Navigation Menu',
    component: HlmNavigationMenu,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [NavigationMenuDemoComponent],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: '<gacc-navigation-menu-demo />',
    }),
};
