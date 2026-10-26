import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgScrollbar } from 'ngx-scrollbar';
import { describe, expect, it } from 'vitest';

import { HlmScrollAreaImports } from './hlm-scroll-area.directive';

@Component({
    standalone: true,
    imports: [NgScrollbar, HlmScrollAreaImports],
    template: `
        <ng-scrollbar hlm data-testid="scroll-area-hlm" class="custom-class">
            <div data-testid="content">Scroll content</div>
        </ng-scrollbar>
        <ng-scrollbar hlmScrollbar data-testid="scroll-area-scrollbar">
            <div>Second scroll content</div>
        </ng-scrollbar>
    `,
})
class TestHostComponent {}

describe('HlmScrollArea', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should match selector ng-scrollbar[hlm] and set data-slot to scroll-area', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="scroll-area-hlm"]')).nativeElement as HTMLElement;
        expect(el.getAttribute('data-slot')).toBe('scroll-area');
    });

    it('should match selector ng-scrollbar[hlmScrollbar]', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="scroll-area-scrollbar"]'))
            .nativeElement as HTMLElement;
        expect(el.getAttribute('data-slot')).toBe('scroll-area');
    });

    it('should set custom scrollbar CSS style variables on host', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="scroll-area-hlm"]')).nativeElement as HTMLElement;
        expect(el.style.getPropertyValue('--scrollbar-thumb-color')).toBe('var(--border)');
        expect(el.style.getPropertyValue('--scrollbar-thumb-hover-color')).toBe('var(--border)');
        expect(el.style.getPropertyValue('--scrollbar-track-color')).toBe('transparent');
        expect(el.style.getPropertyValue('--scrollbar-track-thickness')).toBe('0.625rem');
        expect(el.style.getPropertyValue('--scrollbar-track-offset')).toBe('1.5px');
    });

    it('should apply rounded-md [--scrollbar-thumb-shape:9999px] block classes and preserve user classes', () => {
        const el = fixture.debugElement.query(By.css('[data-testid="scroll-area-hlm"]')).nativeElement as HTMLElement;
        expect(el.classList.contains('rounded-md')).toBe(true);
        expect(el.classList.contains('[--scrollbar-thumb-shape:9999px]')).toBe(true);
        expect(el.classList.contains('block')).toBe(true);
        expect(el.classList.contains('custom-class')).toBe(true);
    });
});
