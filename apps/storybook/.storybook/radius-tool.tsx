import React, { useCallback, useState } from 'react';
import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components';
import { addons, useStorybookApi } from 'storybook/manager-api';

import {
    isRadiusPreset,
    RADIUS_CHANNEL_EVENT,
    RADIUS_OPTIONS,
    RADIUS_STORAGE_KEY,
    type RadiusPreset,
    type SetRadiusPayload,
} from './radius-presets';

export function RadiusTool(): React.JSX.Element {
    const api = useStorybookApi();
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
                /* noop: private browsing or restricted iframe */
            }
        }
        return 'default';
    });

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
