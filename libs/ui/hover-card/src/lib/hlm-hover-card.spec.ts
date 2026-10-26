import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmHoverCard, HlmHoverCardImports } from './hlm-hover-card';
import { HlmHoverCardTrigger } from './hlm-hover-card-trigger';

@Component({
    standalone: true,
    imports: [HlmHoverCardImports],
    template: `
        <hlm-hover-card data-testid="hover-card-host">
            <button hlmHoverCardTrigger data-testid="trigger">Hover me</button>
            <hlm-hover-card-content *hlmHoverCardPortal data-testid="content"> Preview content </hlm-hover-card-content>
        </hlm-hover-card>
    `,
})
class TestHostComponent {}

describe('HlmHoverCard', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should instantiate hover card directives with data-slots', () => {
        const hostEl = fixture.debugElement.query(By.directive(HlmHoverCard)).nativeElement as HTMLElement;
        const triggerEl = fixture.debugElement.query(By.directive(HlmHoverCardTrigger)).nativeElement as HTMLElement;

        expect(hostEl.getAttribute('data-slot')).toBe('hover-card');
        expect(triggerEl.getAttribute('data-slot')).toBe('hover-card-trigger');
    });
});
