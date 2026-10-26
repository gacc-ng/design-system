import { Component } from '@angular/core';

import { provideNativeDateAdapter } from '@spartan-ng/brain/date-time';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmCalendarImports } from '../index';

import { HlmCalendar } from './hlm-calendar';

@Component({
    selector: 'hlm-calendar-story-wrapper',
    standalone: true,
    imports: [HlmCalendarImports],
    template: `
        <div class="border-border w-fit rounded-lg border p-2">
            <hlm-calendar [(date)]="selectedDate" />
        </div>
    `,
})
class CalendarStoryWrapperComponent {
    public selectedDate = new Date();
}

@Component({
    selector: 'hlm-calendar-range-story-wrapper',
    standalone: true,
    imports: [HlmCalendarImports],
    template: `
        <div class="border-border w-fit rounded-lg border p-2">
            <hlm-calendar-range [(startDate)]="startDate" [(endDate)]="endDate" />
        </div>
    `,
})
class CalendarRangeStoryWrapperComponent {
    public startDate = new Date();
    public endDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
}

const meta: Meta<HlmCalendar<Date>> = {
    title: 'Forms/Calendar',
    component: HlmCalendar,
    tags: ['autodocs'],
    decorators: [
        applicationConfig({
            providers: [provideNativeDateAdapter()],
        }),
        moduleMetadata({
            imports: [HlmCalendarImports, CalendarStoryWrapperComponent, CalendarRangeStoryWrapperComponent],
        }),
    ],
};

export default meta;
type Story = StoryObj<HlmCalendar<Date>>;

export const Default: Story = {
    render: () => ({
        template: `<hlm-calendar-story-wrapper />`,
    }),
};

export const Range: Story = {
    render: () => ({
        template: `<hlm-calendar-range-story-wrapper />`,
    }),
};
