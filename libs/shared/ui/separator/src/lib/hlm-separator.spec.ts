import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmSeparatorImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmSeparatorImports],
    template: `
        <hlm-separator data-testid="horizontal-separator" />
        <hlm-separator orientation="vertical" data-testid="vertical-separator" />
    `,
})
class TestSeparatorHostComponent {}

describe('HlmSeparator', () => {
    let fixture: ComponentFixture<TestSeparatorHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestSeparatorHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestSeparatorHostComponent);
        fixture.detectChanges();
    });

    it('should render horizontal separator by default with data-slot and orientation', () => {
        const sepEl = fixture.debugElement.query(By.css('[data-testid="horizontal-separator"]'))
            .nativeElement as HTMLElement;
        expect(sepEl.getAttribute('data-slot')).toBe('separator');
        expect(sepEl.className).toContain('bg-border');
        expect(sepEl.getAttribute('data-orientation')).toBe('horizontal');
    });

    it('should render vertical separator with vertical orientation data attribute', () => {
        const sepEl = fixture.debugElement.query(By.css('[data-testid="vertical-separator"]'))
            .nativeElement as HTMLElement;
        expect(sepEl.getAttribute('data-slot')).toBe('separator');
        expect(sepEl.getAttribute('data-orientation')).toBe('vertical');
    });
});
