import { DocsContainer as BaseDocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import type React from 'react';
import { useEffect, useState } from 'react';
import { addons } from 'storybook/preview-api';
import { create } from 'storybook/theming';

export const docsDarkTheme = create({
    base: 'dark',
    appBg: '#09090b',
    appContentBg: '#09090b',
    appPreviewBg: '#09090b',
    barBg: '#09090b',
    barTextColor: '#a1a1aa',
    barSelectedColor: '#fafafa',
    textColor: '#fafafa',
    textInverseColor: '#18181b',
    inputBg: '#18181b',
    inputBorder: 'rgba(255, 255, 255, 0.1)',
    inputTextColor: '#fafafa',
});

export const docsLightTheme = create({
    base: 'light',
    appBg: '#ffffff',
    appContentBg: '#ffffff',
    appPreviewBg: '#ffffff',
    barBg: '#ffffff',
    barTextColor: '#71717a',
    barSelectedColor: '#18181b',
    textColor: '#18181b',
    textInverseColor: '#ffffff',
    inputBg: '#ffffff',
    inputBorder: 'rgba(0, 0, 0, 0.1)',
    inputTextColor: '#18181b',
});

export function DocsContainer(props: DocsContainerProps): React.JSX.Element {
    const channel = addons.getChannel();
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const globals = params.get('globals');
            if (globals?.includes('theme:dark')) {
                return true;
            }
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    useEffect(() => {
        const handleGlobalsUpdated = ({ globals }: { globals?: { theme?: string } }) => {
            if (globals?.theme) {
                setIsDark(globals.theme === 'dark');
            }
        };

        channel.on('globalsUpdated', handleGlobalsUpdated);
        return () => {
            channel.off('globalsUpdated', handleGlobalsUpdated);
        };
    }, [channel]);

    const activeTheme = isDark ? docsDarkTheme : docsLightTheme;

    return <BaseDocsContainer {...props} theme={activeTheme} />;
}
