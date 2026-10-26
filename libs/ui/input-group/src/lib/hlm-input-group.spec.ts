import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { beforeEach, describe, expect, it } from 'vitest';

import { HlmInputGroupImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmInputGroupImports],
    template: `
        <div hlmInputGroup data-testid="default-group">
            <span hlmInputGroupText data-testid="group-text">$</span>
            <input hlmInputGroupInput data-testid="group-input" placeholder="0.00" />
            <div hlmInputGroupAddon align="inline-end" data-testid="group-addon">
                <button hlmInputGroupButton data-testid="group-btn">Action</button>
            </div>
        </div>
    `,
})
class TestInputGroupHostComponent {}

describe('HlmInputGroup Primitives', () => {
    let fixture: ComponentFixture<TestInputGroupHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestInputGroupHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestInputGroupHostComponent);
        fixture.detectChanges();
    });

    it('should render input group container with data-slot', () => {
        const groupEl = fixture.debugElement.query(By.css('[data-testid="default-group"]'))
            .nativeElement as HTMLElement;
        expect(groupEl.getAttribute('data-slot')).toBe('input-group');
        expect(groupEl.getAttribute('role')).toBe('group');
    });

    it('should render inner control with data-slot input-group-control', () => {
        const inputEl = fixture.debugElement.query(By.css('[data-testid="group-input"]')).nativeElement as HTMLElement;
        expect(inputEl.getAttribute('data-slot')).toBe('input-group-control');
        expect(inputEl.className).toContain('bg-transparent');
    });

    it('should render addon with proper data-align attribute', () => {
        const addonEl = fixture.debugElement.query(By.css('[data-testid="group-addon"]')).nativeElement as HTMLElement;
        expect(addonEl.getAttribute('data-slot')).toBe('input-group-addon');
        expect(addonEl.getAttribute('data-align')).toBe('inline-end');
    });
});
