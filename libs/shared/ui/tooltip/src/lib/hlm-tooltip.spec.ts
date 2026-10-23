import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmTooltip, HlmTooltipImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmTooltipImports],
    template: ` <button [hlmTooltip]="'Simple tooltip message'" data-testid="tooltip-trigger">Hover me</button> `,
})
class TestTooltipHostComponent {}

describe('HlmTooltip Primitive', () => {
    let fixture: ComponentFixture<TestTooltipHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestTooltipHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestTooltipHostComponent);
        fixture.detectChanges();
    });

    it('should attach hlmTooltip directive to host element', () => {
        const trigger = fixture.debugElement.query(By.css('[data-testid="tooltip-trigger"]'));
        expect(trigger).toBeTruthy();
        const directiveInstance = trigger.injector.get(HlmTooltip, null);
        expect(directiveInstance).toBeTruthy();
    });
});
