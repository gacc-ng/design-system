export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export const THEME_MODE_STORAGE_KEY = 'gacc-storybook-theme-mode';
export const THEME_MODE_CHANNEL_EVENT = 'gacc/set-theme-mode';

export interface SetThemeModePayload {
    mode: ThemeMode;
    resolved: ResolvedTheme;
}

export function isThemeMode(value: unknown): value is ThemeMode {
    return value === 'light' || value === 'dark' || value === 'system';
}

export function getSystemTheme(): ResolvedTheme {
    if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        return 'dark';
    }
    return 'light';
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
    if (mode === 'system') {
        return getSystemTheme();
    }
    return mode;
}

export function readInitialThemeMode(): ThemeMode {
    if (typeof window === 'undefined') return 'system';
    const fromUrl = new URLSearchParams(window.location.search).get('theme');
    if (isThemeMode(fromUrl)) return fromUrl;
    try {
        const stored = localStorage.getItem(THEME_MODE_STORAGE_KEY);
        if (isThemeMode(stored)) return stored;
    } catch {
        // Fallback for restricted iframe / storage
    }
    return 'system';
}
