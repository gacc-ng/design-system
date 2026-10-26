import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmContextMenuImports, HlmContextMenuTrigger } from './hlm-context-menu-trigger';

@Component({
    standalone: true,
    imports: [HlmContextMenuImports],
    template: `
        <div [hlmContextMenuTrigger]="menuTpl" [disabled]="disabled()" data-testid="trigger">Right click zone</div>
        <ng-template #menuTpl>
            <div data-testid="menu-content">Menu Content</div>
        </ng-template>
    `,
})
class TestHostComponent {
    public readonly disabled = signal(false);
}

describe('HlmContextMenuTrigger', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should instantiate and apply data-slot and select-none classes', () => {
        const triggerEl = fixture.debugElement.query(By.directive(HlmContextMenuTrigger)).nativeElement as HTMLElement;
        expect(triggerEl).toBeTruthy();
        expect(triggerEl.getAttribute('data-slot')).toBe('context-menu-trigger');
        expect(triggerEl.className).toContain('select-none');
        expect(triggerEl.hasAttribute('data-disabled')).toBe(false);
    });

    it('should reflect disabled state on the trigger', () => {
        const triggerEl = fixture.debugElement.query(By.directive(HlmContextMenuTrigger)).nativeElement as HTMLElement;
        host.disabled.set(true);
        fixture.detectChanges();

        expect(triggerEl.hasAttribute('data-disabled')).toBe(true);
    });
});
