import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HlmKbdImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmKbdImports],
    template: `
        <kbd hlmKbdGroup>
            <kbd hlmKbd id="test-kbd">Ctrl</kbd>
        </kbd>
    `,
})
class TestHostComponent {}

describe('HlmKbd', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should set data-slot="kbd-group" on group and data-slot="kbd" on element', () => {
        const group = fixture.debugElement.query(By.css('[data-slot="kbd-group"]'));
        expect(group).toBeTruthy();

        const kbd = fixture.debugElement.query(By.css('#test-kbd'));
        expect(kbd).toBeTruthy();
        expect(kbd.attributes['data-slot']).toBe('kbd');
        expect(kbd.nativeElement.className).toContain('bg-muted');
    });
});
