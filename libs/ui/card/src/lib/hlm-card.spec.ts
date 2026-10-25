import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmCardImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmCardImports],
    template: `
        <hlm-card data-testid="default-card">
            <hlm-card-header data-testid="card-header">
                <h3 hlmCardTitle data-testid="card-title">Card Title</h3>
                <p hlmCardDescription data-testid="card-description">Card Description</p>
                <div hlmCardAction data-testid="card-action">Action</div>
            </hlm-card-header>
            <div hlmCardContent data-testid="card-content">Main Card Content</div>
            <hlm-card-footer data-testid="card-footer">Footer Content</hlm-card-footer>
        </hlm-card>

        <hlm-card size="sm" data-testid="sm-card">
            <div hlmCardContent>Small Card Content</div>
        </hlm-card>
    `,
})
class TestCardHostComponent {}

describe('HlmCard Primitives', () => {
    let fixture: ComponentFixture<TestCardHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestCardHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestCardHostComponent);
        fixture.detectChanges();
    });

    it('should render card with proper data-slot and styling', () => {
        const cardEl = fixture.debugElement.query(By.css('[data-testid="default-card"]')).nativeElement as HTMLElement;
        expect(cardEl.getAttribute('data-slot')).toBe('card');
        expect(cardEl.className).toContain('bg-card');
        expect(cardEl.className).toContain('text-card-foreground');
        expect(cardEl.className).toContain('rounded-2xl');
    });

    it('should support size attribute', () => {
        const smCardEl = fixture.debugElement.query(By.css('[data-testid="sm-card"]')).nativeElement as HTMLElement;
        expect(smCardEl.getAttribute('data-size')).toBe('sm');
    });

    it('should render card subcomponents with proper data-slots', () => {
        const header = fixture.debugElement.query(By.css('[data-testid="card-header"]')).nativeElement as HTMLElement;
        const title = fixture.debugElement.query(By.css('[data-testid="card-title"]')).nativeElement as HTMLElement;
        const desc = fixture.debugElement.query(By.css('[data-testid="card-description"]'))
            .nativeElement as HTMLElement;
        const action = fixture.debugElement.query(By.css('[data-testid="card-action"]')).nativeElement as HTMLElement;
        const content = fixture.debugElement.query(By.css('[data-testid="card-content"]')).nativeElement as HTMLElement;
        const footer = fixture.debugElement.query(By.css('[data-testid="card-footer"]')).nativeElement as HTMLElement;

        expect(header.getAttribute('data-slot')).toBe('card-header');
        expect(title.getAttribute('data-slot')).toBe('card-title');
        expect(desc.getAttribute('data-slot')).toBe('card-description');
        expect(action.getAttribute('data-slot')).toBe('card-action');
        expect(content.getAttribute('data-slot')).toBe('card-content');
        expect(footer.getAttribute('data-slot')).toBe('card-footer');

        expect(desc.className).toContain('text-muted-foreground');
    });
});
