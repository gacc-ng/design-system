import React, { useCallback, useEffect, useState } from 'react';
import { IconButton, WithTooltip } from 'storybook/internal/components';
import { addons, useStorybookApi } from 'storybook/manager-api';

import {
    isRadiusPreset,
    RADIUS_CHANNEL_EVENT,
    RADIUS_OPTIONS,
    RADIUS_STORAGE_KEY,
    type RadiusPreset,
    type SetRadiusPayload,
} from './radius-presets';
import {
    getSystemTheme,
    readInitialThemeMode,
    type ResolvedTheme,
    resolveTheme,
    THEME_MODE_CHANNEL_EVENT,
    THEME_MODE_STORAGE_KEY,
    type ThemeMode,
} from './theme-presets';
import { darkTheme, lightTheme } from './themes';

export function ThemeTool(): React.JSX.Element {
    const api = useStorybookApi();
    const [mode, setMode] = useState<ThemeMode>(() => readInitialThemeMode());
    const [resolved, setResolved] = useState<ResolvedTheme>(() => resolveTheme(readInitialThemeMode()));
    const [radius, setRadius] = useState<RadiusPreset>(() => {
        if (typeof window !== 'undefined') {
            const urlParam = api?.getQueryParam('radius');
            if (isRadiusPreset(urlParam)) {
                return urlParam;
            }
            try {
                const stored = localStorage.getItem(RADIUS_STORAGE_KEY);
                if (isRadiusPreset(stored)) {
                    return stored;
                }
            } catch {
                /* noop */
            }
        }
        return 'default';
    });

    const applyThemeSelection = useCallback(
        (newMode: ThemeMode) => {
            const newResolved = resolveTheme(newMode);
            setMode(newMode);
            setResolved(newResolved);

            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem(THEME_MODE_STORAGE_KEY, newMode);
                } catch {
                    /* noop */
                }
                api?.setQueryParams({ theme: newMode === 'system' ? '' : newMode });

                // Synchronize manager UI theme
                api?.setOptions({
                    theme: newResolved === 'dark' ? darkTheme : lightTheme,
                });

                // Update Storybook globals for preview and docs sync
                api?.updateGlobals({ theme: newResolved });

                // Broadcast theme mode event across channel
                addons.getChannel().emit(THEME_MODE_CHANNEL_EVENT, {
                    mode: newMode,
                    resolved: newResolved,
                });
            }
        },
        [api],
    );

    // Watch for OS system theme changes when mode is 'system'
    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleOsThemeChange = () => {
            if (mode === 'system') {
                const currentResolved = getSystemTheme();
                setResolved(currentResolved);
                api?.setOptions({
                    theme: currentResolved === 'dark' ? darkTheme : lightTheme,
                });
                api?.updateGlobals({ theme: currentResolved });
                addons.getChannel().emit(THEME_MODE_CHANNEL_EVENT, {
                    mode: 'system',
                    resolved: currentResolved,
                });
            }
        };

        mediaQuery.addEventListener('change', handleOsThemeChange);
        return () => {
            mediaQuery.removeEventListener('change', handleOsThemeChange);
        };
    }, [mode, api]);

    const selectRadius = useCallback(
        (newRadius: RadiusPreset) => {
            setRadius(newRadius);
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem(RADIUS_STORAGE_KEY, newRadius);
                } catch {
                    /* noop */
                }
                api?.setQueryParams({ radius: newRadius === 'default' ? '' : newRadius });
                const payload: SetRadiusPayload = { radius: newRadius, animate: true };
                addons.getChannel().emit(RADIUS_CHANNEL_EVENT, payload);
            }
        },
        [api],
    );

    const isDarkUi = resolved === 'dark';
    const cardBg = isDarkUi ? '#18181b' : '#ffffff';
    const cardBorder = isDarkUi ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDarkUi ? '#fafafa' : '#18181b';

    return (
        <WithTooltip
            placement="bottom-start"
            trigger="click"
            closeOnOutsideClick
            tooltip={() => (
                <div
                    style={{
                        padding: '16px',
                        width: '260px',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        color: textColor,
                        backgroundColor: cardBg,
                        borderRadius: '10px',
                        boxShadow: isDarkUi
                            ? '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
                            : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                    }}
                >
                    {/* Section: Color Mode */}
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: textColor }}>
                        Color
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '8px',
                            marginBottom: '16px',
                        }}
                    >
                        {/* Light Card */}
                        <button
                            type="button"
                            onClick={() => applyThemeSelection('light')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px 6px',
                                borderRadius: '6px',
                                border: mode === 'light' ? '1.5px solid #2563eb' : `1px solid ${cardBorder}`,
                                backgroundColor:
                                    mode === 'light'
                                        ? isDarkUi
                                            ? 'rgba(37, 99, 235, 0.18)'
                                            : '#eff6ff'
                                        : 'transparent',
                                cursor: 'pointer',
                                outline: 'none',
                                transition: 'all 150ms ease',
                            }}
                        >
                            {/* Toggle Switch Graphic: Light */}
                            <div
                                style={{
                                    width: 36,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: '#e4e4e7',
                                    border: '1px solid #d4d4d8',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 2px',
                                }}
                            >
                                <div
                                    style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#2563eb' }}
                                />
                            </div>
                            <span
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: mode === 'light' ? '#2563eb' : textColor,
                                }}
                            >
                                Light
                            </span>
                        </button>

                        {/* Dark Card */}
                        <button
                            type="button"
                            onClick={() => applyThemeSelection('dark')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px 6px',
                                borderRadius: '6px',
                                border: mode === 'dark' ? '1.5px solid #2563eb' : `1px solid ${cardBorder}`,
                                backgroundColor:
                                    mode === 'dark'
                                        ? isDarkUi
                                            ? 'rgba(37, 99, 235, 0.18)'
                                            : '#eff6ff'
                                        : 'transparent',
                                cursor: 'pointer',
                                outline: 'none',
                                transition: 'all 150ms ease',
                            }}
                        >
                            {/* Toggle Switch Graphic: Dark */}
                            <div
                                style={{
                                    width: 36,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: '#18181b',
                                    border: '1px solid #3f3f46',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    padding: '0 2px',
                                }}
                            >
                                <div
                                    style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#2563eb' }}
                                />
                            </div>
                            <span
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: mode === 'dark' ? '#2563eb' : textColor,
                                }}
                            >
                                Dark
                            </span>
                        </button>

                        {/* System Card */}
                        <button
                            type="button"
                            onClick={() => applyThemeSelection('system')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '12px 6px',
                                borderRadius: '6px',
                                border: mode === 'system' ? '1.5px solid #2563eb' : `1px solid ${cardBorder}`,
                                backgroundColor:
                                    mode === 'system'
                                        ? isDarkUi
                                            ? 'rgba(37, 99, 235, 0.18)'
                                            : '#eff6ff'
                                        : 'transparent',
                                cursor: 'pointer',
                                outline: 'none',
                                transition: 'all 150ms ease',
                            }}
                        >
                            {/* Toggle Switch Graphic: System Split */}
                            <div
                                style={{
                                    width: 36,
                                    height: 20,
                                    borderRadius: 10,
                                    background: 'linear-gradient(90deg, #e4e4e7 50%, #18181b 50%)',
                                    border: '1px solid #71717a',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <div
                                    style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: '#2563eb' }}
                                />
                            </div>
                            <span
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: mode === 'system' ? '#2563eb' : textColor,
                                }}
                            >
                                System
                            </span>
                        </button>
                    </div>

                    {/* Section: Corner Radius */}
                    <div style={{ borderTop: `1px solid ${cardBorder}`, paddingTop: '12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: textColor }}>
                            Corner radius
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {RADIUS_OPTIONS.map((opt) => {
                                const isSelected = opt.id === radius;
                                return (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => selectRadius(opt.id)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '6px 8px',
                                            borderRadius: '4px',
                                            border: 'none',
                                            backgroundColor: isSelected
                                                ? isDarkUi
                                                    ? 'rgba(37, 99, 235, 0.18)'
                                                    : 'rgba(37, 99, 235, 0.1)'
                                                : 'transparent',
                                            color: isSelected ? '#2563eb' : isDarkUi ? '#fafafa' : '#18181b',
                                            fontWeight: isSelected ? 600 : 400,
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'background-color 120ms ease',
                                        }}
                                    >
                                        <span>{opt.title}</span>
                                        {isSelected && (
                                            <svg
                                                width="13"
                                                height="13"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        >
            <IconButton title={`Theme: ${mode} (${resolved})`} active={mode !== 'system' || radius !== 'default'}>
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: 6 }}
                >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <polygon points="3,21 21,3 21,21" fill="currentColor" />
                </svg>
                <span style={{ fontSize: 12, fontWeight: 500 }}>Theme</span>
            </IconButton>
        </WithTooltip>
    );
}
