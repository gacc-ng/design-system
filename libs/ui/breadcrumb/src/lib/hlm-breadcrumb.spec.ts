import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { describe, expect, it } from 'vitest';

import { HlmBreadcrumbImports } from '../index';

@Component({
    imports: [HlmBreadcrumbImports],
    template: `
        <nav hlmBreadcrumb aria-label="Breadcrumb">
            <ol hlmBreadcrumbList>
                <li hlmBreadcrumbItem>
                    <a hlmBreadcrumbLink link="/">Home</a>
                </li>
                <li hlmBreadcrumbSeparator></li>
                <li hlmBreadcrumbItem>
                    <hlm-breadcrumb-ellipsis />
                </li>
                <li hlmBreadcrumbSeparator></li>
                <li hlmBreadcrumbItem>
                    <span hlmBreadcrumbPage>Current</span>
                </li>
            </ol>
        </nav>
    `,
})
class TestHostComponent {}

describe('HlmBreadcrumb', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render breadcrumb navigation with proper accessibility attributes', () => {
        const navEl = fixture.debugElement.query(By.css('[data-slot="breadcrumb"]'));
        expect(navEl).toBeTruthy();
        expect(navEl.nativeElement.getAttribute('aria-label')).toBe('Breadcrumb');

        const listEl = fixture.debugElement.query(By.css('[data-slot="breadcrumb-list"]'));
        expect(listEl).toBeTruthy();

        const items = fixture.debugElement.queryAll(By.css('[data-slot="breadcrumb-item"]'));
        expect(items.length).toBe(3);

        const linkEl = fixture.debugElement.query(By.css('[data-slot="breadcrumb-link"]'));
        expect(linkEl).toBeTruthy();

        const ellipsisEl = fixture.debugElement.query(By.css('[data-slot="breadcrumb-ellipsis"]'));
        expect(ellipsisEl).toBeTruthy();

        const pageEl = fixture.debugElement.query(By.css('[data-slot="breadcrumb-page"]'));
        expect(pageEl).toBeTruthy();
        expect(pageEl.nativeElement.getAttribute('aria-current')).toBe('page');
    });
});
