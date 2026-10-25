import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmDropdownMenuImports } from '../index';

@Component({
    imports: [HlmDropdownMenuImports],
    template: `
        <button [hlmDropdownMenuTrigger]="menu">Open Menu</button>
        <ng-template #menu>
            <hlm-dropdown-menu>
                <hlm-dropdown-menu-group>
                    <hlm-dropdown-menu-label>My Account</hlm-dropdown-menu-label>
                    <button hlmDropdownMenuItem id="profile-btn">
                        Profile
                        <hlm-dropdown-menu-shortcut>⇧⌘P</hlm-dropdown-menu-shortcut>
                    </button>
                    <button hlmDropdownMenuItem disabled id="disabled-btn">Disabled Item</button>
                </hlm-dropdown-menu-group>
                <hlm-dropdown-menu-separator />
                <button hlmDropdownMenuCheckbox [checked]="true" id="check-btn">
                    Check Option
                    <hlm-dropdown-menu-checkbox-indicator />
                </button>
            </hlm-dropdown-menu>
        </ng-template>
    `,
})
class TestHostComponent {}

describe('HlmDropdownMenu', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render trigger button', () => {
        const trigger = fixture.debugElement.query(By.css('[data-slot="dropdown-menu-trigger"]'));
        expect(trigger).toBeTruthy();
    });

    it('should open dropdown menu when trigger is clicked', async () => {
        const trigger = fixture.debugElement.query(By.css('[data-slot="dropdown-menu-trigger"]'));
        trigger.nativeElement.click();
        fixture.detectChanges();
        await fixture.whenStable();

        const menuEl = document.querySelector('[data-slot="dropdown-menu"]');
        expect(menuEl).toBeTruthy();

        const labelEl = document.querySelector('[data-slot="dropdown-menu-label"]');
        expect(labelEl).toBeTruthy();
        expect(labelEl?.textContent).toContain('My Account');

        const itemEl = document.querySelector('#profile-btn');
        expect(itemEl).toBeTruthy();

        const disabledItem = document.querySelector('#disabled-btn');
        expect(disabledItem?.getAttribute('data-disabled')).toBe('');
    });
});
