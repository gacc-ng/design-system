import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { describe, expect, it } from 'vitest';

import { HlmAlert } from '@gacc-ng/ui/alert';
import { HlmAvatar } from '@gacc-ng/ui/avatar';
import { HlmBadge } from '@gacc-ng/ui/badge';
import { HlmButton } from '@gacc-ng/ui/button';
import { HlmCard } from '@gacc-ng/ui/card';
import { HlmCheckbox } from '@gacc-ng/ui/checkbox';
import { HlmInput } from '@gacc-ng/ui/input';
import { HlmKbd } from '@gacc-ng/ui/kbd';
import { HlmLabel } from '@gacc-ng/ui/label';
import { HlmRadioGroup } from '@gacc-ng/ui/radio-group';
import { HlmSeparator } from '@gacc-ng/ui/separator';
import { HlmSkeleton } from '@gacc-ng/ui/skeleton';
import { HlmSpinner } from '@gacc-ng/ui/spinner';
import { HlmSwitch } from '@gacc-ng/ui/switch';
import { HlmTextarea } from '@gacc-ng/ui/textarea';
import { HlmToggle } from '@gacc-ng/ui/toggle';
import { HlmToggleGroup } from '@gacc-ng/ui/toggle-group';
import { HlmTooltip } from '@gacc-ng/ui/tooltip';

import { App } from './app';

