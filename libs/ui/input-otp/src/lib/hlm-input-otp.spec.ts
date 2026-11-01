import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmInputOtpImports } from '../index';

@Component({
    standalone: true,
    imports: [HlmInputOtpImports],
    template: `
        <hlm-input-otp length="4" data-testid="input-otp">
            <hlm-input-otp-group data-testid="otp-group">
                <hlm-input-otp-slot index="0" data-testid="otp-slot-0" />
                <hlm-input-otp-slot index="1" data-testid="otp-slot-1" />
            </hlm-input-otp-group>
            <hlm-input-otp-separator data-testid="otp-separator" />
            <hlm-input-otp-group>
                <hlm-input-otp-slot index="2" data-testid="otp-slot-2" />
                <hlm-input-otp-slot index="3" data-testid="otp-slot-3" />
            </hlm-input-otp-group>
        </hlm-input-otp>
    `,
})
class TestInputOtpHostComponent {}

describe('HlmInputOtp Primitives', () => {
    let fixture: ComponentFixture<TestInputOtpHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestInputOtpHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestInputOtpHostComponent);
        fixture.detectChanges();
    });

    it('should render input-otp container with data-slot', () => {
        const otp = fixture.debugElement.query(By.css('[data-testid="input-otp"]'));
        expect(otp).toBeTruthy();
        expect(otp.nativeElement.getAttribute('data-slot')).toBe('input-otp');
    });

    it('should render group, separator, and slots', () => {
        const group = fixture.debugElement.query(By.css('[data-testid="otp-group"]'));
        const separator = fixture.debugElement.query(By.css('[data-testid="otp-separator"]'));
        const slot = fixture.debugElement.query(By.css('[data-testid="otp-slot-0"]'));
        expect(group).toBeTruthy();
        expect(separator).toBeTruthy();
        expect(slot).toBeTruthy();
        expect(slot.nativeElement.getAttribute('data-slot')).toBe('input-otp-slot');
    });
});
