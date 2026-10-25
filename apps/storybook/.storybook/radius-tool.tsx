import React, { useCallback, useEffect, useState } from 'react';
import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components';
import { addons, useStorybookApi } from 'storybook/manager-api';

export const RADIUS_OPTIONS = [
    { id: 'default', title: 'Default' },
    { id: 'none', title: 'None (0px)' },
    { id: 'subtle', title: 'Subtle (4px)' },
    { id: 'moderate', title: 'Moderate (14px)' },
    { id: 'pronounced', title: 'Pronounced (24px)' },
] as const;

export type RadiusPreset = (typeof RADIUS_OPTIONS)[number]['id'];

const STORAGE_KEY = 'gacc-storybook-radius';

export function RadiusTool(): React.JSX.Element {
    const api = useStorybookApi();
    const [radius, setRadius] = useState<RadiusPreset>(() => {
        if (typeof window !== 'undefined') {
            const urlParam = api?.getQueryParam('radius');
            if (urlParam && RADIUS_OPTIONS.some((o) => o.id === urlParam)) {
                return urlParam as RadiusPreset;
            }
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && RADIUS_OPTIONS.some((o) => o.id === stored)) {
                return stored as RadiusPreset;
            }
        }
        return 'default';
    });

    const selectRadius = useCallback(
        (newRadius: RadiusPreset) => {
            setRadius(newRadius);
            if (typeof window !== 'undefined') {
                localStorage.setItem(STORAGE_KEY, newRadius);
                api?.setQueryParams({ radius: newRadius === 'default' ? '' : newRadius });
                addons.getChannel().emit('gacc/set-radius', { radius: newRadius });
            }
        },
        [api],
    );

    // Initial broadcast when preview connects
    useEffect(() => {
        const emitCurrent = () => {
            addons.getChannel().emit('gacc/set-radius', { radius });
        };
        addons.getChannel().on('storyRendered', emitCurrent);
        addons.getChannel().on('docsRendered', emitCurrent);
        return () => {
            addons.getChannel().off('storyRendered', emitCurrent);
            addons.getChannel().off('docsRendered', emitCurrent);
        };
    }, [radius]);

    const activeOption = RADIUS_OPTIONS.find((o) => o.id === radius) ?? RADIUS_OPTIONS[0];

    return (
        <WithTooltip
            placement="top"
            trigger="click"
            closeOnOutsideClick
            tooltip={({ onHide }) => (
                <TooltipLinkList
                    links={RADIUS_OPTIONS.map((opt) => ({
                        id: opt.id,
                        title: opt.title,
                        active: opt.id === radius,
                        onClick: () => {
                            selectRadius(opt.id);
                            onHide();
                        },
                    }))}
                />
            )}
        >
            <IconButton title={`Corner Radius: ${activeOption.title}`} active={radius !== 'default'}>
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
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                </svg>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{activeOption.title.split(' ')[0]}</span>
            </IconButton>
        </WithTooltip>
    );
}
