import { Component } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { Chart, ChartTooltipBodyDirective } from '@tanstack/angular-charts';
import { defineChart } from '@tanstack/charts';

import { HLM_CHART_THEME, HlmChart, HlmChartImports, hlmChartTooltip } from '../index';

@Component({
    standalone: true,
    imports: [HlmChartImports],
    template: `
        <tanstack-chart hlmChart [options]="chartOptions" data-testid="chart" class="custom-chart"></tanstack-chart>
    `,
})
class TestChartHostComponent {
    public readonly chartOptions = {
        definition: defineChart({
            theme: HLM_CHART_THEME,
            marks: [],
            scales: { x: null, y: null },
        }),
        ariaLabel: 'Test Chart',
    };
}

describe('HlmChart', () => {
    let fixture: ComponentFixture<TestChartHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestChartHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestChartHostComponent);
        fixture.detectChanges();
    });

    it('should export Chart, ChartTooltipBodyDirective, and HlmChart in HlmChartImports', () => {
        expect(HlmChartImports).toHaveLength(3);
        expect(HlmChartImports).toContain(Chart);
        expect(HlmChartImports).toContain(ChartTooltipBodyDirective);
        expect(HlmChartImports).toContain(HlmChart);
    });

    it('should attach spartan-chart and custom classes to tanstack-chart[hlmChart]', () => {
        const el = fixture.nativeElement.querySelector('[data-testid="chart"]');
        expect(el).toBeTruthy();
        expect(el.getAttribute('data-slot')).toBe('chart');
        expect(el.className).toContain('spartan-chart');
        expect(el.className).toContain('text-foreground');
        expect(el.className).toContain('custom-chart');
    });

    it('should define HLM_CHART_THEME with CSS variable semantic color tokens', () => {
        expect(HLM_CHART_THEME.foreground).toBe('var(--foreground)');
        expect(HLM_CHART_THEME.muted).toBe('var(--muted-foreground)');
        expect(HLM_CHART_THEME.grid).toBe('var(--muted-foreground)');
        expect(HLM_CHART_THEME.background).toBe('transparent');
        expect(HLM_CHART_THEME.palette).toEqual([
            'var(--chart-1)',
            'var(--chart-2)',
            'var(--chart-3)',
            'var(--chart-4)',
            'var(--chart-5)',
        ]);
    });

    it('should create tooltip input with spartan-chart-tooltip class via hlmChartTooltip', () => {
        const defaultTooltip = hlmChartTooltip() as { className: string };
        expect(defaultTooltip.className).toContain('spartan-chart-tooltip');

        const customTooltip = hlmChartTooltip({ className: 'custom-tooltip-class' }) as { className: string };
        expect(customTooltip.className).toContain('spartan-chart-tooltip');
        expect(customTooltip.className).toContain('custom-tooltip-class');
    });
});
