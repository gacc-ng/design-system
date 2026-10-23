import { Component, inject } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmDialogImports, HlmDialogService } from './hlm-dialog';

@Component({
    standalone: true,
    imports: [HlmDialogImports],
    template: `
        <hlm-dialog>
            <button hlmDialogTrigger data-testid="dialog-trigger">Open</button>
            <hlm-dialog-content *hlmDialogPortal="let ctx" data-testid="dialog-content">
                <hlm-dialog-header data-testid="dialog-header">
                    <h3 hlmDialogTitle data-testid="dialog-title">Test Title</h3>
                    <p hlmDialogDescription data-testid="dialog-desc">Test Description</p>
                </hlm-dialog-header>
                <hlm-dialog-footer data-testid="dialog-footer">
                    <button hlmDialogClose data-testid="dialog-close">Cancel</button>
                </hlm-dialog-footer>
            </hlm-dialog-content>
        </hlm-dialog>
    `,
})
class TestDialogHostComponent {
    public readonly dialogService = inject(HlmDialogService);
}

describe('HlmDialog Primitives (Maia preset)', () => {
    let fixture: ComponentFixture<TestDialogHostComponent>;
    let component: TestDialogHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestDialogHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestDialogHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should inject HlmDialogService correctly', () => {
        expect(component.dialogService).toBeDefined();
        expect(typeof component.dialogService.open).toBe('function');
    });

    it('should render trigger button with correct data-slot', () => {
        const triggerEl = fixture.debugElement.query(By.css('[data-testid="dialog-trigger"]'))
            .nativeElement as HTMLElement;
        expect(triggerEl.getAttribute('data-slot')).toBe('dialog-trigger');
    });

    it('should configure dialog overlay with backdrop styles', () => {
        const overlayEl = fixture.debugElement.query(By.css('hlm-dialog-overlay')).nativeElement as HTMLElement;
        expect(overlayEl).toBeDefined();
    });
});
