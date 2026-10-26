import { Component, provideZonelessChangeDetection, signal, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideIcons } from '@ng-icons/core';
import { lucidePanelLeft } from '@ng-icons/lucide';
import { beforeEach, describe, expect, it } from 'vitest';

import { HlmSidebar, HlmSidebarImports, HlmSidebarService, HlmSidebarTrigger, provideHlmSidebarConfig } from '../index';

@Component({
    standalone: true,
    imports: [HlmSidebarImports],
    template: `
        <div hlmSidebarWrapper>
            <hlm-sidebar #sidebar [collapsible]="collapsible()" [side]="side()" [variant]="variant()">
                <div hlmSidebarHeader data-testid="sidebar-header">Header</div>
                <div hlmSidebarContent data-testid="sidebar-content">
                    <div hlmSidebarGroup data-testid="sidebar-group">
                        <div hlmSidebarGroupLabel data-testid="sidebar-group-label">Application</div>
                        <div hlmSidebarGroupContent data-testid="sidebar-group-content">
                            <ul hlmSidebarMenu data-testid="sidebar-menu">
                                <li hlmSidebarMenuItem data-testid="sidebar-menu-item">
                                    <button hlmSidebarMenuButton data-testid="sidebar-menu-button">
                                        <span>Dashboard</span>
                                    </button>
                                </li>
                                <hlm-sidebar-separator
                                    data-testid="sidebar-separator"
                                    orientation="horizontal"
                                    [decorative]="true"
                                />
                                <hlm-sidebar-menu-skeleton data-testid="sidebar-menu-skeleton" [showIcon]="true" />
                            </ul>
                        </div>
                    </div>
                </div>
                <div hlmSidebarFooter data-testid="sidebar-footer">Footer</div>
                <button hlmSidebarRail data-testid="sidebar-rail">
                    <span class="sr-only">Toggle Rail</span>
                </button>
            </hlm-sidebar>
            <main hlmSidebarInset data-testid="sidebar-inset">
                <button hlmSidebarTrigger data-testid="sidebar-trigger">
                    <span class="sr-only">Toggle Sidebar</span>
                </button>
            </main>
        </div>
    `,
})
class TestSidebarHostComponent {
    readonly sidebar = viewChild.required<HlmSidebar>('sidebar');
    readonly collapsible = signal<'offcanvas' | 'icon' | 'none'>('icon');
    readonly side = signal<'left' | 'right'>('left');
    readonly variant = signal<'sidebar' | 'floating' | 'inset'>('sidebar');
}

