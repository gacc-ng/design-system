import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import {
    HlmBlockquote,
    HlmCode,
    HlmH1,
    HlmH2,
    HlmH3,
    HlmH4,
    HlmLarge,
    HlmLead,
    HlmMuted,
    HlmP,
    HlmSmall,
    HlmTypographyImports,
    HlmUl,
} from '../index';

@Component({
    standalone: true,
    imports: [HlmTypographyImports],
    template: `
        <h1 hlmH1 data-testid="h1">Heading 1</h1>
        <h2 hlmH2 class="custom-h2" data-testid="h2">Heading 2</h2>
        <h3 hlmH3 data-testid="h3">Heading 3</h3>
        <h4 hlmH4 data-testid="h4">Heading 4</h4>
        <p hlmP data-testid="p">Paragraph</p>
        <blockquote hlmBlockquote data-testid="blockquote">Quote</blockquote>
        <ul hlmUl data-testid="ul">
            <li>Item</li>
        </ul>
        <code hlmCode data-testid="code">inline code</code>
        <p hlmLead data-testid="lead">Lead text</p>
        <div hlmLarge data-testid="large">Large text</div>
        <small hlmSmall data-testid="small">Small text</small>
        <p hlmMuted data-testid="muted">Muted text</p>
    `,
})
class TestTypographyHostComponent {}

describe('HlmTypographyDirectives', () => {
    let fixture: ComponentFixture<TestTypographyHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestTypographyHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestTypographyHostComponent);
        fixture.detectChanges();
    });

    it('should export all 12 directives in HlmTypographyImports', () => {
        expect(HlmTypographyImports).toHaveLength(12);
        expect(HlmTypographyImports).toContain(HlmH1);
        expect(HlmTypographyImports).toContain(HlmH2);
        expect(HlmTypographyImports).toContain(HlmH3);
        expect(HlmTypographyImports).toContain(HlmH4);
        expect(HlmTypographyImports).toContain(HlmP);
        expect(HlmTypographyImports).toContain(HlmBlockquote);
        expect(HlmTypographyImports).toContain(HlmUl);
        expect(HlmTypographyImports).toContain(HlmCode);
        expect(HlmTypographyImports).toContain(HlmLead);
        expect(HlmTypographyImports).toContain(HlmLarge);
        expect(HlmTypographyImports).toContain(HlmSmall);
        expect(HlmTypographyImports).toContain(HlmMuted);
    });

    it('should attach expected classes to h1[hlmH1]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="h1"]');
        expect(el.className).toContain('scroll-m-20');
        expect(el.className).toContain('text-4xl');
        expect(el.className).toContain('font-extrabold');
    });

    it('should attach expected classes to h2[hlmH2] and merge custom classes', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="h2"]');
        expect(el.className).toContain('scroll-m-20');
        expect(el.className).toContain('text-3xl');
        expect(el.className).toContain('custom-h2');
    });

    it('should attach expected classes to h3[hlmH3]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="h3"]');
        expect(el.className).toContain('text-2xl');
        expect(el.className).toContain('font-semibold');
    });

    it('should attach expected classes to h4[hlmH4]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="h4"]');
        expect(el.className).toContain('text-xl');
        expect(el.className).toContain('font-semibold');
    });

    it('should attach expected classes to p[hlmP]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="p"]');
        expect(el.className).toContain('leading-7');
    });

    it('should attach expected classes to blockquote[hlmBlockquote]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="blockquote"]');
        expect(el.className).toContain('italic');
        expect(el.className).toContain('border-l-2');
    });

    it('should attach expected classes to ul[hlmUl]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="ul"]');
        expect(el.className).toContain('list-disc');
    });

    it('should attach expected classes to code[hlmCode]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="code"]');
        expect(el.className).toContain('font-mono');
        expect(el.className).toContain('bg-muted');
    });

    it('should attach expected classes to p[hlmLead]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="lead"]');
        expect(el.className).toContain('text-xl');
        expect(el.className).toContain('text-muted-foreground');
    });

    it('should attach expected classes to div[hlmLarge]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="large"]');
        expect(el.className).toContain('text-lg');
        expect(el.className).toContain('font-semibold');
    });

    it('should attach expected classes to small[hlmSmall]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="small"]');
        expect(el.className).toContain('text-sm');
        expect(el.className).toContain('font-medium');
    });

    it('should attach expected classes to p[hlmMuted]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="muted"]');
        expect(el.className).toContain('text-sm');
        expect(el.className).toContain('text-muted-foreground');
    });
});
