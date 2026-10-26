import { Component } from '@angular/core';

import { provideNativeDateAdapter } from '@spartan-ng/brain/date-time';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmDatePickerImports } from '../index';

import { HlmDatePicker } from './hlm-date-picker';

@Component({
    selector: 'hlm-date-picker-story-wrapper',
    standalone: true,
    imports: [HlmDatePickerImports],
    template: `
        <div class="w-72">
            <hlm-date-picker [(date)]="selectedDate">
                <hlm-date-picker-trigger buttonId="date-picker-story">
                    <span>Pick a date</span>
                </hlm-date-picker-trigger>
            </hlm-date-picker>
        </div>
    `,
})
class DatePickerStoryWrapperComponent {
    public selectedDate: Date | null = new Date();
}

@Component({
    selector: 'hlm-date-picker-range-story-wrapper',
    standalone: true,
    imports: [HlmDatePickerImports],
    template: `
        <div class="w-72">
            <hlm-date-range-picker [(date)]="selectedRange">
                <hlm-date-picker-trigger buttonId="date-range-story">
                    <span>Pick a date range</span>
                </hlm-date-picker-trigger>
            </hlm-date-range-picker>
        </div>
    `,
})
class DatePickerRangeStoryWrapperComponent {
    public selectedRange: [Date, Date] | null = [new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)];
}

@Component({
    selector: 'hlm-date-picker-input-story-wrapper',
    standalone: true,
    imports: [HlmDatePickerImports],
    template: `
        <div class="w-72">
            <hlm-date-picker [(date)]="selectedDate">
                <hlm-date-picker-input inputId="date-input-story" placeholder="MM/DD/YYYY" />
            </hlm-date-picker>
        </div>
    `,
})
class DatePickerInputStoryWrapperComponent {
    public selectedDate: Date | null = null;
}

const meta: Meta<HlmDatePicker<Date>> = {
    title: 'Forms/Date Picker',
    component: HlmDatePicker,
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
            providers: [provideNativeDateAdapter()],
        }),
        moduleMetadata({
            imports: [
                HlmDatePickerImports,
                DatePickerStoryWrapperComponent,
                DatePickerRangeStoryWrapperComponent,
                DatePickerInputStoryWrapperComponent,
            ],
        }),
    ],
};

export default meta;
type Story = StoryObj<HlmDatePicker<Date>>;

export const Default: Story = {
    render: () => ({
        template: `<hlm-date-picker-story-wrapper />`,
    }),
};

export const Range: Story = {
    render: () => ({
        template: `<hlm-date-picker-range-story-wrapper />`,
    }),
};

export const WithInput: Story = {
    render: () => ({
        template: `<hlm-date-picker-input-story-wrapper />`,
    }),
};
