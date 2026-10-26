import { type Direction, Directionality } from '@angular/cdk/bidi';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    Directive,
    effect,
    inject,
    input,
    type InputSignal,
    type Signal,
    signal,
    untracked,
    viewChild,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight } from '@ng-icons/lucide';
import type { ClassValue } from 'clsx';
import type { EmblaEventType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import { EmblaCarouselDirective } from 'embla-carousel-angular';

import { HlmButton, provideBrnButtonConfig } from '@gacc-ng/ui/button';
import { classes, hlm } from '@gacc-ng/ui/utils';

@Directive({
    selector: '[hlmCarouselContent],hlm-carousel-content',
    exportAs: 'hlmCarouselContent',
    host: {
        'data-slot': 'carousel-content',
    },
})
export class HlmCarouselContent {
    private readonly _orientation = inject(HlmCarousel).orientation;

    constructor() {
        classes(() => ['flex', this._orientation() === 'horizontal' ? '-ml-4' : '-mt-4 flex-col']);
    }
}

@Directive({
    selector: '[hlmCarouselItem],hlm-carousel-item',
    exportAs: 'hlmCarouselItem',
    host: {
        'data-slot': 'carousel-item',
        role: 'group',
        'aria-roledescription': 'slide',
    },
})
export class HlmCarouselItem {
    private readonly _orientation = inject(HlmCarousel).orientation;

    constructor() {
        classes(() => ['min-w-0 shrink-0 grow-0 basis-full', this._orientation() === 'horizontal' ? 'pl-4' : 'pt-4']);
    }
}

@Component({
    selector: 'hlm-carousel-next, button[hlm-carousel-next], button[hlmCarouselNext]',
    exportAs: 'hlmCarouselNext',
    imports: [NgIcon],
    providers: [provideIcons({ lucideArrowRight }), provideBrnButtonConfig({ variant: 'outline', size: 'icon-sm' })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
    host: {
        'data-slot': 'carousel-next',
        '[attr.disabled]': 'isDisabled() ? "" : null',
        '(click)': '_carousel.scrollNext()',
    },
    template: `
        <ng-icon name="lucideArrowRight" class="rtl:rotate-180" />
        <span class="sr-only">Next slide</span>
    `,
})
export class HlmCarouselNext {
    private readonly _button = inject(HlmButton);
    protected readonly _carousel = inject(HlmCarousel);
    private readonly _computedClass = computed(() =>
        hlm(
            'rounded-full absolute h-8 w-8',
            this._carousel.orientation() === 'horizontal'
                ? '-end-12 top-1/2 -translate-y-1/2'
                : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        ),
    );
    protected readonly isDisabled = () => !this._carousel.canScrollNext();

    constructor() {
        effect(() => {
            const computedClass = this._computedClass();
            untracked(() => this._button.setClass(computedClass));
        });
    }
}

@Component({
    selector: 'hlm-carousel-previous, button[hlm-carousel-previous], button[hlmCarouselPrevious]',
    exportAs: 'hlmCarouselPrevious',
    imports: [NgIcon],
    providers: [provideIcons({ lucideArrowLeft }), provideBrnButtonConfig({ variant: 'outline', size: 'icon-sm' })],
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
    host: {
        'data-slot': 'carousel-previous',
        '[attr.disabled]': 'isDisabled() ? "" : null',
        '(click)': '_carousel.scrollPrev()',
    },
    template: `
        <ng-icon name="lucideArrowLeft" class="rtl:rotate-180" />
        <span class="sr-only">Previous slide</span>
    `,
})
export class HlmCarouselPrevious {
    private readonly _button = inject(HlmButton);
    protected readonly _carousel = inject(HlmCarousel);
    private readonly _computedClass = computed(() =>
        hlm(
            'rounded-full absolute h-8 w-8',
            this._carousel.orientation() === 'horizontal'
                ? '-start-12 top-1/2 -translate-y-1/2'
                : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        ),
    );
    protected readonly isDisabled = () => !this._carousel.canScrollPrev();

    constructor() {
        effect(() => {
            const computedClass = this._computedClass();
            untracked(() => this._button.setClass(computedClass));
        });
    }
}

@Component({
    selector: 'hlm-carousel-slide-display',
    exportAs: 'hlmCarouselSlideDisplay',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'data-slot': 'carousel-slide-display',
    },
    template: `
        <span class="sr-only">{{ _labelContent() }}</span>
        <div aria-hidden="true" [class]="slideClass()">{{ _currentSlide() }} / {{ _carousel.slideCount() }}</div>
    `,
})
export class HlmCarouselSlideDisplay {
    protected readonly _carousel = inject(HlmCarousel);

    protected readonly _currentSlide = computed(() => this._carousel.currentSlide() + 1);

    public readonly slideClass = input<ClassValue>('text-muted-foreground text-sm');

    /** Screen reader only text for the slide display */
    public readonly label = input<string>('Slide');

    protected readonly _labelContent = computed(() => {
        const currentSlide = this._currentSlide();
        const slideCount = this._carousel.slideCount();
        return `${this.label()} ${currentSlide} of ${slideCount} is displayed`;
    });
}

@Component({
    selector: 'hlm-carousel',
    exportAs: 'hlmCarousel',
    imports: [EmblaCarouselDirective],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'data-slot': 'carousel',
        role: 'region',
        'aria-roledescription': 'carousel',
        '(keydown)': 'onKeydown($event)',
    },
    template: `
        <div
            emblaCarousel
            class="overflow-hidden"
            [plugins]="plugins()"
            [options]="_emblaOptions()"
            [subscribeToEvents]="['init', 'select', 'reInit']"
            (emblaChange)="onEmblaEvent($event)"
        >
            <ng-content select="[hlmCarouselContent],hlm-carousel-content" />
        </div>
        <ng-content />
    `,
})
export class HlmCarousel {
    protected readonly _emblaCarousel = viewChild.required(EmblaCarouselDirective);
    private readonly _dir = inject(Directionality, { optional: true });

