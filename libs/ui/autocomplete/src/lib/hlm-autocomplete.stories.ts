import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmAutocompleteImports } from '../index';

import { HlmAutocomplete } from './hlm-autocomplete';

@Component({
    selector: 'hlm-autocomplete-story-wrapper',
    standalone: true,
    imports: [HlmAutocompleteImports],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <hlm-autocomplete [(search)]="search" class="w-72">
            <hlm-autocomplete-input placeholder="Search frameworks..." />
            <hlm-autocomplete-content *hlmAutocompletePortal>
                <hlm-autocomplete-empty>No framework found.</hlm-autocomplete-empty>
                <div hlmAutocompleteList>
                    @for (item of filteredFrameworks(); track item.value) {
                        <hlm-autocomplete-item [value]="item.value">{{ item.label }}</hlm-autocomplete-item>
                    }
                </div>
            </hlm-autocomplete-content>
        </hlm-autocomplete>
    `,
})
class AutocompleteStoryWrapperComponent {
    public readonly frameworks = [
        { label: 'Angular', value: 'Angular' },
        { label: 'React', value: 'React' },
        { label: 'Vue', value: 'Vue' },
        { label: 'Svelte', value: 'Svelte' },
        { label: 'Next.js', value: 'Next.js' },
        { label: 'Nuxt', value: 'Nuxt' },
    ];

    public readonly search = signal('');

    public readonly filteredFrameworks = computed(() => {
        const query = this.search().toLowerCase();
        return this.frameworks.filter((f) => f.label.toLowerCase().includes(query));
    });
}

const meta: Meta<HlmAutocomplete> = {
    title: 'Forms/Autocomplete',
    component: HlmAutocomplete,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmAutocompleteImports, AutocompleteStoryWrapperComponent],
        }),
    ],
};

export default meta;
type Story = StoryObj<HlmAutocomplete>;

export const Default: Story = {
    render: () => ({
        template: `<hlm-autocomplete-story-wrapper />`,
    }),
};
