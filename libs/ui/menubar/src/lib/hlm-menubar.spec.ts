import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmMenubar, HlmMenubarImports } from './hlm-menubar';
import { HlmMenubarTrigger } from './hlm-menubar-trigger';

@Component({
    standalone: true,
    imports: [HlmMenubarImports],
    template: `
        <div hlmMenubar data-testid="menubar">
            <button [hlmMenubarTrigger]="menuTpl" [disabled]="disabled()" hlmMenubarTrigger data-testid="trigger">
                File
            </button>
        </div>
        <ng-template #menuTpl>
            <div>Menu Content</div>
        </ng-template>
    `,
})
class TestHostComponent {
    public readonly disabled = signal(false);
}

describe('HlmMenubar', () => {
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

    it('should instantiate menubar and trigger with data-slot', () => {
        const menubarEl = fixture.debugElement.query(By.directive(HlmMenubar)).nativeElement as HTMLElement;
        const triggerEl = fixture.debugElement.query(By.directive(HlmMenubarTrigger)).nativeElement as HTMLElement;

        expect(menubarEl.getAttribute('data-slot')).toBe('menubar');
        expect(menubarEl.className).toContain('bg-background');
        expect(triggerEl.getAttribute('data-slot')).toBe('menubar-trigger');
        expect(triggerEl.hasAttribute('disabled')).toBe(false);
    });

    it('should reflect disabled state on trigger', () => {
        const triggerEl = fixture.debugElement.query(By.directive(HlmMenubarTrigger)).nativeElement as HTMLElement;
        host.disabled.set(true);
        fixture.detectChanges();

        expect(triggerEl.hasAttribute('disabled')).toBe(true);
        expect(triggerEl.getAttribute('data-disabled')).toBe('');
    });
});
