import { applicationConfig, type Decorator, type Preview } from '@storybook/angular-vite';

import { provideSpartanHlm } from '@gacc-ng/ui/utils';

import './tailwind.css';

/**
 * Synchronizes Storybook's background / theme selection with
 * the design system's class-based dark mode (`.dark`).
 */
const withTheme: Decorator = (storyFn, context) => {
    const bg = context.globals?.['backgrounds'] as { value?: string } | string | undefined;
    const bgValue = typeof bg === 'object' && bg !== null ? bg.value : bg;
    const isDark = bgValue === 'dark' || bgValue === '#000000' || bgValue === '#18181b' || bgValue === '#09090b';

    if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.classList.toggle('dark', isDark);
        root.style.colorScheme = isDark ? 'dark' : 'light';
    }

    return storyFn();
};

const preview: Preview = {
    decorators: [
        withTheme,
        applicationConfig({
            providers: [provideSpartanHlm()],
        }),
    ],
    parameters: {
        backgrounds: {
            options: {
                light: { name: 'light', value: '#ffffff' },
                dark: { name: 'dark', value: '#18181b' },
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    initialGlobals: {
        backgrounds: { value: 'light' },
    },
};

export default preview;
