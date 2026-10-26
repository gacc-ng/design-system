import { DocsContainer as BaseDocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import React, { useEffect, useState } from 'react';
import { addons } from 'storybook/preview-api';

import { readInitialThemeMode, resolveTheme, THEME_MODE_CHANNEL_EVENT } from './theme-presets';
import { darkTheme, lightTheme } from './themes';

function getInitialTheme(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }
    const params = new URLSearchParams(window.location.search);
    const globals = params.get('globals');
    if (globals) {
        const pairs = globals.split(';');
        for (const pair of pairs) {
            const [key, value] = pair.split(':');
            if (key === 'theme' && value === 'dark') {
                return true;
            }
        }
    }
    const initialMode = readInitialThemeMode();
    const resolved = resolveTheme(initialMode);
    return resolved === 'dark' || document.documentElement.classList.contains('dark');
}

export function DocsContainer(props: DocsContainerProps): React.JSX.Element {
    const channel = addons.getChannel();
    const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    useEffect(() => {
        const handleGlobalsUpdated = ({ globals }: { globals?: { theme?: string } }) => {
            if (globals?.theme) {
                setIsDark(globals.theme === 'dark');
            }
        };

        const handleThemeModeEvent = ({ resolved }: { resolved?: string }) => {
            if (resolved) {
                setIsDark(resolved === 'dark');
            }
        };

        channel.on('globalsUpdated', handleGlobalsUpdated);
        channel.on(THEME_MODE_CHANNEL_EVENT, handleThemeModeEvent);
        return () => {
            channel.off('globalsUpdated', handleGlobalsUpdated);
            channel.off(THEME_MODE_CHANNEL_EVENT, handleThemeModeEvent);
        };
    }, [channel]);

    const activeTheme = isDark ? darkTheme : lightTheme;

    return <BaseDocsContainer {...props} theme={activeTheme} />;
}
