# @gacc-ng/ui/sidebar

A responsive layout and panel navigation sidebar primitive built for Angular applications with Tailwind CSS. It supports desktop collapse modes (`offcanvas`, `icon` rail), seamless mobile drawer sheet transitions, keyboard shortcuts (`⌘B` / `ctrl+B`), cookie-based state persistence, and multiple surface presentation variants (`sidebar`, `floating`, `inset`).

## Installation / Import

Import `HlmSidebarImports` or individual directives and services from `@gacc-ng/ui/sidebar`:

```typescript
import {
    HlmSidebar,
    HlmSidebarContent,
    HlmSidebarFooter,
    HlmSidebarGroup,
    HlmSidebarGroupAction,
    HlmSidebarGroupContent,
    HlmSidebarGroupLabel,
    HlmSidebarHeader,
    HlmSidebarImports,
    HlmSidebarInput,
    HlmSidebarInset,
    HlmSidebarMenu,
    HlmSidebarMenuAction,
    HlmSidebarMenuBadge,
    HlmSidebarMenuButton,
    HlmSidebarMenuItem,
    HlmSidebarMenuSkeleton,
    HlmSidebarMenuSub,
    HlmSidebarMenuSubButton,
    HlmSidebarMenuSubItem,
    HlmSidebarRail,
    HlmSidebarSeparator,
    HlmSidebarService,
    HlmSidebarTrigger,
    HlmSidebarWrapper,
    provideHlmSidebarConfig,
} from '@gacc-ng/ui/sidebar';
```

## Features

- **Responsive Viewports:** Automatically collapses into an accessible slide-over sheet (`hlm-sheet`) on viewports narrower than the configurable breakpoint (default `768px`).
- **Collapsible Modes:**
    - `icon`: Collapses to an icon rail while exposing tooltips for menu buttons.
    - `offcanvas`: Slides completely offscreen on collapse, expanding full width on toggle.
    - `none`: Static sidebar with non-collapsible layout.
- **Surface Variants:**
    - `sidebar`: Standard full-height column layout with border separation.
    - `floating`: Elevated card container with shadow and surrounding padding.
    - `inset`: Recessed canvas layout where main content area receives rounded borders.
- **State Persistence:** Automatically preserves expanded or collapsed state across page reloads via cookies.
- **Keyboard Shortcut:** Toggles open/close state via `⌘B` (macOS) or `ctrl+B` (Windows/Linux).
- **Interactive Rail:** Draggable/clickable border rail (`hlmSidebarRail`) for toggling and resizing.

## Usage

### Responsive App Shell

```html
<div hlmSidebarWrapper>
    <hlm-sidebar collapsible="icon">
        <div hlmSidebarHeader class="border-b p-3">
            <div class="flex items-center gap-2 font-bold text-sm">
                <span>Acme Corp</span>
            </div>
        </div>

        <div hlmSidebarContent>
            <div hlmSidebarGroup>
                <div class="px-2 py-1">
                    <input hlmSidebarInput placeholder="Search..." />
                </div>
            </div>

            <div hlmSidebarGroup>
                <div hlmSidebarGroupLabel>Platform</div>
                <div hlmSidebarGroupContent>
                    <ul hlmSidebarMenu>
                        <li hlmSidebarMenuItem>
                            <button hlmSidebarMenuButton [isActive]="true" tooltip="Dashboard">
                                <ng-icon name="lucideHome" />
                                <span>Dashboard</span>
                            </button>
                        </li>
                        <li hlmSidebarMenuItem>
                            <button hlmSidebarMenuButton tooltip="Inbox">
                                <ng-icon name="lucideInbox" />
                                <span>Inbox</span>
                                <span hlmSidebarMenuBadge>5</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div hlmSidebarFooter class="border-t p-2">
            <div class="text-xs text-muted-foreground px-2 py-1">User profile</div>
        </div>

        <button hlmSidebarRail></button>
    </hlm-sidebar>

    <main hlmSidebarInset>
        <header class="flex h-14 items-center gap-4 border-b px-4">
            <button hlmSidebarTrigger></button>
            <h1 class="font-semibold text-sm">Dashboard</h1>
        </header>
        <div class="p-6">
            <p>Main application canvas.</p>
        </div>
    </main>
</div>
```

### Global Configuration

Customize sidebar defaults at root level:

```typescript
import { provideHlmSidebarConfig } from '@gacc-ng/ui/sidebar';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHlmSidebarConfig({
            defaultOpen: true,
            sidebarWidth: '16rem',
            sidebarWidthMobile: '18rem',
            sidebarWidthIcon: '3rem',
            sidebarCookieName: 'sidebar_state',
            sidebarCookieMaxAge: 60 * 60 * 24 * 7,
            sidebarKeyboardShortcut: 'b',
            mobileBreakpoint: '768px',
            closeMobileSidebarOnMenuButtonClick: false,
        }),
    ],
};
```

## API Reference

### `HlmSidebar` (`hlm-sidebar`)

| Input                    | Type                                 | Default                          | Description                                 |
| :----------------------- | :----------------------------------- | :------------------------------- | :------------------------------------------ |
| `collapsible`            | `'offcanvas' \| 'icon' \| 'none'`    | `'offcanvas'`                    | Collapse behavior on desktop.               |
| `side`                   | `'left' \| 'right'`                  | `'left'`                         | Sidebar alignment edge.                     |
| `variant`                | `'sidebar' \| 'floating' \| 'inset'` | `'sidebar'`                      | Visual presentation style.                  |
| `sidebarWidthMobile`     | `string`                             | `'18rem'`                        | Width of the mobile drawer sheet.           |
| `srOnlySheetTitle`       | `string`                             | `'Sidebar'`                      | Accessibility title for mobile sheet.       |
| `srOnlySheetDescription` | `string`                             | `'Displays the mobile sidebar.'` | Accessibility description for mobile sheet. |

### `HlmSidebarService`

| Signal / Method                       | Type                                | Description                                             |
| :------------------------------------ | :---------------------------------- | :------------------------------------------------------ |
| `open`                                | `Signal<boolean>`                   | Current desktop open state.                             |
| `openMobile`                          | `Signal<boolean>`                   | Current mobile sheet open state.                        |
| `isMobile`                            | `Signal<boolean>`                   | Whether active viewport matches mobile media query.     |
| `variant`                             | `Signal<SidebarVariant>`            | Current visual presentation variant.                    |
| `state`                               | `Signal<'expanded' \| 'collapsed'>` | Computed desktop collapse state.                        |
| `setOpen(open: boolean)`              | `void`                              | Sets desktop open state and writes cookie.              |
| `setOpenMobile(open: boolean)`        | `void`                              | Sets mobile sheet open state.                           |
| `setVariant(variant: SidebarVariant)` | `void`                              | Sets visual presentation style.                         |
| `toggleSidebar()`                     | `void`                              | Toggles mobile sheet (if mobile) or desktop open state. |
