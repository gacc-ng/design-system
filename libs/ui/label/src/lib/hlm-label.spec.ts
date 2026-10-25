import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmLabel } from './hlm-label';

@Component({
    standalone: true,
    imports: [HlmLabel],
    template: `
        <label hlmLabel for="test-input" id="test-label">Email Address</label>
        <label hlmLabel for="disabled-input" class="peer-disabled:opacity-50">Disabled Field</label>
    `,
})
class TestHostComponent {}

describe('HlmLabel', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create and apply accessible label classes', () => {
        const labels = fixture.debugElement.queryAll(By.directive(HlmLabel));
        const label = labels[0].nativeElement as HTMLLabelElement;

        expect(label).toBeTruthy();
        expect(label.getAttribute('data-slot')).toBe('label');
        expect(label.getAttribute('for')).toBe('test-input');
        expect(label.className).toContain('text-sm');
        expect(label.className).toContain('font-medium');
        expect(label.className).toContain('leading-none');
    });
});
