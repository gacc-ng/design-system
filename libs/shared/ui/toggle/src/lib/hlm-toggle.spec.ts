import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmToggleImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmToggleImports],
    template: `
        <button hlmToggle data-testid="default-toggle">Toggle B</button>
        <button hlmToggle variant="outline" size="sm" data-testid="outline-toggle">Toggle I</button>
    `,
})
class TestToggleHostComponent {}

describe('HlmToggle Primitive', () => {
    let fixture: ComponentFixture<TestToggleHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestToggleHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestToggleHostComponent);
        fixture.detectChanges();
    });

    it('should render toggle with data-slot and maia rounded-4xl styling', () => {
        const toggleEl = fixture.debugElement.query(By.css('[data-testid="default-toggle"]'))
            .nativeElement as HTMLElement;
        expect(toggleEl.getAttribute('data-slot')).toBe('toggle');
        expect(toggleEl.className).toContain('rounded-4xl');
        expect(toggleEl.className).toContain('h-9');
    });

    it('should support variant and size inputs', () => {
        const outlineEl = fixture.debugElement.query(By.css('[data-testid="outline-toggle"]'))
            .nativeElement as HTMLElement;
        expect(outlineEl.className).toContain('border');
        expect(outlineEl.className).toContain('h-8');
    });
});
