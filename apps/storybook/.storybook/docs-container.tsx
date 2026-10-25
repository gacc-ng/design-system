import { DocsContainer as BaseDocsContainer, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import React, { useEffect, useState } from 'react';
import { addons } from 'storybook/preview-api';

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
    return document.documentElement.classList.contains('dark');
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

        channel.on('globalsUpdated', handleGlobalsUpdated);
        return () => {
            channel.off('globalsUpdated', handleGlobalsUpdated);
        };
    }, [channel]);

    const activeTheme = isDark ? darkTheme : lightTheme;

    return <BaseDocsContainer {...props} theme={activeTheme} />;
}