describe('App Showcase', () => {
    let fixture: ComponentFixture<App>;
    let component: App;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [App],
        }).compileComponents();

        fixture = TestBed.createComponent(App);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the showcase app and render header title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const titleEl = compiled.querySelector('h1');
        expect(titleEl?.textContent).toContain('Design System Showcase');
    });

    it('should render all button variants with hlmBtn directive', () => {
        const variantsContainer = fixture.debugElement.query(By.css('[data-testid="variants-container"]'));
        expect(variantsContainer).toBeTruthy();

        const buttons = variantsContainer.queryAll(By.directive(HlmButton));
        expect(buttons.length).toBe(6);

        const defaultBtn = buttons[0].nativeElement as HTMLButtonElement;
        expect(defaultBtn.textContent?.trim()).toBe('Default');
        expect(defaultBtn.className).toContain('bg-primary');

        const secondaryBtn = buttons[1].nativeElement as HTMLButtonElement;
        expect(secondaryBtn.textContent?.trim()).toBe('Secondary');
        expect(secondaryBtn.className).toContain('bg-secondary');

        const destructiveBtn = buttons[2].nativeElement as HTMLButtonElement;
        expect(destructiveBtn.textContent?.trim()).toBe('Destructive');
        expect(destructiveBtn.className).toContain('text-destructive');

        const outlineBtn = buttons[3].nativeElement as HTMLButtonElement;
        expect(outlineBtn.textContent?.trim()).toBe('Outline');
        expect(outlineBtn.className).toContain('border-border');

        const ghostBtn = buttons[4].nativeElement as HTMLButtonElement;
        expect(ghostBtn.textContent?.trim()).toBe('Ghost');
        expect(ghostBtn.className).toContain('hover:bg-muted');

        const linkBtn = buttons[5].nativeElement as HTMLButtonElement;
        expect(linkBtn.textContent?.trim()).toBe('Link');
        expect(linkBtn.className).toContain('underline-offset-4');
    });

    it('should render all button sizes with correct class signatures', () => {
        const sizesContainer = fixture.debugElement.query(By.css('[data-testid="sizes-container"]'));
        expect(sizesContainer).toBeTruthy();

        const buttons = sizesContainer.queryAll(By.directive(HlmButton));
        expect(buttons.length).toBe(4);

        const xsBtn = buttons[0].nativeElement as HTMLButtonElement;
        expect(xsBtn.className).toContain('h-6');

        const smBtn = buttons[1].nativeElement as HTMLButtonElement;
        expect(smBtn.className).toContain('h-8');

        const defaultBtn = buttons[2].nativeElement as HTMLButtonElement;
        expect(defaultBtn.className).toContain('h-9');

        const lgBtn = buttons[3].nativeElement as HTMLButtonElement;
        expect(lgBtn.className).toContain('h-10');
    });

    it('should render badge primitives with correct variants', () => {
        const badgesContainer = fixture.debugElement.query(By.css('[data-testid="badges-container"]'));
        expect(badgesContainer).toBeTruthy();

        const badges = badgesContainer.queryAll(By.directive(HlmBadge));
        expect(badges.length).toBe(6);

        const defaultBadge = badges[0].nativeElement as HTMLSpanElement;
        expect(defaultBadge.textContent?.trim()).toBe('Default');
        expect(defaultBadge.className).toContain('bg-primary');
        expect(defaultBadge.className).toContain('rounded-4xl');

        const secondaryBadge = badges[1].nativeElement as HTMLSpanElement;
        expect(secondaryBadge.className).toContain('bg-secondary');

        const destructiveBadge = badges[2].nativeElement as HTMLSpanElement;
        expect(destructiveBadge.className).toContain('bg-destructive');

        const outlineBadge = badges[3].nativeElement as HTMLSpanElement;
        expect(outlineBadge.className).toContain('border-border');
    });

    it('should render form inputs with accessible labels', () => {
        const inputsContainer = fixture.debugElement.query(By.css('[data-testid="inputs-container"]'));
        expect(inputsContainer).toBeTruthy();

        const inputs = inputsContainer.queryAll(By.directive(HlmInput));
        const labels = inputsContainer.queryAll(By.directive(HlmLabel));

        expect(inputs.length).toBeGreaterThanOrEqual(4);
        expect(labels.length).toBeGreaterThanOrEqual(4);

        const emailLabel = labels[0].nativeElement as HTMLLabelElement;
        expect(emailLabel.getAttribute('for')).toBe('demo-email');
        expect(emailLabel.className).toContain('text-sm');
        expect(emailLabel.className).toContain('font-medium');

        const emailInput = inputs[0].nativeElement as HTMLInputElement;
        expect(emailInput.id).toBe('demo-email');
        expect(emailInput.className).toContain('border-input');
        expect(emailInput.className).toContain('h-9');
    });

    it('should render cards with header, title, and action', () => {
        const cardsContainer = fixture.debugElement.query(By.css('[data-testid="cards-container"]'));
        expect(cardsContainer).toBeTruthy();

        const cards = cardsContainer.queryAll(By.directive(HlmCard));
        expect(cards.length).toBe(3);

        const firstCard = cards[0].nativeElement as HTMLElement;
        expect(firstCard.getAttribute('data-slot')).toBe('card');
        expect(firstCard.className).toContain('bg-card');
    });

    it('should render separators with horizontal and vertical orientations', () => {
        const separatorsContainer = fixture.debugElement.query(By.css('[data-testid="separators-container"]'));
        expect(separatorsContainer).toBeTruthy();

        const separators = separatorsContainer.queryAll(By.directive(HlmSeparator));
        expect(separators.length).toBeGreaterThanOrEqual(2);
    });

    it('should render switches with checked and disabled states', () => {
        const switchesContainer = fixture.debugElement.query(By.css('[data-testid="switches-container"]'));
        expect(switchesContainer).toBeTruthy();

        const switches = switchesContainer.queryAll(By.directive(HlmSwitch));
        expect(switches.length).toBe(3);
    });

    it('should render checkboxes with checked, indeterminate, and disabled states', () => {
        const checkboxesContainer = fixture.debugElement.query(By.css('[data-testid="checkboxes-container"]'));
        expect(checkboxesContainer).toBeTruthy();

        const checkboxes = checkboxesContainer.queryAll(By.directive(HlmCheckbox));
        expect(checkboxes.length).toBe(3);
    });

    it('should render radio group with radio options and indicators', () => {
        const radiosContainer = fixture.debugElement.query(By.css('[data-testid="radios-container"]'));
        expect(radiosContainer).toBeTruthy();

        const radioGroup = radiosContainer.query(By.directive(HlmRadioGroup));
        expect(radioGroup).toBeTruthy();
    });

    it('should render textareas with hlmTextarea directive', () => {
        const textareasContainer = fixture.debugElement.query(By.css('[data-testid="textareas-container"]'));
        expect(textareasContainer).toBeTruthy();

        const textareas = textareasContainer.queryAll(By.directive(HlmTextarea));
        expect(textareas.length).toBe(2);
    });

    it('should render avatars with sizes, badges, and group stack', () => {
        const avatarsContainer = fixture.debugElement.query(By.css('[data-testid="avatars-container"]'));
        expect(avatarsContainer).toBeTruthy();

        const avatars = avatarsContainer.queryAll(By.directive(HlmAvatar));
        expect(avatars.length).toBeGreaterThanOrEqual(4);
    });

    it('should render skeletons with animated pulse', () => {
        const skeletonsContainer = fixture.debugElement.query(By.css('[data-testid="skeletons-container"]'));
        expect(skeletonsContainer).toBeTruthy();

        const skeletons = skeletonsContainer.queryAll(By.directive(HlmSkeleton));
        expect(skeletons.length).toBeGreaterThanOrEqual(3);
    });

    it('should render spinners with status role', () => {
        const spinnersContainer = fixture.debugElement.query(By.css('[data-testid="spinners-container"]'));
        expect(spinnersContainer).toBeTruthy();

        const spinners = spinnersContainer.queryAll(By.directive(HlmSpinner));
        expect(spinners.length).toBeGreaterThanOrEqual(3);
    });

    it('should render kbd shortcut badges', () => {
        const kbdsContainer = fixture.debugElement.query(By.css('[data-testid="kbds-container"]'));
        expect(kbdsContainer).toBeTruthy();

        const kbds = kbdsContainer.queryAll(By.directive(HlmKbd));
        expect(kbds.length).toBeGreaterThanOrEqual(4);
    });

    it('should render alerts with title and description', () => {
        const alertsContainer = fixture.debugElement.query(By.css('[data-testid="alerts-container"]'));
        expect(alertsContainer).toBeTruthy();

        const alerts = alertsContainer.queryAll(By.directive(HlmAlert));
        expect(alerts.length).toBeGreaterThanOrEqual(2);
    });

    it('should render tooltips with hlmTooltip directive', () => {
        const tooltipsContainer = fixture.debugElement.query(By.css('[data-testid="tooltips-container"]'));
        expect(tooltipsContainer).toBeTruthy();

        const tooltips = tooltipsContainer.queryAll(By.directive(HlmTooltip));
        expect(tooltips.length).toBeGreaterThanOrEqual(2);
    });

    it('should render toggles with maia pill styling', () => {
        const togglesContainer = fixture.debugElement.query(By.css('[data-testid="toggles-container"]'));
        expect(togglesContainer).toBeTruthy();

        const toggles = togglesContainer.queryAll(By.directive(HlmToggle));
        expect(toggles.length).toBeGreaterThanOrEqual(3);
    });

    it('should render toggle group with items', () => {
        const toggleGroupsContainer = fixture.debugElement.query(By.css('[data-testid="toggle-groups-container"]'));
        expect(toggleGroupsContainer).toBeTruthy();

        const group = toggleGroupsContainer.query(By.directive(HlmToggleGroup));
        expect(group).toBeTruthy();
    });

    it('should toggle dark mode state when theme button is clicked', () => {
        const toggleBtn = fixture.debugElement.query(By.css('[data-testid="theme-toggle"]'));
        expect(toggleBtn).toBeTruthy();

        expect(component['isDark']()).toBe(false);

        toggleBtn.nativeElement.click();
        fixture.detectChanges();
        expect(component['isDark']()).toBe(true);

        toggleBtn.nativeElement.click();
        fixture.detectChanges();
        expect(component['isDark']()).toBe(false);
    });
});
