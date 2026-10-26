import { Component, signal, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmResizableGroup, HlmResizableHandle, HlmResizableImports, HlmResizablePanel } from '../index';

@Component({
    standalone: true,
    imports: [HlmResizableImports],
    template: `
        <hlm-resizable-group
            #group="hlmResizableGroup"
            [direction]="direction()"
            [(layout)]="layout"
            (dragStart)="onDragStart()"
            (dragEnd)="onDragEnd()"
            class="custom-group"
            data-testid="group"
        >
            <hlm-resizable-panel
                #panelOne="hlmResizablePanel"
                [defaultSize]="40"
                [minSize]="20"
                [maxSize]="80"
                data-testid="panel-one"
            >
                <div>Panel 1</div>
            </hlm-resizable-panel>
            <hlm-resizable-handle #handle [withHandle]="withHandle()" data-testid="handle" />
            <hlm-resizable-panel #panelTwo="hlmResizablePanel" [defaultSize]="60" data-testid="panel-two">
                <div>Panel 2</div>
            </hlm-resizable-panel>
        </hlm-resizable-group>
    `,
})
class TestHostComponent {
    readonly group = viewChild('group', { read: HlmResizableGroup });
    readonly panelOne = viewChild('panelOne', { read: HlmResizablePanel });
    readonly panelTwo = viewChild('panelTwo', { read: HlmResizablePanel });
    readonly handle = viewChild('handle', { read: HlmResizableHandle });

    direction = signal<'horizontal' | 'vertical'>('horizontal');
    layout = signal<number[]>([40, 60]);
    withHandle = signal<boolean>(false);

    dragStarted = false;
    dragEnded = false;

    onDragStart(): void {
        this.dragStarted = true;
    }

    onDragEnd(): void {
        this.dragEnded = true;
    }
}

describe('HlmResizable', () => {
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

    describe('HlmResizableGroup', () => {
        it('should have data-slot="resizable-group" and layout classes', () => {
            const groupEl = fixture.debugElement.query(By.css('[data-testid="group"]')).nativeElement as HTMLElement;
            expect(groupEl.getAttribute('data-slot')).toBe('resizable-group');
            expect(groupEl.classList.contains('group')).toBe(true);
            expect(groupEl.classList.contains('flex')).toBe(true);
            expect(groupEl.classList.contains('h-full')).toBe(true);
            expect(groupEl.classList.contains('w-full')).toBe(true);
            expect(groupEl.classList.contains('custom-group')).toBe(true);
        });

        it('should sync direction attribute with underlying brain directive', () => {
            const groupEl = fixture.debugElement.query(By.css('[data-testid="group"]')).nativeElement as HTMLElement;
            expect(groupEl.getAttribute('data-panel-group-direction')).toBe('horizontal');

            host.direction.set('vertical');
            fixture.detectChanges();
            expect(groupEl.getAttribute('data-panel-group-direction')).toBe('vertical');
        });

        it('should support directive selector [hlmResizableGroup]', () => {
            expect(host.group()).toBeInstanceOf(HlmResizableGroup);
        });
    });

    describe('HlmResizableHandle', () => {
        it('should have data-slot="resizable-handle" and base classes', () => {
            const handleEl = fixture.debugElement.query(By.css('[data-testid="handle"]')).nativeElement as HTMLElement;
            expect(handleEl.getAttribute('data-slot')).toBe('resizable-handle');
            expect(handleEl.getAttribute('role')).toBe('separator');
            expect(handleEl.classList.contains('bg-border')).toBe(true);
            expect(handleEl.classList.contains('relative')).toBe(true);
            expect(handleEl.classList.contains('flex')).toBe(true);
        });

        it('should not render notch element when withHandle is false', () => {
            const handleEl = fixture.debugElement.query(By.css('[data-testid="handle"]')).nativeElement as HTMLElement;
            const notch = handleEl.querySelector('div');
            expect(notch).toBeNull();
        });

        it('should render notch element when withHandle is true', () => {
            host.withHandle.set(true);
            fixture.detectChanges();

            const handleEl = fixture.debugElement.query(By.css('[data-testid="handle"]')).nativeElement as HTMLElement;
            const notch = handleEl.querySelector('div');
            expect(notch).not.toBeNull();
            expect(notch?.classList.contains('bg-border')).toBe(true);
            expect(notch?.classList.contains('rounded-lg')).toBe(true);
        });
    });

    describe('HlmResizablePanel', () => {
        it('should have data-slot="resizable-panel"', () => {
            const panelEl = fixture.debugElement.query(By.css('[data-testid="panel-one"]'))
                .nativeElement as HTMLElement;
            expect(panelEl.getAttribute('data-slot')).toBe('resizable-panel');
        });

        it('should expose setSize method delegating to BrnResizablePanel', () => {
            const panel = host.panelOne();
            expect(panel).toBeDefined();
            expect(typeof panel?.setSize).toBe('function');

            // Invoke setSize
            panel?.setSize(50);
            fixture.detectChanges();
        });
    });
});
