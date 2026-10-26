import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    lucideCalendar,
    lucideChevronRight,
    lucideHome,
    lucideInbox,
    lucidePanelLeft,
    lucideSearch,
    lucideSettings,
} from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmButton } from '@gacc-ng/ui/button';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmSeparator } from '@gacc-ng/ui/separator';

import { HlmSidebarImports } from '../index';

import { HlmSidebar } from './hlm-sidebar.component';

const meta: Meta = {
    title: 'Layout/Sidebar',
    component: HlmSidebar,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmSidebarImports, HlmButton, HlmInput, HlmSeparator, NgIcon],
            providers: [
                provideIcons({
                    lucideHome,
                    lucideInbox,
                    lucideCalendar,
                    lucideSettings,
                    lucideSearch,
                    lucidePanelLeft,
                    lucideChevronRight,
                }),
            ],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const DefaultAppShell: Story = {
    render: () => ({
        template: `
            <div hlmSidebarWrapper class="min-h-[600px] border rounded-lg overflow-hidden bg-background">
                <hlm-sidebar>
                    <div hlmSidebarHeader class="border-b px-3 py-2 flex items-center justify-between">
                        <div class="flex items-center gap-2 font-semibold text-sm">
                            <span class="size-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">G</span>
                            <span>Acme Dashboard</span>
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
                                        <button hlmSidebarMenuButton [isActive]="true">
                                            <ng-icon name="lucideHome" />
                                            <span>Dashboard</span>
                                        </button>
                                    </li>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton>
                                            <ng-icon name="lucideInbox" />
                                            <span>Inbox</span>
                                            <span hlmSidebarMenuBadge>12</span>
                                        </button>
                                    </li>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton>
                                            <ng-icon name="lucideCalendar" />
                                            <span>Calendar</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div hlmSidebarGroup>
                            <div hlmSidebarGroupLabel>Preferences</div>
                            <div hlmSidebarGroupContent>
                                <ul hlmSidebarMenu>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton>
                                            <ng-icon name="lucideSettings" />
                                            <span>Settings</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div hlmSidebarFooter class="border-t p-2">
                        <div class="flex items-center gap-2 px-2 py-1.5 text-xs text-muted-foreground">
                            <span>Logged in as <strong>admin@acme.inc</strong></span>
                        </div>
                    </div>
                    <button hlmSidebarRail>
                        <span class="sr-only">Toggle Rail</span>
                    </button>
                </hlm-sidebar>

                <main hlmSidebarInset class="flex flex-col flex-1">
                    <header class="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px]">
                        <button hlmSidebarTrigger></button>
                        <hlm-separator orientation="vertical" class="h-6" />
                        <h1 class="font-semibold text-base">Dashboard Overview</h1>
                    </header>
                    <div class="flex-1 p-6 space-y-4">
                        <div class="grid gap-4 md:grid-cols-3">
                            <div class="rounded-xl border bg-card p-6 shadow-sm">
                                <div class="text-sm font-medium text-muted-foreground">Total Revenue</div>
                                <div class="text-2xl font-bold mt-2">$45,231.89</div>
                            </div>
                            <div class="rounded-xl border bg-card p-6 shadow-sm">
                                <div class="text-sm font-medium text-muted-foreground">Active Subscriptions</div>
                                <div class="text-2xl font-bold mt-2">+2,350</div>
                            </div>
                            <div class="rounded-xl border bg-card p-6 shadow-sm">
                                <div class="text-sm font-medium text-muted-foreground">Monthly Sales</div>
                                <div class="text-2xl font-bold mt-2">+12,234</div>
                            </div>
                        </div>
                        <div class="rounded-xl border bg-card p-6 min-h-[300px] flex items-center justify-center text-muted-foreground">
                            Main content area
                        </div>
                    </div>
                </main>
            </div>
        `,
    }),
};

export const InsetVariant: Story = {
    render: () => ({
        template: `
            <div hlmSidebarWrapper class="min-h-[500px] border rounded-lg overflow-hidden bg-sidebar">
                <hlm-sidebar variant="inset">
                    <div hlmSidebarHeader class="p-3">
                        <span class="font-bold text-sm">Enterprise Workspace</span>
                    </div>
                    <div hlmSidebarContent>
                        <div hlmSidebarGroup>
                            <div hlmSidebarGroupLabel>Navigation</div>
                            <div hlmSidebarGroupContent>
                                <ul hlmSidebarMenu>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton [isActive]="true">
                                            <ng-icon name="lucideHome" />
                                            <span>Overview</span>
                                        </button>
                                    </li>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton>
                                            <ng-icon name="lucideInbox" />
                                            <span>Messages</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button hlmSidebarRail>
                        <span class="sr-only">Toggle Rail</span>
                    </button>
                </hlm-sidebar>
                <main hlmSidebarInset class="p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <button hlmSidebarTrigger></button>
                        <h2 class="text-lg font-semibold">Inset Surface Layout</h2>
                    </div>
                    <p class="text-sm text-muted-foreground">
                        Inset variant renders with curved borders and outer margin, creating a recessed canvas appearance.
                    </p>
                </main>
            </div>
        `,
    }),
};

