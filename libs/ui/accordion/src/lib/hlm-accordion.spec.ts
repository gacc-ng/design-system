import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmAccordionImports } from '../index';

@Component({
    imports: [HlmAccordionImports],
    template: `
        <hlm-accordion>
            <hlm-accordion-item>
                <hlm-accordion-trigger>Question 1</hlm-accordion-trigger>
                <hlm-accordion-content>Answer 1</hlm-accordion-content>
            </hlm-accordion-item>
            <hlm-accordion-item>
                <hlm-accordion-trigger>Question 2</hlm-accordion-trigger>
                <hlm-accordion-content>Answer 2</hlm-accordion-content>
            </hlm-accordion-item>
        </hlm-accordion>
    `,
})
class TestHostComponent {}

describe('HlmAccordion', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render accordion with correct slots', () => {
        const accordionEl = fixture.debugElement.query(By.css('[data-slot="accordion"]'));
        expect(accordionEl).toBeTruthy();

        const items = fixture.debugElement.queryAll(By.css('[data-slot="accordion-item"]'));
        expect(items.length).toBe(2);

        const triggers = fixture.debugElement.queryAll(By.css('[data-slot="accordion-trigger"]'));
        expect(triggers.length).toBe(2);
    });

    it('should expand item when trigger is clicked', async () => {
        const triggers = fixture.debugElement.queryAll(By.css('[data-slot="accordion-trigger"]'));
        triggers[0].nativeElement.click();
        fixture.detectChanges();
        await fixture.whenStable();

        const items = fixture.debugElement.queryAll(By.css('[data-slot="accordion-item"]'));
        expect(items[0].nativeElement.getAttribute('data-state')).toBe('open');
    });
});
