import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmCarouselImports } from './hlm-carousel';

@Component({
    imports: [HlmCarouselImports],
    template: `
        <hlm-carousel class="max-w-xs" [orientation]="orientation">
            <hlm-carousel-content>
                <hlm-carousel-item>Slide 1</hlm-carousel-item>
                <hlm-carousel-item>Slide 2</hlm-carousel-item>
            </hlm-carousel-content>
            <button hlm-carousel-previous>
                <span>Previous</span>
            </button>
            <button hlm-carousel-next>
                <span>Next</span>
            </button>
            <hlm-carousel-slide-display />
        </hlm-carousel>
    `,
})
class TestHostComponent {
    orientation: 'horizontal' | 'vertical' = 'horizontal';
}

describe('HlmCarousel', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeAll(() => {
        class MockIntersectionObserver {
            observe = vi.fn();
            unobserve = vi.fn();
            disconnect = vi.fn();
        }
        Object.defineProperty(window, 'IntersectionObserver', {
            writable: true,
            value: MockIntersectionObserver,
        });

        class MockResizeObserver {
            observe = vi.fn();
            unobserve = vi.fn();
            disconnect = vi.fn();
        }
        Object.defineProperty(window, 'ResizeObserver', {
            writable: true,
            value: MockResizeObserver,
        });

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create carousel container with ARIA attributes and data-slot', () => {
        const carouselEl = fixture.debugElement.query(By.css('[data-slot="carousel"]'));
        expect(carouselEl).toBeTruthy();
        expect(carouselEl.nativeElement.getAttribute('role')).toBe('region');
        expect(carouselEl.nativeElement.getAttribute('aria-roledescription')).toBe('carousel');
    });

    it('should render content and slides with correct accessibility roles', () => {
        const contentEl = fixture.debugElement.query(By.css('[data-slot="carousel-content"]'));
        expect(contentEl).toBeTruthy();
        expect(contentEl.nativeElement.classList.contains('flex')).toBe(true);

        const items = fixture.debugElement.queryAll(By.css('[data-slot="carousel-item"]'));
        expect(items.length).toBe(2);
        expect(items[0].nativeElement.getAttribute('role')).toBe('group');
        expect(items[0].nativeElement.getAttribute('aria-roledescription')).toBe('slide');
    });

    it('should render previous and next buttons with data slots', () => {
        const prevBtn = fixture.debugElement.query(By.css('[data-slot="carousel-previous"]'));
        const nextBtn = fixture.debugElement.query(By.css('[data-slot="carousel-next"]'));

        expect(prevBtn).toBeTruthy();
        expect(nextBtn).toBeTruthy();
        expect(prevBtn.nativeElement.querySelector('.sr-only')?.textContent).toContain('Previous slide');
        expect(nextBtn.nativeElement.querySelector('.sr-only')?.textContent).toContain('Next slide');
    });

    it('should render slide display indicator with screen-reader text', () => {
        const displayEl = fixture.debugElement.query(By.css('[data-slot="carousel-slide-display"]'));
        expect(displayEl).toBeTruthy();
        const srOnly = displayEl.nativeElement.querySelector('.sr-only');
        expect(srOnly).toBeTruthy();
    });
});
