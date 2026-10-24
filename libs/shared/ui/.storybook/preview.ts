import { provideZonelessChangeDetection } from '@angular/core';

import { applicationConfig, type Decorator, type Preview } from '@storybook/angular';

import { provideSpartanHlm } from '../utils/src/provide-spartan-hlm';

/**
 * Storybook decorator that synchronizes the selected background / theme
 * with the application preset's class-based dark mode (`.dark`).
 */
const withTheme: Decorator = (storyFn, context) => {
    const bg = context.globals?.['backgrounds'] as { value?: string } | string | undefined;
    const bgValue = typeof bg === 'object' && bg !== null ? bg.value : bg;
    const theme = context.globals?.['theme'] as string | undefined;

    const isDarkBg =
        bgValue === 'dark' ||
        bgValue === '#000000' ||
        bgValue === '#09090b' ||
        bgValue === '#141414' ||
        bgValue === '#18181b' ||
        bgValue === '#333333';

    const isLightBg = bgValue === 'light' || bgValue === '#ffffff' || bgValue === '#F8F8F8';

    const isDark = isDarkBg ? true : isLightBg ? false : theme === 'dark';

    if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.classList.toggle('dark', isDark);
        document.body.classList.toggle('dark', isDark);
        root.style.colorScheme = isDark ? 'dark' : 'light';
    }

    return storyFn();
};

const preview: Preview = {
    decorators: [
        withTheme,
        applicationConfig({
            providers: [provideZonelessChangeDetection(), provideSpartanHlm()],
        }),
    ],
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#000000' },
            ],
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