describe('HlmSidebar System', () => {
    describe('HlmSidebarService', () => {
        let service: HlmSidebarService;

        beforeEach(() => {
            // Clear cookies before each test
            document.cookie = 'sidebar_test_cookie=; path=/; max-age=0';
            document.cookie = 'sidebar_restore_cookie=; path=/; max-age=0';

            TestBed.configureTestingModule({
                providers: [
                    provideZonelessChangeDetection(),
                    provideHlmSidebarConfig({
                        defaultOpen: true,
                        sidebarCookieName: 'sidebar_test_cookie',
                        sidebarCookieMaxAge: 3600,
                        sidebarKeyboardShortcut: 'b',
                    }),
                    HlmSidebarService,
                ],
            });

            service = TestBed.inject(HlmSidebarService);
        });

        it('should initialize with default desktop state expanded', () => {
            expect(service.open()).toBe(true);
            expect(service.isMobile()).toBe(false);
            expect(service.state()).toBe('expanded');
        });

        it('should toggle desktop open state via toggleSidebar()', () => {
            service.toggleSidebar();
            expect(service.open()).toBe(false);
            expect(service.state()).toBe('collapsed');

            service.toggleSidebar();
            expect(service.open()).toBe(true);
            expect(service.state()).toBe('expanded');
        });

        it('should update cookie when setOpen() is called', () => {
            service.setOpen(false);
            expect(service.open()).toBe(false);
            expect(document.cookie).toContain('sidebar_test_cookie=false');

            service.setOpen(true);
            expect(service.open()).toBe(true);
            expect(document.cookie).toContain('sidebar_test_cookie=true');
        });

        it('should toggle mobile state when isMobile() is true', () => {
            // Simulate mobile environment
            (service as unknown as { _isMobile: { set: (val: boolean) => void } })._isMobile.set(true);
            expect(service.isMobile()).toBe(true);

            expect(service.openMobile()).toBe(false);
            service.toggleSidebar();
            expect(service.openMobile()).toBe(true);

            service.toggleSidebar();
            expect(service.openMobile()).toBe(false);
        });

        it('should handle keyboard shortcut ctrl+B and meta+B', () => {
            const initialOpen = service.open();

            // Simulate Ctrl+B keydown
            const ctrlBEvent = new KeyboardEvent('keydown', {
                key: 'b',
                ctrlKey: true,
                bubbles: true,
                cancelable: true,
            });
            window.dispatchEvent(ctrlBEvent);

            expect(service.open()).toBe(!initialOpen);

            // Simulate Meta+B keydown (macOS ⌘B)
            const metaBEvent = new KeyboardEvent('keydown', {
                key: 'b',
                metaKey: true,
                bubbles: true,
                cancelable: true,
            });
            window.dispatchEvent(metaBEvent);

            expect(service.open()).toBe(initialOpen);
        });

        it('should handle keyboard shortcut case-insensitively', () => {
            const initialOpen = service.open();

            const upperBEvent = new KeyboardEvent('keydown', {
                key: 'B',
                ctrlKey: true,
                bubbles: true,
                cancelable: true,
            });
            window.dispatchEvent(upperBEvent);

            expect(service.open()).toBe(!initialOpen);
        });

        it('should ignore keyboard shortcut when event target is input, textarea, or contentEditable', () => {
            const initialOpen = service.open();

            const inputEl = document.createElement('input');
            document.body.appendChild(inputEl);
            const inputEvent = new KeyboardEvent('keydown', {
                key: 'b',
                ctrlKey: true,
                bubbles: true,
                cancelable: true,
            });
            inputEl.dispatchEvent(inputEvent);
            expect(service.open()).toBe(initialOpen);
            inputEl.remove();

            const textareaEl = document.createElement('textarea');
            document.body.appendChild(textareaEl);
            const textareaEvent = new KeyboardEvent('keydown', {
                key: 'b',
                ctrlKey: true,
                bubbles: true,
                cancelable: true,
            });
            textareaEl.dispatchEvent(textareaEvent);
            expect(service.open()).toBe(initialOpen);
            textareaEl.remove();

            const editableEl = document.createElement('div');
            editableEl.setAttribute('contenteditable', 'true');
            Object.defineProperty(editableEl, 'isContentEditable', { value: true, configurable: true });
            document.body.appendChild(editableEl);
            const editableEvent = new KeyboardEvent('keydown', {
                key: 'b',
                ctrlKey: true,
                bubbles: true,
                cancelable: true,
            });
            editableEl.dispatchEvent(editableEvent);
            expect(service.open()).toBe(initialOpen);
            editableEl.remove();
        });

        it('should restore open state from cookie on creation', () => {
            TestBed.resetTestingModule();
            document.cookie = 'sidebar_restore_cookie=false; path=/; max-age=3600';

            TestBed.configureTestingModule({
                providers: [
                    provideZonelessChangeDetection(),
                    provideHlmSidebarConfig({
                        sidebarCookieName: 'sidebar_restore_cookie',
                    }),
                    HlmSidebarService,
                ],
            });

            const restoredService = TestBed.inject(HlmSidebarService);
            expect(restoredService.open()).toBe(false);
            expect(restoredService.state()).toBe('collapsed');
        });
    });

    describe('HlmSidebar and Directives Component Integration', () => {
        let fixture: ComponentFixture<TestSidebarHostComponent>;
        let service: HlmSidebarService;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestSidebarHostComponent],
                providers: [provideZonelessChangeDetection(), provideIcons({ lucidePanelLeft }), HlmSidebarService],
            }).compileComponents();

            service = TestBed.inject(HlmSidebarService);
            service.setOpen(true);
            (service as unknown as { _isMobile: { set: (val: boolean) => void } })._isMobile.set(false);
            fixture = TestBed.createComponent(TestSidebarHostComponent);
            fixture.detectChanges();
        });

        it('should render desktop sidebar container and gap when not mobile', () => {
            const gap = fixture.debugElement.query(By.css('[data-slot="sidebar-gap"]'));
            const container = fixture.debugElement.query(By.css('[data-slot="sidebar-container"]'));

            expect(gap).toBeTruthy();
            expect(container).toBeTruthy();
            expect(container.nativeElement.getAttribute('data-side')).toBe('left');
        });

        it('should render structural slots correctly on desktop', () => {
            const header = fixture.debugElement.query(By.css('[data-testid="sidebar-header"]'));
            const content = fixture.debugElement.query(By.css('[data-testid="sidebar-content"]'));
            const footer = fixture.debugElement.query(By.css('[data-testid="sidebar-footer"]'));
            const group = fixture.debugElement.query(By.css('[data-testid="sidebar-group"]'));
            const groupLabel = fixture.debugElement.query(By.css('[data-testid="sidebar-group-label"]'));
            const groupContent = fixture.debugElement.query(By.css('[data-testid="sidebar-group-content"]'));
            const menu = fixture.debugElement.query(By.css('[data-testid="sidebar-menu"]'));
            const menuItem = fixture.debugElement.query(By.css('[data-testid="sidebar-menu-item"]'));
            const menuButton = fixture.debugElement.query(By.css('[data-testid="sidebar-menu-button"]'));
            const rail = fixture.debugElement.query(By.css('[data-testid="sidebar-rail"]'));
            const inset = fixture.debugElement.query(By.css('[data-testid="sidebar-inset"]'));
            const separator = fixture.debugElement.query(By.css('[data-testid="sidebar-separator"]'));
            const skeleton = fixture.debugElement.query(By.css('[data-testid="sidebar-menu-skeleton"]'));

            expect(header.nativeElement.getAttribute('data-slot')).toBe('sidebar-header');
            expect(content.nativeElement.getAttribute('data-slot')).toBe('sidebar-content');
            expect(footer.nativeElement.getAttribute('data-slot')).toBe('sidebar-footer');
            expect(group.nativeElement.getAttribute('data-slot')).toBe('sidebar-group');
            expect(groupLabel.nativeElement.getAttribute('data-slot')).toBe('sidebar-group-label');
            expect(groupContent.nativeElement.getAttribute('data-slot')).toBe('sidebar-group-content');
            expect(menu.nativeElement.getAttribute('data-slot')).toBe('sidebar-menu');
            expect(menuItem.nativeElement.getAttribute('data-slot')).toBe('sidebar-menu-item');
            expect(menuButton.nativeElement.getAttribute('data-slot')).toBe('sidebar-menu-button');
            expect(rail.nativeElement.getAttribute('data-slot')).toBe('sidebar-rail');
            expect(inset.nativeElement.getAttribute('data-slot')).toBe('sidebar-inset');

            expect(separator.nativeElement.getAttribute('data-slot')).toBe('sidebar-separator');
            expect(separator.nativeElement.getAttribute('data-orientation')).toBe('horizontal');

            expect(skeleton.nativeElement.getAttribute('data-slot')).toBe('sidebar-menu-skeleton');
            const skeletonIcon = skeleton.query(By.css('[data-sidebar="menu-skeleton-icon"]'));
            const skeletonText = skeleton.query(By.css('[data-sidebar="menu-skeleton-text"]'));
            expect(skeletonIcon).toBeTruthy();
            expect(skeletonText).toBeTruthy();
        });

        it('should update data attributes on sidebar host for collapsible="icon"', () => {
            const sidebarEl = fixture.debugElement.query(By.directive(HlmSidebar)).nativeElement as HTMLElement;

            expect(sidebarEl.getAttribute('data-slot')).toBe('sidebar');
            expect(sidebarEl.getAttribute('data-state')).toBe('expanded');
            expect(sidebarEl.getAttribute('data-side')).toBe('left');

            // Collapse the sidebar
            service.setOpen(false);
            fixture.detectChanges();

            expect(sidebarEl.getAttribute('data-state')).toBe('collapsed');
            expect(sidebarEl.getAttribute('data-collapsible')).toBe('icon');
        });

        it('should toggle sidebar when HlmSidebarTrigger is clicked', () => {
            const trigger = fixture.debugElement.query(By.directive(HlmSidebarTrigger));
            expect(trigger).toBeTruthy();
            expect(trigger.nativeElement.getAttribute('data-slot')).toBe('sidebar-trigger');

            expect(service.open()).toBe(true);

            trigger.nativeElement.click();
            fixture.detectChanges();

            expect(service.open()).toBe(false);

            trigger.nativeElement.click();
            fixture.detectChanges();

            expect(service.open()).toBe(true);
        });

        it('should render sheet on mobile', () => {
            // Switch to mobile mode
            (service as unknown as { _isMobile: { set: (val: boolean) => void } })._isMobile.set(true);
            fixture.detectChanges();

            const gap = fixture.debugElement.query(By.css('[data-slot="sidebar-gap"]'));
            expect(gap).toBeNull();

            const sheet = fixture.debugElement.query(By.css('hlm-sheet'));
            expect(sheet).toBeTruthy();
        });
    });
});