    public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
    public readonly options: InputSignal<Omit<EmblaOptionsType, 'axis'> | undefined> =
        input<Omit<EmblaOptionsType, 'axis'>>();
    public readonly plugins: InputSignal<EmblaPluginType[]> = input<EmblaPluginType[]>([]);

    protected readonly _emblaOptions: Signal<EmblaOptionsType> = computed(() => {
        const dir = this._dir as (Directionality & { valueSignal?: () => Direction }) | null;
        const resolvedDir = dir?.valueSignal ? dir.valueSignal() : (dir?.value ?? 'ltr');
        return {
            direction: resolvedDir,
            ...this.options(),
            axis: this.orientation() === 'horizontal' ? 'x' : 'y',
        };
    });

    private readonly _canScrollPrev = signal(false);
    public readonly canScrollPrev = this._canScrollPrev.asReadonly();
    private readonly _canScrollNext = signal(false);
    public readonly canScrollNext = this._canScrollNext.asReadonly();

    private readonly _currentSlide = signal(0);
    public readonly currentSlide = this._currentSlide.asReadonly();
    private readonly _slideCount = signal(0);
    public readonly slideCount = this._slideCount.asReadonly();

    constructor() {
        classes(() => 'relative');
    }

    protected onEmblaEvent(event: EmblaEventType) {
        const emblaApi = this._emblaCarousel().emblaApi;

        if (!emblaApi) {
            return;
        }

        if (event === 'select' || event === 'init' || event === 'reInit') {
            this._canScrollPrev.set(emblaApi.canScrollPrev());
            this._canScrollNext.set(emblaApi.canScrollNext());

            this._currentSlide.set(emblaApi.selectedScrollSnap());
            this._slideCount.set(emblaApi.scrollSnapList().length);
        }
    }

    protected onKeydown(event: KeyboardEvent) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            this._emblaCarousel().scrollPrev();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            this._emblaCarousel().scrollNext();
        }
    }

    scrollPrev() {
        this._emblaCarousel().scrollPrev();
    }

    scrollNext() {
        this._emblaCarousel().scrollNext();
    }
}

export const HlmCarouselImports = [
    HlmCarousel,
    HlmCarouselContent,
    HlmCarouselItem,
    HlmCarouselPrevious,
    HlmCarouselNext,
    HlmCarouselSlideDisplay,
] as const;
