import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmAlertImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmAlertImports],
    template: `
        <hlm-alert data-testid="default-alert">
            <h4 hlmAlertTitle data-testid="alert-title">Default Alert</h4>
            <p hlmAlertDescription data-testid="alert-desc">This is a default informative message.</p>
            <div hlmAlertAction data-testid="alert-action">Action</div>
        </hlm-alert>

        <hlm-alert variant="destructive" data-testid="destructive-alert">
            <h4 hlmAlertTitle>Error Alert</h4>
            <p hlmAlertDescription>Something went wrong.</p>
        </hlm-alert>
    `,
})
class TestAlertHostComponent {}

describe('HlmAlert Primitives', () => {
    let fixture: ComponentFixture<TestAlertHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestAlertHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestAlertHostComponent);
        fixture.detectChanges();
    });

    it('should render alert container with correct attributes and classes', () => {
        const alertEl = fixture.debugElement.query(By.css('[data-testid="default-alert"]'))
            .nativeElement as HTMLElement;
        expect(alertEl.getAttribute('data-slot')).toBe('alert');
        expect(alertEl.getAttribute('role')).toBe('alert');
        expect(alertEl.className).toContain('rounded-lg');
        expect(alertEl.className).toContain('bg-card');
        expect(alertEl.className).toContain('text-card-foreground');
    });

    it('should apply destructive variant styling', () => {
        const alertEl = fixture.debugElement.query(By.css('[data-testid="destructive-alert"]'))
            .nativeElement as HTMLElement;
        expect(alertEl.className).toContain('text-destructive');
    });

    it('should render alert title, description, and action with correct data-slots', () => {
        const titleEl = fixture.debugElement.query(By.css('[data-testid="alert-title"]')).nativeElement as HTMLElement;
        const descEl = fixture.debugElement.query(By.css('[data-testid="alert-desc"]')).nativeElement as HTMLElement;
        const actionEl = fixture.debugElement.query(By.css('[data-testid="alert-action"]'))
            .nativeElement as HTMLElement;

        expect(titleEl.getAttribute('data-slot')).toBe('alert-title');
        expect(descEl.getAttribute('data-slot')).toBe('alert-description');
        expect(actionEl.getAttribute('data-slot')).toBe('alert-action');

        expect(titleEl.className).toContain('font-medium');
        expect(descEl.className).toContain('text-muted-foreground');
        expect(actionEl.className).toContain('absolute');
    });
});
