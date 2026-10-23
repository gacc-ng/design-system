import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmSheetImports } from './hlm-sheet';

@Component({
    standalone: true,
    imports: [HlmSheetImports],
    template: `
        <hlm-sheet>
            <button hlmSheetTrigger data-testid="sheet-trigger">Open Sheet</button>
            <hlm-sheet-content *hlmSheetPortal="let ctx" side="right" data-testid="sheet-content">
                <hlm-sheet-header data-testid="sheet-header">
                    <h3 hlmSheetTitle data-testid="sheet-title">Profile Sheet</h3>
                    <p hlmSheetDescription data-testid="sheet-desc">Edit profile details</p>
                </hlm-sheet-header>
                <hlm-sheet-footer data-testid="sheet-footer">
                    <button hlmSheetClose data-testid="sheet-close">Done</button>
                </hlm-sheet-footer>
            </hlm-sheet-content>
        </hlm-sheet>
    `,
})
class TestSheetHostComponent {}

describe('HlmSheet Primitives (Maia preset)', () => {
    let fixture: ComponentFixture<TestSheetHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestSheetHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestSheetHostComponent);
        fixture.detectChanges();
    });

    it('should render sheet trigger with correct data-slot', () => {
        const triggerEl = fixture.debugElement.query(By.css('[data-testid="sheet-trigger"]'))
            .nativeElement as HTMLElement;
        expect(triggerEl.getAttribute('data-slot')).toBe('sheet-trigger');
    });

    it('should render sheet overlay element in host template', () => {
        const overlayEl = fixture.debugElement.query(By.css('hlm-sheet-overlay')).nativeElement as HTMLElement;
        expect(overlayEl).toBeDefined();
    });
});
