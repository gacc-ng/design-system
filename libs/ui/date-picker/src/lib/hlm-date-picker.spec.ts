import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideNativeDateAdapter } from '@spartan-ng/brain/date-time';

import { HlmDatePickerImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmDatePickerImports],
    template: `
        <hlm-date-picker [date]="date()">
            <hlm-date-picker-trigger buttonId="test-trigger">Select date</hlm-date-picker-trigger>
        </hlm-date-picker>
    `,
})
class TestHostComponent {
    public date = signal<Date | null>(new Date(2025, 0, 15));
}

describe('HlmDatePicker', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [provideNativeDateAdapter()],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile and render the trigger with formatted date', () => {
        const trigger = fixture.nativeElement.querySelector('#test-trigger');
        expect(trigger).toBeTruthy();
        expect(trigger.textContent).toContain('2025');
    });

    it('should display fallback content when date is null or undefined', () => {
        host.date.set(null);
        fixture.detectChanges();
        const trigger = fixture.nativeElement.querySelector('#test-trigger');
        expect(trigger.textContent).toContain('Select date');
    });
});
