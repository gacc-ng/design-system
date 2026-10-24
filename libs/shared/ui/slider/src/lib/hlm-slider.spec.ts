import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it, vi } from 'vitest';

import { HlmSliderImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmSliderImports],
    template: ` <hlm-slider [value]="val()" data-testid="slider" /> `,
})
class TestSliderHostComponent {
    public readonly val = signal([50]);
}

describe('HlmSlider Primitive', () => {
    let fixture: ComponentFixture<TestSliderHostComponent>;

    beforeAll(() => {
        globalThis.ResizeObserver = class {
            public observe = vi.fn();
            public unobserve = vi.fn();
            public disconnect = vi.fn();
        } as unknown as typeof ResizeObserver;
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestSliderHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestSliderHostComponent);
        fixture.detectChanges();
    });

    it('should render slider element with correct classes', () => {
        const slider = fixture.debugElement.query(By.css('[data-testid="slider"]'));
        expect(slider).toBeTruthy();
        expect(slider.nativeElement.className).toContain('touch-none');
    });

    it('should render track and thumb', () => {
        const track = fixture.debugElement.query(By.css('[brnSliderTrack]'));
        const thumb = fixture.debugElement.query(By.css('[brnSliderThumb]'));
        expect(track).toBeTruthy();
        expect(thumb).toBeTruthy();
    });
});
