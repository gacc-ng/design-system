import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { toast } from '@spartan-ng/brain/sonner';
import { describe, expect, it, vi } from 'vitest';

import { HlmToaster, HlmToasterImports } from './hlm-toaster';

@Component({
    standalone: true,
    imports: [HlmToasterImports],
    template: ` <hlm-toaster position="top-center" [richColors]="true" data-testid="toaster" /> `,
})
class TestHostComponent {}

describe('HlmToaster', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: (query: string) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: () => false,
            }),
        });
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should instantiate toaster component and accept signal inputs', () => {
        const toasterComponent = fixture.debugElement.query(By.directive(HlmToaster)).componentInstance as HlmToaster;

        expect(toasterComponent).toBeTruthy();
        expect(toasterComponent.position()).toBe('top-center');
        expect(toasterComponent.richColors()).toBe(true);
        expect(toasterComponent.duration()).toBe(4000);
    });

    it('should allow invoking toast API without runtime error', () => {
        expect(() => {
            toast('Test notification');
        }).not.toThrow();
    });
});
