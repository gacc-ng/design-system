import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular-vite';

import { HlmTypographyImports } from '../index';

import { HlmH1 } from './hlm-h1';

const meta: Meta = {
    title: 'Primitives/Typography',
    component: HlmH1,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [HlmTypographyImports],
        }),
    ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    render: () => ({
        template: `
            <div class="max-w-2xl space-y-4">
                <h1 hlmH1>The Joke Tax Chronicles</h1>
                <p hlmLead>
                    Once upon a time, in a far-off land, there was a very peculiar king who decided to tax laughter.
                </p>
                <h2 hlmH2>The People's Discontent</h2>
                <p hlmP>
                    The king thought that laughter was a sign of wasteful frivolity, and decreed that citizens must pay for every chuckle.
                </p>
                <blockquote hlmBlockquote>
                    "Laughter without taxation is the mother of all unrest." — Royal Decree #42
                </blockquote>
                <h3 hlmH3>The Schedule of Levies</h3>
                <p hlmP>
                    The council established a progressive tariff structure based on hilarity volume:
                </p>
                <ul hlmUl>
                    <li>Mild giggles: 1 copper token</li>
                    <li>Hearty guffaws: 5 silver tokens</li>
                    <li>Uncontrollable snorts: 1 gold coin</li>
                </ul>
                <p hlmP>
                    You can inspect the ledger using <code hlmCode>npm run audit-laughter</code>.
                </p>
                <div hlmLarge>King's Treasurer Office</div>
                <small hlmSmall>All rights reserved. Subject to annual tax reviews.</small>
                <p hlmMuted>For exemptions, visit the royal ministry of humor.</p>
            </div>
        `,
    }),
};

export const Headings: Story = {
    render: () => ({
        template: `
            <div class="space-y-4">
                <h1 hlmH1>Heading 1 (4xl/5xl)</h1>
                <h2 hlmH2>Heading 2 (3xl)</h2>
                <h3 hlmH3>Heading 3 (2xl)</h3>
                <h4 hlmH4>Heading 4 (xl)</h4>
            </div>
        `,
    }),
};

export const ProseAndQuotes: Story = {
    render: () => ({
        template: `
            <div class="max-w-xl space-y-4">
                <p hlmLead>Lead paragraph introducing a thoughtful design concept.</p>
                <p hlmP>Standard body paragraph with balanced line-height and proportional spacing.</p>
                <blockquote hlmBlockquote>
                    "Design is not just what it looks like and feels like. Design is how it works."
                </blockquote>
                <ul hlmUl>
                    <li>First design pillar: clarity and contrast</li>
                    <li>Second design pillar: keyboard accessibility</li>
                    <li>Third design pillar: deterministic state management</li>
                </ul>
            </div>
        `,
    }),
};

export const InlineElements: Story = {
    render: () => ({
        template: `
            <div class="space-y-3">
                <div hlmLarge>Large emphasis text block</div>
                <div>Standard paragraph with <code hlmCode>inline code snippet</code> embedded cleanly.</div>
                <div><small hlmSmall>Small legal or annotation text</small></div>
                <p hlmMuted>Muted informational footnote</p>
            </div>
        `,
    }),
};
