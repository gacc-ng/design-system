import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmNavigationMenu, HlmNavigationMenuImports } from './hlm-navigation-menu';
import { HlmNavigationMenuItem } from './hlm-navigation-menu-item';
import { HlmNavigationMenuLink } from './hlm-navigation-menu-link';
import { HlmNavigationMenuList } from './hlm-navigation-menu-list';
import { HlmNavigationMenuTrigger } from './hlm-navigation-menu-trigger';

@Component({
    standalone: true,
    imports: [HlmNavigationMenuImports],
    template: `
        <nav hlmNavigationMenu data-testid="nav">
            <ul hlmNavigationMenuList data-testid="list">
                <li hlmNavigationMenuItem data-testid="item-1">
                    <button hlmNavigationMenuTrigger data-testid="trigger">Getting started</button>
                    <hlm-navigation-menu-content *hlmNavigationMenuPortal data-testid="content">
                        Content Area
                    </hlm-navigation-menu-content>
                </li>
                <li hlmNavigationMenuItem data-testid="item-2">
                    <a hlmNavigationMenuLink href="/docs" data-testid="link">Docs</a>
                </li>
            </ul>
        </nav>
    `,
})
class TestHostComponent {}

describe('HlmNavigationMenu', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should instantiate navigation menu directives with data-slot attributes', () => {
        const navEl = fixture.debugElement.query(By.directive(HlmNavigationMenu)).nativeElement as HTMLElement;
        const listEl = fixture.debugElement.query(By.directive(HlmNavigationMenuList)).nativeElement as HTMLElement;
        const itemEl = fixture.debugElement.query(By.directive(HlmNavigationMenuItem)).nativeElement as HTMLElement;
        const triggerEl = fixture.debugElement.query(By.directive(HlmNavigationMenuTrigger))
            .nativeElement as HTMLElement;
        const linkEl = fixture.debugElement.query(By.directive(HlmNavigationMenuLink)).nativeElement as HTMLElement;

        expect(navEl.getAttribute('data-slot')).toBe('navigation-menu');
        expect(listEl.getAttribute('data-slot')).toBe('navigation-menu-list');
        expect(itemEl.getAttribute('data-slot')).toBe('navigation-menu-item');
        expect(triggerEl.getAttribute('data-slot')).toBe('navigation-menu-trigger');
        expect(linkEl.getAttribute('data-slot')).toBe('navigation-menu-link');
    });
});
