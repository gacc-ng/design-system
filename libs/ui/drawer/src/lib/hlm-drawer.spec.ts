import { Component, signal, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BrnDialog } from '@spartan-ng/brain/dialog';
import { BrnDrawer } from '@spartan-ng/brain/drawer';
import { describe, expect, it } from 'vitest';

import { HlmDrawer, HlmDrawerImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmDrawerImports],
    template: `
        <hlm-drawer #drawer="hlmDrawer" [direction]="direction()">
            <button id="test-trigger" hlmDrawerTrigger data-testid="drawer-trigger">Open Drawer</button>
            <button id="right-trigger" hlmDrawerTrigger direction="right" data-testid="drawer-right-trigger">
                Open Right Drawer
            </button>
            <hlm-drawer-content *hlmDrawerPortal="let ctx" data-testid="drawer-content">
                <hlm-drawer-header data-testid="drawer-header">
                    <h3 hlmDrawerTitle data-testid="drawer-title">Test Drawer Title</h3>
                    <p hlmDrawerDescription data-testid="drawer-description">Test Drawer Description</p>
                </hlm-drawer-header>
                <div data-testid="drawer-body">Drawer Body Content</div>
                <hlm-drawer-footer data-testid="drawer-footer">
                    <button hlmDrawerClose data-testid="drawer-close">Close Drawer</button>
                </hlm-drawer-footer>
            </hlm-drawer-content>
        </hlm-drawer>
    `,
})
class TestDrawerHostComponent {
    readonly drawer = viewChild('drawer', { read: HlmDrawer });
    readonly direction = signal<'bottom' | 'top' | 'left' | 'right'>('bottom');
}

describe('HlmDrawer', () => {
    let fixture: ComponentFixture<TestDrawerHostComponent>;
    let host: TestDrawerHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestDrawerHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestDrawerHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should provide BrnDrawer and BrnDialog', () => {
        expect(host.drawer()).toBeDefined();

        const drawerEl = fixture.debugElement.query(By.directive(HlmDrawer));
        expect(drawerEl).toBeTruthy();
        expect(drawerEl.componentInstance).toBeInstanceOf(BrnDrawer);
        expect(drawerEl.componentInstance).toBeInstanceOf(BrnDialog);

        const triggerEl = fixture.debugElement.query(By.css('#test-trigger'));
        const brnDrawer = triggerEl.injector.get(BrnDrawer);
        expect(brnDrawer).toBeDefined();
        expect(brnDrawer).toBeInstanceOf(HlmDrawer);

        const brnDialog = triggerEl.injector.get(BrnDialog);
        expect(brnDialog).toBeDefined();
        expect(brnDialog).toBeInstanceOf(HlmDrawer);
    });

    it('should render trigger button with data-slot="drawer-trigger"', () => {
        const triggerEl = fixture.debugElement.query(By.css('[data-testid="drawer-trigger"]'))
            .nativeElement as HTMLElement;
        expect(triggerEl.getAttribute('data-slot')).toBe('drawer-trigger');
    });

    it('should render drawer overlay in host template', () => {
        const overlayEl = fixture.debugElement.query(By.css('hlm-drawer-overlay')).nativeElement as HTMLElement;
        expect(overlayEl).toBeDefined();
    });

    it('should open drawer on trigger click and render content with grab notch for bottom direction', async () => {
        const trigger = fixture.debugElement.query(By.css('[data-testid="drawer-trigger"]'))
            .nativeElement as HTMLButtonElement;
        trigger.click();
        fixture.detectChanges();
        await fixture.whenStable();

        const content = document.querySelector('[data-testid="drawer-content"]') as HTMLElement;
        expect(content).not.toBeNull();
        expect(content.getAttribute('data-slot')).toBe('drawer-content');
        expect(content.getAttribute('data-vaul-drawer-direction')).toBe('bottom');

        // Grab notch should be present in template
        const notch = content.querySelector('.rounded-full');
        expect(notch).not.toBeNull();

        // Check header, title, and description attributes
        const header = document.querySelector('[data-testid="drawer-header"]');
        expect(header?.getAttribute('data-slot')).toBe('drawer-header');

        const title = document.querySelector('[data-testid="drawer-title"]');
        expect(title?.getAttribute('data-slot')).toBe('drawer-title');

        const description = document.querySelector('[data-testid="drawer-description"]');
        expect(description?.getAttribute('data-slot')).toBe('drawer-description');

        // Check footer and close button
        const footer = document.querySelector('[data-testid="drawer-footer"]');
        expect(footer?.getAttribute('data-slot')).toBe('drawer-footer');

        const closeBtn = document.querySelector('[data-testid="drawer-close"]') as HTMLButtonElement;
        expect(closeBtn?.getAttribute('data-slot')).toBe('drawer-close');

        // Close drawer
        closeBtn.click();
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should support opening drawer with right direction trigger', async () => {
        const rightTrigger = fixture.debugElement.query(By.css('[data-testid="drawer-right-trigger"]'))
            .nativeElement as HTMLButtonElement;
        rightTrigger.click();
        fixture.detectChanges();
        await fixture.whenStable();

        const content = document.querySelector('[data-testid="drawer-content"]') as HTMLElement;
        expect(content).not.toBeNull();
        expect(content.getAttribute('data-vaul-drawer-direction')).toBe('right');

        const closeBtn = document.querySelector('[data-testid="drawer-close"]') as HTMLButtonElement;
        closeBtn.click();
        fixture.detectChanges();
        await fixture.whenStable();
    });
});
