import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it, vi } from 'vitest';

import { HlmSelectImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmSelectImports],
    template: `
        <hlm-select>
            <hlm-select-trigger class="w-56" data-testid="select-trigger">
                <hlm-select-value placeholder="Select an option" data-testid="select-value" />
            </hlm-select-trigger>
            <hlm-select-content *hlmSelectPortal data-testid="select-content">
                <hlm-select-group data-testid="select-group">
                    <hlm-select-label data-testid="select-label">Options</hlm-select-label>
                    <hlm-select-item value="opt1" data-testid="select-item-1">Option 1</hlm-select-item>
                    <hlm-select-item value="opt2" data-testid="select-item-2">Option 2</hlm-select-item>
                </hlm-select-group>
            </hlm-select-content>
        </hlm-select>
    `,
})
class TestSelectHostComponent {}

describe('HlmSelect Primitives', () => {
    let fixture: ComponentFixture<TestSelectHostComponent>;

    beforeAll(() => {
        globalThis.ResizeObserver = class {
            public observe = vi.fn();
            public unobserve = vi.fn();
            public disconnect = vi.fn();
        } as unknown as typeof ResizeObserver;
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestSelectHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestSelectHostComponent);
        fixture.detectChanges();
    });

    it('should render select container with data-slot', () => {
        const select = fixture.debugElement.query(By.css('hlm-select'));
        expect(select).toBeTruthy();
        expect(select.nativeElement.getAttribute('data-slot')).toBe('select');
    });

    it('should render trigger with correct attribute and classes', () => {
        const trigger = fixture.debugElement.query(By.css('[data-testid="select-trigger"] button'));
        expect(trigger).toBeTruthy();
        expect(trigger.nativeElement.getAttribute('data-slot')).toBe('select-trigger');
        expect(trigger.nativeElement.className).toContain('border-input');
    });

    it('should render value placeholder with data-slot', () => {
        const value = fixture.debugElement.query(By.css('[data-testid="select-value"]'));
        expect(value).toBeTruthy();
        expect(value.nativeElement.getAttribute('data-slot')).toBe('select-value');
    });
});
