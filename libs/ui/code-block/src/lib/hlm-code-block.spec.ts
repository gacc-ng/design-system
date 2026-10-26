import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it, vi } from 'vitest';

import { HlmCodeBlockImports } from './hlm-code-block';

@Component({
    imports: [HlmCodeBlockImports],
    template: `
        <hlm-code-block [variant]="variant" [size]="size">
            <hlm-code-block-header>
                <hlm-code-block-title>main.ts</hlm-code-block-title>
                <hlm-code-block-actions>
                    <button hlmCodeBlockCopyButton [value]="code">
                        <span>Copy</span>
                    </button>
                </hlm-code-block-actions>
            </hlm-code-block-header>
            <pre hlmCodeBlockContent [code]="code" [wrap]="wrap" [lineNumbers]="lineNumbers" [startLine]="10"></pre>
            <hlm-code-block-footer>TypeScript · 42 B</hlm-code-block-footer>
        </hlm-code-block>
    `,
})
class TestHostComponent {
    variant: 'default' | 'destructive' = 'default';
    size: 'default' | 'sm' = 'default';
    wrap = false;
    lineNumbers = true;
    code = 'const x = 1;\nconst y = 2;\nconsole.log(x + y);';
}

describe('HlmCodeBlock', () => {
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

    it('should create code block container with proper data slots', () => {
        const codeBlockEl = fixture.debugElement.query(By.css('[data-slot="code-block"]'));
        expect(codeBlockEl).toBeTruthy();
        expect(codeBlockEl.nativeElement.getAttribute('data-variant')).toBe('default');
        expect(codeBlockEl.nativeElement.getAttribute('data-size')).toBe('default');
    });

    it('should render header with title and actions', () => {
        const headerEl = fixture.debugElement.query(By.css('[data-slot="code-block-header"]'));
        const titleEl = fixture.debugElement.query(By.css('[data-slot="code-block-title"]'));
        const actionsEl = fixture.debugElement.query(By.css('[data-slot="code-block-actions"]'));

        expect(headerEl).toBeTruthy();
        expect(titleEl).toBeTruthy();
        expect(titleEl.nativeElement.textContent).toContain('main.ts');
        expect(actionsEl).toBeTruthy();
    });

    it('should copy code on copy button click', async () => {
        const writeTextSpy = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, {
            clipboard: {
                writeText: writeTextSpy,
            },
        });

        const copyBtn = fixture.debugElement.query(By.css('[data-slot="code-block-copy-button"]'));
        expect(copyBtn).toBeTruthy();

        copyBtn.nativeElement.click();
        fixture.detectChanges();

        expect(writeTextSpy).toHaveBeenCalledWith(host.code);
    });

    it('should split lines when lineNumbers is true', () => {
        const lines = fixture.debugElement.queryAll(By.css('[data-slot="code-block-line"]'));
        expect(lines.length).toBe(3);
    });

    it('should render footer with slot', () => {
        const footerEl = fixture.debugElement.query(By.css('[data-slot="code-block-footer"]'));
        expect(footerEl).toBeTruthy();
        expect(footerEl.nativeElement.textContent).toContain('TypeScript');
    });
});
