import { Component } from '@angular/core';

import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmComboboxImports } from '../index';

import { HlmCombobox } from './hlm-combobox';

@Component({
    selector: 'hlm-combobox-story-wrapper',
    standalone: true,
    imports: [HlmComboboxImports],
    template: `
        <hlm-combobox class="w-72">
            <hlm-combobox-input placeholder="Select framework..." />
            <hlm-combobox-content *hlmComboboxPortal>
                <hlm-combobox-empty>No framework found.</hlm-combobox-empty>
                <div hlmComboboxList>
                    @for (item of frameworks; track item.value) {
                        <hlm-combobox-item [value]="item">{{ item.label }}</hlm-combobox-item>
                    }
                </div>
            </hlm-combobox-content>
        </hlm-combobox>
    `,
})
class ComboboxStoryWrapperComponent {
    public frameworks = [
        { label: 'Angular', value: 'angular' },
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
        { label: 'Solid', value: 'solid' },
    ];
}

@Component({
    selector: 'hlm-combobox-trigger-story-wrapper',
    standalone: true,
    imports: [HlmComboboxImports],
    template: `
        <hlm-combobox class="w-72">
            <hlm-combobox-trigger class="w-full justify-between">
                <span hlmComboboxValue placeholder="Select a framework..."></span>
            </hlm-combobox-trigger>
            <hlm-combobox-content *hlmComboboxPortal>
                <hlm-combobox-empty>No framework found.</hlm-combobox-empty>
                <div hlmComboboxList>
                    @for (item of frameworks; track item.value) {
                        <hlm-combobox-item [value]="item">{{ item.label }}</hlm-combobox-item>
                    }
                </div>
            </hlm-combobox-content>
        </hlm-combobox>
    `,
})
class ComboboxTriggerStoryWrapperComponent {
    public frameworks = [
        { label: 'Angular', value: 'angular' },
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
    ];
}

const meta: Meta<HlmCombobox> = {
    title: 'Forms/Combobox',
    component: HlmCombobox,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmComboboxImports, ComboboxStoryWrapperComponent, ComboboxTriggerStoryWrapperComponent],
        }),
    ],
};

export default meta;
type Story = StoryObj<HlmCombobox>;

export const Default: Story = {
    render: () => ({
        template: `<hlm-combobox-story-wrapper />`,
    }),
};

export const WithTriggerButton: Story = {
    render: () => ({
        template: `<hlm-combobox-trigger-story-wrapper />`,
    }),
};
