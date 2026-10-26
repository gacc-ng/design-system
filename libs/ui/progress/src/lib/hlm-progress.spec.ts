import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmProgress } from './hlm-progress';
import { HlmProgressIndicator } from './hlm-progress-indicator';

@Component({
    standalone: true,
    imports: [HlmProgress, HlmProgressIndicator],
    template: `
        <hlm-progress [value]="value()">
            <hlm-progress-indicator />
        </hlm-progress>
    `,
})
class TestHostComponent {
    public readonly value = signal<number | undefined>(33);
}

describe('HlmProgress', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create and render progress with correct data-slot attributes', () => {
        const progressEl = fixture.debugElement.query(By.directive(HlmProgress)).nativeElement as HTMLElement;
        const indicatorEl = fixture.debugElement.query(By.directive(HlmProgressIndicator)).nativeElement as HTMLElement;

        expect(progressEl).toBeTruthy();
        expect(progressEl.getAttribute('data-slot')).toBe('progress');
        expect(progressEl.className).toContain('bg-muted');
        expect(progressEl.className).toContain('rounded-full');

        expect(indicatorEl).toBeTruthy();
        expect(indicatorEl.getAttribute('data-slot')).toBe('progress-indicator');
        expect(indicatorEl.className).toContain('bg-primary');
    });

    it('should compute the correct transform style for determinate progress', () => {
        const indicatorEl = fixture.debugElement.query(By.directive(HlmProgressIndicator)).nativeElement as HTMLElement;

        // value = 33 => offset = 100 - 33 = 67%
        expect(indicatorEl.style.transform).toBe('translateX(-67%)');

        component.value.set(75);
        fixture.detectChanges();

        // value = 75 => offset = 100 - 75 = 25%
        expect(indicatorEl.style.transform).toBe('translateX(-25%)');
    });

    it('should apply animate-indeterminate class when value is undefined', () => {
        component.value.set(undefined);
        fixture.detectChanges();

        const indicatorEl = fixture.debugElement.query(By.directive(HlmProgressIndicator)).nativeElement as HTMLElement;
        expect(indicatorEl.classList.contains('animate-indeterminate')).toBe(true);
    });
});
