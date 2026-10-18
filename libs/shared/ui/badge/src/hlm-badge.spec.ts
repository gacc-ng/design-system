import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmBadge } from './hlm-badge';

@Component({
    standalone: true,
    imports: [HlmBadge],
    template: `
        <span hlmBadge>Default Badge</span>
        <span hlmBadge variant="secondary">Secondary Badge</span>
        <span hlmBadge variant="destructive">Destructive Badge</span>
        <span hlmBadge variant="outline">Outline Badge</span>
    `,
})
class TestHostComponent {}

describe('HlmBadge', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create and apply default variant classes', () => {
        const badges = fixture.debugElement.queryAll(By.directive(HlmBadge));
        const defaultBadge = badges[0].nativeElement as HTMLSpanElement;

        expect(defaultBadge).toBeTruthy();
        expect(defaultBadge.getAttribute('data-slot')).toBe('badge');
        expect(defaultBadge.getAttribute('data-variant')).toBe('default');
        expect(defaultBadge.className).toContain('bg-primary');
        expect(defaultBadge.className).toContain('text-primary-foreground');
        expect(defaultBadge.className).toContain('rounded-full');
    });

    it('should apply secondary variant classes', () => {
        const badges = fixture.debugElement.queryAll(By.directive(HlmBadge));
        const secondaryBadge = badges[1].nativeElement as HTMLSpanElement;

        expect(secondaryBadge.getAttribute('data-variant')).toBe('secondary');
        expect(secondaryBadge.className).toContain('bg-secondary');
        expect(secondaryBadge.className).toContain('text-secondary-foreground');
    });

    it('should apply destructive variant classes', () => {
        const badges = fixture.debugElement.queryAll(By.directive(HlmBadge));
        const destructiveBadge = badges[2].nativeElement as HTMLSpanElement;

        expect(destructiveBadge.getAttribute('data-variant')).toBe('destructive');
        expect(destructiveBadge.className).toContain('bg-destructive');
        expect(destructiveBadge.className).toContain('text-destructive-foreground');
    });

    it('should apply outline variant classes', () => {
        const badges = fixture.debugElement.queryAll(By.directive(HlmBadge));
        const outlineBadge = badges[3].nativeElement as HTMLSpanElement;

        expect(outlineBadge.getAttribute('data-variant')).toBe('outline');
        expect(outlineBadge.className).toContain('border-border');
        expect(outlineBadge.className).toContain('text-foreground');
    });
});
