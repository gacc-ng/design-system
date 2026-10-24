import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { HlmInput } from '@gacc-ng/ui/input';

import { HlmFieldImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmFieldImports, HlmInput],
    template: `
        <div hlmField [orientation]="orientation()">
            <label hlmFieldLabel for="test-input">Test Label</label>
            <input hlmInput id="test-input" />
            <p hlmFieldDescription id="test-desc">Help text</p>
            <hlm-field-error [forceShow]="showError()">Error message</hlm-field-error>
        </div>
    `,
})
class TestFieldComponent {
    public readonly orientation = signal<'vertical' | 'horizontal' | 'responsive'>('vertical');
    public readonly showError = signal(false);
}

describe('HlmField', () => {
    let fixture: ComponentFixture<TestFieldComponent>;
    let component: TestFieldComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestFieldComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create and render with vertical orientation by default', () => {
        const fieldEl: HTMLElement = fixture.nativeElement.querySelector('[hlmField]');
        expect(fieldEl).toBeTruthy();
        expect(fieldEl.getAttribute('data-orientation')).toBe('vertical');
        expect(fieldEl.getAttribute('data-slot')).toBe('field');
    });

    it('should update orientation attribute when input changes', () => {
        component.orientation.set('horizontal');
        fixture.detectChanges();

        const fieldEl: HTMLElement = fixture.nativeElement.querySelector('[hlmField]');
        expect(fieldEl.getAttribute('data-orientation')).toBe('horizontal');
    });

    it('should display error message when forceShow is true', () => {
        component.showError.set(true);
        fixture.detectChanges();

        const errorEl: HTMLElement = fixture.nativeElement.querySelector('hlm-field-error');
        expect(errorEl).toBeTruthy();
        expect(errorEl.textContent?.trim()).toBe('Error message');
    });
});
