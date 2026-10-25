import DefaultChangelogRenderer, { type ChangelogChange } from 'nx/release/changelog-renderer';

// Robust unwrapping of DefaultChangelogRenderer across CJS and Node native type-stripping ESM
// while preserving 100% of constructor and instance types.
const ResolvedBaseRenderer: typeof DefaultChangelogRenderer =
    (DefaultChangelogRenderer as unknown as { default: typeof DefaultChangelogRenderer }).default ||
    DefaultChangelogRenderer;

const TYPE_COLOR_MAP: Record<string, string> = {
    feat: 'blue',
    fix: 'green',
    perf: 'orange',
    refactor: 'yellow',
    docs: 'blue',
    style: 'lightgrey',
    test: 'yellow',
    build: 'purple',
    ci: 'purple',
    chore: 'lightgrey',
    revert: 'red',
};

const LEADING_EMOJI_REGEX = /^[\p{Extended_Pictographic}\uFE0F]+\s*/u;

/**
 * Custom Changelog Renderer for Nx Release matching Angular's official release format:
 * - Changes grouped primarily by scope (component/package)
 * - Markdown tables per scope with "Commit" and "Description" columns
 * - Shields.io badges for commit hashes and semantic types
 */
export default class AngularStyleChangelogRenderer extends ResolvedBaseRenderer {
    protected override renderChangesByType(): string[] {
        const markdownLines: string[] = [];
        const scopeGroups = this.groupChangesByScopeCustom(this.relevantChanges);
        const sortedScopes = Object.keys(scopeGroups).sort((a, b) => a.localeCompare(b));

        const repoData = this.remoteReleaseClient?.getRemoteRepoData?.();
        const repoSlug = repoData?.slug || 'gacc-ng/design-system';

        for (const scope of sortedScopes) {
            const changes = scopeGroups[scope];
            if (!changes || changes.length === 0) {
                continue;
            }

            markdownLines.push('', `### ${scope}`, '', '| Commit | Description |', '| -- | -- |');

            for (const change of changes) {
                const type = (change.type || 'feat').toLowerCase();
                const color = TYPE_COLOR_MAP[type] || 'lightgrey';
                const shortHash = change.shortHash || 'commit';
                const commitUrl = change.shortHash
                    ? `https://github.com/${repoSlug}/commit/${change.shortHash}`
                    : `https://github.com/${repoSlug}`;
                const badgeUrl = `https://img.shields.io/badge/${shortHash}-${type}-${color}`;
                const badgeMarkdown = `[![${type} - ${shortHash}](${badgeUrl})](${commitUrl})`;

                let description = (change.description || '').replace(LEADING_EMOJI_REGEX, '').trim();
                // Escape backslashes first, then pipe characters, to maintain valid markdown table formatting (CWE-116)
                description = description.replace(/\\/g, '\\\\').replace(/\|/g, '\\|');

                let references = '';
                if (
                    this.remoteReleaseClient &&
                    this.changelogRenderOptions?.commitReferences &&
                    change.githubReferences
                ) {
                    references = ` ${this.remoteReleaseClient.formatReferences(change.githubReferences)}`;
                }

                markdownLines.push(`| ${badgeMarkdown} | ${description}${references} |`);

                if (change.isBreaking && !this.isVersionPlans) {
                    this.breakingChanges.push(this.formatBreakingChange(change));
                }
            }
        }

        return markdownLines;
    }

    private groupChangesByScopeCustom(changes: ChangelogChange[]): Record<string, ChangelogChange[]> {
        const groups: Record<string, ChangelogChange[]> = {};
        for (const change of changes) {
            const scope = (change.scope || 'general').trim();
            if (!groups[scope]) {
                groups[scope] = [];
            }
            groups[scope].push(change);
        }
        return groups;
    }
}
