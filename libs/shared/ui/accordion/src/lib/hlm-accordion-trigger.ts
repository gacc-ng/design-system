import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnAccordionImports } from '@spartan-ng/brain/accordion';
import { type ClassValue } from 'clsx';

import { hlm } from '@gacc-ng/ui/utils';

@Component({
    selector: 'hlm-accordion-trigger',
    exportAs: 'hlmAccordionTrigger',
    imports: [BrnAccordionImports, NgIcon],
    providers: [provideIcons({ lucideChevronDown })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h3 brnAccordionHeader class="flex">
            <button brnAccordionTrigger data-slot="accordion-trigger" [class]="_computedTriggerClass()">
                <ng-content />
                <ng-icon
                    name="lucideChevronDown"
                    data-slot="accordion-trigger-icon"
                    class="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180 group-data-[state=open]/accordion-trigger:rotate-180"
                />
            </button>
        </h3>
    `,
})
export class HlmAccordionTrigger {
    public readonly triggerClass = input<ClassValue>('');

    protected readonly _computedTriggerClass = computed(() =>
        hlm(
            'flex flex-1 items-center justify-between p-4 text-start text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group/accordion-trigger cursor-pointer select-none',
            this.triggerClass(),
        ),
    );
}
