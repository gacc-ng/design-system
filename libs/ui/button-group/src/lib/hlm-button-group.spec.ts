import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { beforeEach, describe, expect, it } from 'vitest';

import { HlmButtonGroupImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmButtonGroupImports],
    template: `
        <div hlmButtonGroup data-testid="default-group" [orientation]="orientation()">
            <button data-testid="btn-1">Button 1</button>
            <hlm-button-group-separator data-testid="separator" />
            <button data-testid="btn-2">Button 2</button>
            <span hlmButtonGroupText data-testid="group-text">Prefix</span>
        </div>
    `,
})
class TestButtonGroupHostComponent {
    public readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
}

describe('HlmButtonGroup Primitives', () => {
    let fixture: ComponentFixture<TestButtonGroupHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestButtonGroupHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestButtonGroupHostComponent);
        fixture.detectChanges();
    });

    it('should render button group with proper data-slot and orientation', () => {
        const groupEl = fixture.debugElement.query(By.css('[data-testid="default-group"]'))
            .nativeElement as HTMLElement;
        expect(groupEl.getAttribute('data-slot')).toBe('button-group');
        expect(groupEl.getAttribute('data-orientation')).toBe('horizontal');
        expect(groupEl.getAttribute('role')).toBe('group');
    });

    it('should update orientation attribute when input signal changes', () => {
        fixture.componentInstance.orientation.set('vertical');
        fixture.detectChanges();

        const groupEl = fixture.debugElement.query(By.css('[data-testid="default-group"]'))
            .nativeElement as HTMLElement;
        expect(groupEl.getAttribute('data-orientation')).toBe('vertical');
    });

    it('should render button group separator and text with proper attributes', () => {
        const sepEl = fixture.debugElement.query(By.css('[data-testid="separator"]')).nativeElement as HTMLElement;
        expect(sepEl.getAttribute('data-slot')).toBe('button-group-separator');

        const textEl = fixture.debugElement.query(By.css('[data-testid="group-text"]')).nativeElement as HTMLElement;
        expect(textEl.getAttribute('data-slot')).toBe('button-group-text');
        expect(textEl.className).toContain('bg-muted');
    });
});
