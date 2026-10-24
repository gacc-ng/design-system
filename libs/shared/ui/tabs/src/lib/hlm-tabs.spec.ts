import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmTabsImports } from '../index';

@Component({
    imports: [HlmTabsImports],
    template: `
        <hlm-tabs tab="account" class="w-full">
            <hlm-tabs-list aria-label="user tabs">
                <button hlmTabsTrigger="account">Account</button>
                <button hlmTabsTrigger="password">Password</button>
            </hlm-tabs-list>
            <div hlmTabsContent="account">Account content</div>
            <div hlmTabsContent="password">
                <ng-template hlmTabsContentLazy>
                    <p>Password content</p>
                </ng-template>
            </div>
        </hlm-tabs>
    `,
})
class TestHostComponent {}

describe('HlmTabs', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create and render tabs with correct slots', () => {
        const tabsEl = fixture.debugElement.query(By.css('[data-slot="tabs"]'));
        expect(tabsEl).toBeTruthy();

        const listEl = fixture.debugElement.query(By.css('[data-slot="tabs-list"]'));
        expect(listEl).toBeTruthy();
        expect(listEl.nativeElement.getAttribute('data-variant')).toBe('default');

        const triggers = fixture.debugElement.queryAll(By.css('[data-slot="tabs-trigger"]'));
        expect(triggers.length).toBe(2);

        const contentEl = fixture.debugElement.query(By.css('[data-slot="tabs-content"]'));
        expect(contentEl).toBeTruthy();
        expect(contentEl.nativeElement.textContent).toContain('Account content');
    });

    it('should switch content when another trigger is clicked', async () => {
        const triggers = fixture.debugElement.queryAll(By.css('[data-slot="tabs-trigger"]'));
        triggers[1].nativeElement.click();
        fixture.detectChanges();
        await fixture.whenStable();

        const contents = fixture.debugElement.queryAll(By.css('[data-slot="tabs-content"]'));
        expect(contents.length).toBe(2);
        expect(contents[1].nativeElement.textContent).toContain('Password content');
    });
});
