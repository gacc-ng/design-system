import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HlmAvatarImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmAvatarImports],
    template: `
        <hlm-avatar size="lg">
            <span hlmAvatarFallback>GC</span>
            <hlm-avatar-badge />
        </hlm-avatar>
    `,
})
class TestHostComponent {}

describe('HlmAvatar', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should render avatar container with correct data-slot and size attribute', () => {
        const avatar = fixture.debugElement.query(By.css('hlm-avatar'));
        expect(avatar).toBeTruthy();
        expect(avatar.attributes['data-slot']).toBe('avatar');
        expect(avatar.attributes['data-size']).toBe('lg');
    });

    it('should render fallback when no image can show', () => {
        const fallback = fixture.debugElement.query(By.css('[data-slot="avatar-fallback"]'));
        expect(fallback).toBeTruthy();
        expect(fallback.nativeElement.textContent.trim()).toBe('GC');
    });

    it('should render avatar badge', () => {
        const badge = fixture.debugElement.query(By.css('[data-slot="avatar-badge"]'));
        expect(badge).toBeTruthy();
    });
});
