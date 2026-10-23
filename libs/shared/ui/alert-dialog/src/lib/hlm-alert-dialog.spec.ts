import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmAlertDialogImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmAlertDialogImports],
    template: `
        <hlm-alert-dialog>
            <button hlmAlertDialogTrigger data-testid="alert-dialog-trigger">Delete Account</button>
            <hlm-alert-dialog-content *hlmAlertDialogPortal="let ctx" data-testid="alert-dialog-content">
                <hlm-alert-dialog-header data-testid="alert-dialog-header">
                    <h2 hlmAlertDialogTitle data-testid="alert-dialog-title">Delete Confirmation</h2>
                    <p hlmAlertDialogDescription data-testid="alert-dialog-desc">Are you sure?</p>
                </hlm-alert-dialog-header>
                <hlm-alert-dialog-footer data-testid="alert-dialog-footer">
                    <button hlmAlertDialogCancel data-testid="alert-dialog-cancel">Cancel</button>
                    <button hlmAlertDialogAction variant="destructive" data-testid="alert-dialog-action">
                        Confirm
                    </button>
                </hlm-alert-dialog-footer>
            </hlm-alert-dialog-content>
        </hlm-alert-dialog>
    `,
})
class TestAlertDialogHostComponent {}

describe('HlmAlertDialog Primitives (Maia preset)', () => {
    let fixture: ComponentFixture<TestAlertDialogHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestAlertDialogHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestAlertDialogHostComponent);
        fixture.detectChanges();
    });

    it('should render alert dialog trigger with correct data-slot', () => {
        const triggerEl = fixture.debugElement.query(By.css('[data-testid="alert-dialog-trigger"]'))
            .nativeElement as HTMLElement;
        expect(triggerEl.getAttribute('data-slot')).toBe('alert-dialog-trigger');
    });

    it('should render overlay element in host template', () => {
        const overlayEl = fixture.debugElement.query(By.css('hlm-alert-dialog-overlay')).nativeElement as HTMLElement;
        expect(overlayEl).toBeDefined();
    });
});
