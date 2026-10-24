import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import { HlmCommandImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmCommandImports],
    template: `
        <hlm-command>
            <hlm-command-input placeholder="Type to search..." />
            <hlm-command-list>
                <div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
                <hlm-command-group>
                    <hlm-command-group-label>Actions</hlm-command-group-label>
                    <button hlmCommandItem value="profile">Profile</button>
                    <button hlmCommandItem value="settings">Settings</button>
                </hlm-command-group>
            </hlm-command-list>
        </hlm-command>
    `,
})
class TestCommandComponent {}

describe('HlmCommand', () => {
    let fixture: ComponentFixture<TestCommandComponent>;

    beforeAll(() => {
        Element.prototype.scrollIntoView = vi.fn();
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestCommandComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestCommandComponent);
        fixture.detectChanges();
    });

    it('should create and render command container and items', () => {
        const commandEl: HTMLElement = fixture.nativeElement.querySelector('hlm-command');
        expect(commandEl).toBeTruthy();
        expect(commandEl.getAttribute('data-slot')).toBe('command');

        const inputWrapper: HTMLElement = fixture.nativeElement.querySelector('hlm-command-input');
        expect(inputWrapper).toBeTruthy();
        expect(inputWrapper.getAttribute('data-slot')).toBe('command-input-wrapper');

        const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input[brnCommandInput]');
        expect(inputEl).toBeTruthy();
        expect(inputEl.placeholder).toBe('Type to search...');

        const items = fixture.nativeElement.querySelectorAll('button[hlmCommandItem]');
        expect(items.length).toBe(2);
    });
});
