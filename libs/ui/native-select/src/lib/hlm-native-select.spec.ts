import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { beforeEach, describe, expect, it } from 'vitest';

import { HlmNativeSelectImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmNativeSelectImports, FormsModule],
    template: `
        <hlm-native-select data-testid="select-host" [(ngModel)]="selectedValue" [disabled]="isDisabled">
            <option hlmNativeSelectOption value="">Select status</option>
            <optgroup hlmNativeSelectOptGroup label="Active" data-testid="optgroup">
                <option hlmNativeSelectOption value="todo" data-testid="option-todo">Todo</option>
                <option hlmNativeSelectOption value="done" data-testid="option-done">Done</option>
            </optgroup>
        </hlm-native-select>
    `,
})
class TestNativeSelectHostComponent {
    public selectedValue = '';
    public isDisabled = false;
}

describe('HlmNativeSelect Primitives', () => {
    let fixture: ComponentFixture<TestNativeSelectHostComponent>;
    let component: TestNativeSelectHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestNativeSelectHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestNativeSelectHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render wrapper and select with correct data-slots', () => {
        const wrapperEl = fixture.debugElement.query(By.css('[data-testid="select-host"]'))
            .nativeElement as HTMLElement;
        expect(wrapperEl.getAttribute('data-slot')).toBe('native-select-wrapper');

        const selectEl = fixture.debugElement.query(By.css('select')).nativeElement as HTMLSelectElement;
        expect(selectEl.getAttribute('data-slot')).toBe('native-select');
    });

    it('should render options and optgroups with proper data-slots', () => {
        const optgroupEl = fixture.debugElement.query(By.css('[data-testid="optgroup"]')).nativeElement as HTMLElement;
        expect(optgroupEl.getAttribute('data-slot')).toBe('native-select-optgroup');

        const optionEl = fixture.debugElement.query(By.css('[data-testid="option-todo"]')).nativeElement as HTMLElement;
        expect(optionEl.getAttribute('data-slot')).toBe('native-select-option');
    });

    it('should update model value on select change', async () => {
        const selectEl = fixture.debugElement.query(By.css('select')).nativeElement as HTMLSelectElement;
        selectEl.value = 'done';
        selectEl.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.selectedValue).toBe('done');
    });

    it('should apply disabled attribute when disabled is true', async () => {
        component.isDisabled = true;
        fixture.detectChanges();
        await fixture.whenStable();

        const selectEl = fixture.debugElement.query(By.css('select')).nativeElement as HTMLSelectElement;
        expect(selectEl.disabled).toBe(true);
    });
});
