import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmCollapsibleImports } from '../index';

@Component({
    imports: [HlmCollapsibleImports],
    template: `
        <hlm-collapsible>
            <button hlmCollapsibleTrigger>Toggle</button>
            <hlm-collapsible-content>Collapsible content text</hlm-collapsible-content>
        </hlm-collapsible>
    `,
})
class TestHostComponent {}

describe('HlmCollapsible', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render collapsible with trigger and content', () => {
        const collapsibleEl = fixture.debugElement.query(By.css('[data-slot="collapsible"]'));
        expect(collapsibleEl).toBeTruthy();

        const triggerEl = fixture.debugElement.query(By.css('[data-slot="collapsible-trigger"]'));
        expect(triggerEl).toBeTruthy();

        const contentEl = fixture.debugElement.query(By.css('[data-slot="collapsible-content"]'));
        expect(contentEl).toBeTruthy();
    });

    it('should toggle content visibility on click', async () => {
        const triggerEl = fixture.debugElement.query(By.css('[data-slot="collapsible-trigger"]'));
        const contentEl = fixture.debugElement.query(By.css('[data-slot="collapsible-content"]'));

        expect(contentEl.nativeElement.classList.contains('data-[state=closed]:hidden')).toBe(true);

        triggerEl.nativeElement.click();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(contentEl.nativeElement.getAttribute('data-state')).toBe('open');
    });
});
