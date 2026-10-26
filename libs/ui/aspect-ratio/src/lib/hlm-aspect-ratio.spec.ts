import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmAspectRatioImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmAspectRatioImports],
    template: `
        <div hlmAspectRatio data-testid="default-ratio"></div>
        <div [hlmAspectRatio]="16 / 9" data-testid="numeric-ratio"></div>
        <div hlmAspectRatio="16/9" data-testid="string-ratio"></div>
        <div [hlmAspectRatio]="0" data-testid="zero-ratio"></div>
        <div [hlmAspectRatio]="-2" data-testid="negative-ratio"></div>
    `,
})
class TestHostComponent {}

describe('HlmAspectRatio', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should have default ratio of 1 with host attribute and classes', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="default-ratio"]')).nativeElement as HTMLElement;
        expect(el.getAttribute('data-slot')).toBe('aspect-ratio');
        expect(el.classList.contains('relative')).toBe(true);
        expect(el.classList.contains('aspect-(--ratio)')).toBe(true);
        expect(el.style.getPropertyValue('--ratio')).toBe('1');
    });

    it('should set numerical ratio correctly', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="numeric-ratio"]')).nativeElement as HTMLElement;
        expect(Number(el.style.getPropertyValue('--ratio'))).toBeCloseTo(16 / 9);
    });

    it('should set string fraction ratio correctly', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="string-ratio"]')).nativeElement as HTMLElement;
        expect(Number(el.style.getPropertyValue('--ratio'))).toBeCloseTo(16 / 9);
    });

    it('should fall back to 1 for zero or negative ratio', () => {
        const zeroEl = fixture.debugElement.query(By.css('[data-testid="zero-ratio"]')).nativeElement as HTMLElement;
        const negativeEl = fixture.debugElement.query(By.css('[data-testid="negative-ratio"]'))
            .nativeElement as HTMLElement;
        expect(zeroEl.style.getPropertyValue('--ratio')).toBe('1');
        expect(negativeEl.style.getPropertyValue('--ratio')).toBe('1');
    });
});
