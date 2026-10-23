import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmPopoverImports } from './hlm-popover';

@Component({
    standalone: true,
    imports: [HlmPopoverImports],
    template: `
        <div hlmPopover data-testid="popover-container">
            <button hlmPopoverTrigger data-testid="popover-trigger">Open Popover</button>
            <div *hlmPopoverPortal="let ctx" hlmPopoverContent data-testid="popover-content">
                <div hlmPopoverHeader data-testid="popover-header">
                    <h4 hlmPopoverTitle data-testid="popover-title">Dimensions</h4>
                    <p hlmPopoverDescription data-testid="popover-desc">Set layer dimensions.</p>
                </div>
            </div>
        </div>
    `,
})
class TestPopoverHostComponent {}

describe('HlmPopover Primitives (Maia preset)', () => {
    let fixture: ComponentFixture<TestPopoverHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestPopoverHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestPopoverHostComponent);
        fixture.detectChanges();
    });

    it('should render popover container and trigger with correct data-slots', () => {
        const containerEl = fixture.debugElement.query(By.css('[data-testid="popover-container"]'))
            .nativeElement as HTMLElement;
        const triggerEl = fixture.debugElement.query(By.css('[data-testid="popover-trigger"]'))
            .nativeElement as HTMLElement;

        expect(containerEl.getAttribute('data-slot')).toBe('popover');
        expect(triggerEl.getAttribute('data-slot')).toBe('popover-trigger');
    });
});