export const FloatingVariant: Story = {
    render: () => ({
        template: `
            <div hlmSidebarWrapper class="min-h-[500px] border rounded-lg overflow-hidden bg-muted/40 p-2">
                <hlm-sidebar variant="floating">
                    <div hlmSidebarHeader class="p-3">
                        <span class="font-bold text-sm">Floating Hub</span>
                    </div>
                    <div hlmSidebarContent>
                        <div hlmSidebarGroup>
                            <div hlmSidebarGroupLabel>Menu</div>
                            <div hlmSidebarGroupContent>
                                <ul hlmSidebarMenu>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton [isActive]="true">
                                            <ng-icon name="lucideHome" />
                                            <span>Home</span>
                                        </button>
                                    </li>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton>
                                            <ng-icon name="lucideSettings" />
                                            <span>Settings</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button hlmSidebarRail>
                        <span class="sr-only">Toggle Rail</span>
                    </button>
                </hlm-sidebar>
                <main hlmSidebarInset class="p-6 rounded-lg bg-background border shadow-xs">
                    <div class="flex items-center gap-3 mb-4">
                        <button hlmSidebarTrigger></button>
                        <h2 class="text-lg font-semibold">Floating Sidebar Style</h2>
                    </div>
                    <p class="text-sm text-muted-foreground">
                        Floating variant gives the sidebar floating elevation with card border and soft shadows.
                    </p>
                </main>
            </div>
        `,
    }),
};

export const CollapsibleIconRail: Story = {
    render: () => ({
        template: `
            <div hlmSidebarWrapper class="min-h-[500px] border rounded-lg overflow-hidden bg-background">
                <hlm-sidebar collapsible="icon">
                    <div hlmSidebarHeader class="p-3 flex items-center gap-2">
                        <span class="size-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">R</span>
                        <span class="font-bold text-sm group-data-[collapsible=icon]:hidden">Rail App</span>
                    </div>
                    <div hlmSidebarContent>
                        <div hlmSidebarGroup>
                            <div hlmSidebarGroupLabel>Apps</div>
                            <div hlmSidebarGroupContent>
                                <ul hlmSidebarMenu>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton tooltip="Dashboard" [isActive]="true">
                                            <ng-icon name="lucideHome" />
                                            <span>Dashboard</span>
                                        </button>
                                    </li>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton tooltip="Inbox">
                                            <ng-icon name="lucideInbox" />
                                            <span>Inbox</span>
                                        </button>
                                    </li>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton tooltip="Settings">
                                            <ng-icon name="lucideSettings" />
                                            <span>Settings</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <button hlmSidebarRail>
                        <span class="sr-only">Toggle Rail</span>
                    </button>
                </hlm-sidebar>
                <main hlmSidebarInset class="p-6">
                    <div class="flex items-center gap-3 mb-4">
                        <button hlmSidebarTrigger></button>
                        <h2 class="text-lg font-semibold">Collapsible Icon Rail</h2>
                    </div>
                    <p class="text-sm text-muted-foreground">
                        Click the trigger button or press <strong>⌘B</strong> / <strong>ctrl+B</strong> to toggle between expanded state and icon-only rail with tooltips.
                    </p>
                </main>
            </div>
        `,
    }),
};

export const MobileResponsive: Story = {
    render: () => ({
        template: `
            <div hlmSidebarWrapper class="min-h-[400px] border rounded-lg overflow-hidden bg-background">
                <hlm-sidebar>
                    <div hlmSidebarHeader class="p-3">
                        <span class="font-bold text-sm">Mobile Sheet Navigation</span>
                    </div>
                    <div hlmSidebarContent>
                        <div hlmSidebarGroup>
                            <div hlmSidebarGroupContent>
                                <ul hlmSidebarMenu>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton [isActive]="true">
                                            <ng-icon name="lucideHome" />
                                            <span>Home</span>
                                        </button>
                                    </li>
                                    <li hlmSidebarMenuItem>
                                        <button hlmSidebarMenuButton>
                                            <ng-icon name="lucideInbox" />
                                            <span>Messages</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </hlm-sidebar>
                <main hlmSidebarInset class="p-6">
                    <header class="flex items-center gap-3 mb-4">
                        <button hlmSidebarTrigger></button>
                        <span class="font-semibold text-sm">Mobile Viewport Simulation</span>
                    </header>
                    <p class="text-sm text-muted-foreground">
                        On mobile viewports (&lt;768px), the sidebar transitions into a drawer sheet slide-over automatically.
                    </p>
                </main>
            </div>
        `,
    }),
};
