import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmInput } from './hlm-input';

@Component({
    standalone: true,
    imports: [HlmInput],
    template: `
        <input hlmInput placeholder="Default Input" />
        <input hlmInput size="sm" placeholder="Small Input" />
        <input hlmInput size="lg" placeholder="Large Input" />
        <input hlmInput [disabled]="true" placeholder="Disabled Input" />
    `,
})
class TestHostComponent {}

describe('HlmInput', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create and apply default input classes', () => {
        const inputs = fixture.debugElement.queryAll(By.directive(HlmInput));
        const defaultInput = inputs[0].nativeElement as HTMLInputElement;

        expect(defaultInput).toBeTruthy();
        expect(defaultInput.getAttribute('data-slot')).toBe('input');
        expect(defaultInput.className).toContain('border-input');
        expect(defaultInput.className).toContain('h-9');
        expect(defaultInput.className).toContain('rounded-md');
    });

    it('should apply small size classes', () => {
        const inputs = fixture.debugElement.queryAll(By.directive(HlmInput));
        const smInput = inputs[1].nativeElement as HTMLInputElement;

        expect(smInput.className).toContain('h-8');
        expect(smInput.className).toContain('text-xs');
    });

    it('should apply large size classes', () => {
        const inputs = fixture.debugElement.queryAll(By.directive(HlmInput));
        const lgInput = inputs[2].nativeElement as HTMLInputElement;

        expect(lgInput.className).toContain('h-10');
        expect(lgInput.className).toContain('text-base');
    });

    it('should handle disabled attribute', () => {
        const inputs = fixture.debugElement.queryAll(By.directive(HlmInput));
        const disabledInput = inputs[3].nativeElement as HTMLInputElement;

        expect(disabledInput.disabled).toBe(true);
        expect(disabledInput.className).toContain('disabled:pointer-events-none');
    });
});
