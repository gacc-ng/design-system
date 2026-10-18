import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmButton } from './hlm-button';

@Component({
    standalone: true,
    imports: [HlmButton],
    template: `
        <button type="button" hlmBtn>Default</button>
        <button type="button" hlmBtn variant="destructive" size="lg">Destructive LG</button>
        <button type="button" hlmBtn variant="outline" size="sm">Outline SM</button>
        <button type="button" hlmBtn [disabled]="true">Disabled</button>
    `,
})
class TestHostComponent {}

describe('HlmButton', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create and apply default variant and size classes', () => {
        const buttons = fixture.debugElement.queryAll(By.directive(HlmButton));
        const defaultBtn = buttons[0].nativeElement as HTMLButtonElement;

        expect(defaultBtn).toBeTruthy();
        expect(defaultBtn.getAttribute('data-slot')).toBe('button');
        expect(defaultBtn.className).toContain('bg-primary');
        expect(defaultBtn.className).toContain('text-primary-foreground');
        expect(defaultBtn.className).toContain('h-9');
    });

    it('should apply destructive variant and lg size classes', () => {
        const buttons = fixture.debugElement.queryAll(By.directive(HlmButton));
        const destructiveBtn = buttons[1].nativeElement as HTMLButtonElement;

        expect(destructiveBtn.className).toContain('bg-destructive/10');
        expect(destructiveBtn.className).toContain('text-destructive');
        expect(destructiveBtn.className).toContain('h-10');
    });

    it('should apply outline variant and sm size classes', () => {
        const buttons = fixture.debugElement.queryAll(By.directive(HlmButton));
        const outlineBtn = buttons[2].nativeElement as HTMLButtonElement;

        expect(outlineBtn.className).toContain('border-border');
        expect(outlineBtn.className).toContain('bg-background');
        expect(outlineBtn.className).toContain('h-8');
    });

    it('should handle disabled state correctly via BrnButton host directive', () => {
        const buttons = fixture.debugElement.queryAll(By.directive(HlmButton));
        const disabledBtn = buttons[3].nativeElement as HTMLButtonElement;

        expect(disabledBtn.disabled).toBe(true);
    });
});
