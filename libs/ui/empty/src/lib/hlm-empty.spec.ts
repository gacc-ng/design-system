import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmEmpty } from './hlm-empty';
import { HlmEmptyContent } from './hlm-empty-content';
import { HlmEmptyDescription } from './hlm-empty-description';
import { HlmEmptyHeader } from './hlm-empty-header';
import { HlmEmptyMedia } from './hlm-empty-media';
import { HlmEmptyTitle } from './hlm-empty-title';

@Component({
    standalone: true,
    imports: [HlmEmpty, HlmEmptyHeader, HlmEmptyMedia, HlmEmptyTitle, HlmEmptyDescription, HlmEmptyContent],
    template: `
        <hlm-empty>
            <hlm-empty-header>
                <hlm-empty-media variant="icon">
                    <span class="icon-stub">Icon</span>
                </hlm-empty-media>
                <div hlmEmptyTitle>No Projects</div>
                <div hlmEmptyDescription>You have not created any projects yet.</div>
            </hlm-empty-header>
            <hlm-empty-content>
                <button type="button">Create Project</button>
            </hlm-empty-content>
        </hlm-empty>
    `,
})
class TestHostComponent {}

describe('HlmEmpty', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create and render empty state with correct data-slot attributes and classes', () => {
        const emptyEl = fixture.debugElement.query(By.directive(HlmEmpty)).nativeElement as HTMLElement;
        const headerEl = fixture.debugElement.query(By.directive(HlmEmptyHeader)).nativeElement as HTMLElement;
        const mediaEl = fixture.debugElement.query(By.directive(HlmEmptyMedia)).nativeElement as HTMLElement;
        const titleEl = fixture.debugElement.query(By.directive(HlmEmptyTitle)).nativeElement as HTMLElement;
        const descEl = fixture.debugElement.query(By.directive(HlmEmptyDescription)).nativeElement as HTMLElement;
        const contentEl = fixture.debugElement.query(By.directive(HlmEmptyContent)).nativeElement as HTMLElement;

        expect(emptyEl).toBeTruthy();
        expect(emptyEl.getAttribute('data-slot')).toBe('empty');
        expect(emptyEl.className).toContain('border-dashed');

        expect(headerEl).toBeTruthy();
        expect(headerEl.getAttribute('data-slot')).toBe('empty-header');

        expect(mediaEl).toBeTruthy();
        expect(mediaEl.getAttribute('data-slot')).toBe('empty-media');
        expect(mediaEl.getAttribute('data-variant')).toBe('icon');
        expect(mediaEl.className).toContain('bg-muted');

        expect(titleEl).toBeTruthy();
        expect(titleEl.getAttribute('data-slot')).toBe('empty-title');
        expect(titleEl.className).toContain('font-medium');

        expect(descEl).toBeTruthy();
        expect(descEl.getAttribute('data-slot')).toBe('empty-description');

        expect(contentEl).toBeTruthy();
        expect(contentEl.getAttribute('data-slot')).toBe('empty-content');
    });
});
