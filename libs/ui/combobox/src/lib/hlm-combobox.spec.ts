import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { beforeEach, describe, expect, it } from 'vitest';

import { HlmComboboxImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmComboboxImports],
    template: `
        <hlm-combobox data-testid="combobox-root">
            <hlm-combobox-input placeholder="Select item..." data-testid="combobox-input" />
            <hlm-combobox-content *hlmComboboxPortal>
                <hlm-combobox-empty data-testid="combobox-empty">No results found.</hlm-combobox-empty>
                <div hlmComboboxList data-testid="combobox-list">
                    <hlm-combobox-item [value]="'angular'" data-testid="combobox-item">Angular</hlm-combobox-item>
                </div>
            </hlm-combobox-content>
        </hlm-combobox>
    `,
})
class TestComboboxHostComponent {}

describe('HlmCombobox Primitives', () => {
    let fixture: ComponentFixture<TestComboboxHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComboboxHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComboboxHostComponent);
        fixture.detectChanges();
    });

    it('should render combobox root with data-slot', () => {
        const rootEl = fixture.debugElement.query(By.css('[data-testid="combobox-root"]')).nativeElement as HTMLElement;
        expect(rootEl.getAttribute('data-slot')).toBe('combobox');
    });

    it('should render combobox input with inner control and trigger button', () => {
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
        expect(inputEl.getAttribute('data-slot')).toBe('input-group-control');
        expect(inputEl.placeholder).toBe('Select item...');

        const triggerBtn = fixture.debugElement.query(By.css('[data-slot="input-group-button"]'))
            .nativeElement as HTMLElement;
        expect(triggerBtn).toBeDefined();
    });
});
