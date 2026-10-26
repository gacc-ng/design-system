import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideNativeDateAdapter } from '@spartan-ng/brain/date-time';
import { beforeEach, describe, expect, it } from 'vitest';

import { HlmCalendarImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmCalendarImports],
    template: ` <hlm-calendar data-testid="calendar-root" [(date)]="selectedDate" /> `,
})
class TestCalendarHostComponent {
    public selectedDate = new Date(2026, 9, 25);
}

describe('HlmCalendar Primitives', () => {
    let fixture: ComponentFixture<TestCalendarHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestCalendarHostComponent],
            providers: [provideNativeDateAdapter()],
        }).compileComponents();

        fixture = TestBed.createComponent(TestCalendarHostComponent);
        fixture.detectChanges();
    });

    it('should render calendar root with data-slot', () => {
        const rootEl = fixture.debugElement.query(By.css('[data-testid="calendar-root"]')).nativeElement as HTMLElement;
        expect(rootEl.getAttribute('data-slot')).toBe('calendar');
    });

    it('should render navigation buttons', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button'));
        expect(buttons.length).toBeGreaterThan(2);
    });
});
