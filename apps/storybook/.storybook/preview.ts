import { withThemeByClassName } from '@storybook/addon-themes';
import { applicationConfig, type Preview } from '@storybook/angular-vite';
import { addons } from 'storybook/preview-api';

import { provideSpartanHlm } from '@gacc-ng/ui/utils';

import { DocsContainer } from './docs-container';
import { formatStandaloneComponentSource, type StoryTransformContext } from './preview-transform';
import {
    isRadiusPreset,
    RADIUS_CHANNEL_EVENT,
    RADIUS_MAP,
    RADIUS_STORAGE_KEY,
    type RadiusPreset,
    type SetRadiusPayload,
} from './radius-presets';
import { isToolbarFeatureEnabled } from './toolbar-features';

import './tailwind.css';

let radiusTimer: ReturnType<typeof setTimeout> | undefined;

function applyRadius(radius?: string, animate = false): void {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;

    if (radiusTimer) {
        clearTimeout(radiusTimer);
        radiusTimer = undefined;
    }

    if (animate) {
        html.classList.add('is-adjusting-radius');
        radiusTimer = setTimeout(() => {
            html.classList.remove('is-adjusting-radius');
            radiusTimer = undefined;
        }, 220);
    } else {
        html.classList.remove('is-adjusting-radius');
    }

    if (!radius || radius === 'default') {
        html.style.removeProperty('--radius');
    } else if (RADIUS_MAP[radius]) {
        html.style.setProperty('--radius', RADIUS_MAP[radius]);
    }
}

function readInitialRadius(): RadiusPreset {
    if (typeof window === 'undefined') return 'default';
    const fromUrl = new URLSearchParams(window.location.search).get('radius');
    if (isRadiusPreset(fromUrl)) return fromUrl;
    try {
        const stored = localStorage.getItem(RADIUS_STORAGE_KEY);
        if (isRadiusPreset(stored)) return stored;
    } catch {
        // Handle restricted iframes or disabled localStorage
    }
    return 'default';
}

// Zero-teardown channel listener (bypasses globalTypes & story re-rendering)
if (typeof window !== 'undefined' && isToolbarFeatureEnabled('radius')) {
    applyRadius(readInitialRadius(), false);

    addons.getChannel().on(RADIUS_CHANNEL_EVENT, ({ radius, animate = true }: SetRadiusPayload) => {
        if (isRadiusPreset(radius)) {
            applyRadius(radius, animate);
        }
    });
}

const preview: Preview = {
    tags: ['autodocs'],
    decorators: [
        withThemeByClassName({
            themes: {
                light: '',
                dark: 'dark',
            },
            defaultTheme: 'light',
            parentSelector: 'html',
        }),
        applicationConfig({
            providers: [provideSpartanHlm()],
        }),
    ],
    parameters: {
        docs: {
            container: DocsContainer,
            toc: true,
            codePanel: true,
            source: {
                format: 'dedent',
                language: 'typescript',
                transform: (code: string, storyContext: StoryTransformContext) =>
                    formatStandaloneComponentSource(code, storyContext),
            },
        },
        a11y: {
            disable: !isToolbarFeatureEnabled('a11y'),
        },
        themes: {
            disable: !isToolbarFeatureEnabled('theme'),
        },
        backgrounds: {
            disable: !isToolbarFeatureEnabled('backgrounds'),
        },
        controls: {
            expanded: true,
            sort: 'requiredFirst',
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
