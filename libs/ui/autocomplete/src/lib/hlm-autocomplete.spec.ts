import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { beforeEach, describe, expect, it } from 'vitest';

import { HlmAutocompleteImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmAutocompleteImports],
    template: `
        <hlm-autocomplete data-testid="autocomplete-root">
            <hlm-autocomplete-input placeholder="Search options..." data-testid="autocomplete-input" />
            <hlm-autocomplete-content *hlmAutocompletePortal>
                <hlm-autocomplete-empty data-testid="autocomplete-empty">No options found.</hlm-autocomplete-empty>
                <div hlmAutocompleteList data-testid="autocomplete-list">
                    <hlm-autocomplete-item [value]="'angular'" data-testid="autocomplete-item"
                        >Angular</hlm-autocomplete-item
                    >
                </div>
            </hlm-autocomplete-content>
        </hlm-autocomplete>
    `,
})
class TestAutocompleteHostComponent {}

describe('HlmAutocomplete Primitives', () => {
    let fixture: ComponentFixture<TestAutocompleteHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestAutocompleteHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestAutocompleteHostComponent);
        fixture.detectChanges();
    });

    it('should render autocomplete root with data-slot', () => {
        const rootEl = fixture.debugElement.query(By.css('[data-testid="autocomplete-root"]'))
            .nativeElement as HTMLElement;
        expect(rootEl.getAttribute('data-slot')).toBe('autocomplete');
    });

    it('should render autocomplete input with inner control and search icon', () => {
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
        expect(inputEl.getAttribute('data-slot')).toBe('input-group-control');
        expect(inputEl.placeholder).toBe('Search options...');
    });
});
