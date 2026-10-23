import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmToggleGroupImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmToggleGroupImports],
    template: `
        <hlm-toggle-group data-testid="test-toggle-group" variant="outline">
            <button hlmToggleGroupItem value="left" data-testid="item-left">Left</button>
            <button hlmToggleGroupItem value="center" data-testid="item-center">Center</button>
            <button hlmToggleGroupItem value="right" data-testid="item-right">Right</button>
        </hlm-toggle-group>
    `,
})
class TestToggleGroupHostComponent {}

describe('HlmToggleGroup Primitive', () => {
    let fixture: ComponentFixture<TestToggleGroupHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestToggleGroupHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestToggleGroupHostComponent);
        fixture.detectChanges();
    });

    it('should render toggle group container with data-slot', () => {
        const groupEl = fixture.debugElement.query(By.css('[data-testid="test-toggle-group"]'))
            .nativeElement as HTMLElement;
        expect(groupEl.getAttribute('data-slot')).toBe('toggle-group');
        expect(groupEl.className).toContain('group/toggle-group');
    });

    it('should render toggle group items with proper slots and inherit variant', () => {
        const itemLeft = fixture.debugElement.query(By.css('[data-testid="item-left"]')).nativeElement as HTMLElement;
        expect(itemLeft.getAttribute('data-slot')).toBe('toggle-group-item');
        expect(itemLeft.getAttribute('data-variant')).toBe('outline');
    });
});
