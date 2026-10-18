import type { Plugin, UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

/**
 * Strict key-value mapping between Conventional Commit types and required Gitmoji symbols.
 */
export const COMMIT_TYPE_EMOJI_MAP: Record<string, string> = {
    feat: '✨',
    fix: '🐛',
    docs: '📝',
    style: '💄',
    refactor: '♻️',
    perf: '⚡',
    test: '✅',
    build: '🏗️',
    ci: '👷',
    chore: '🔧',
    revert: '⏪',
};

const normalizeEmoji = (value?: string | null): string => (value || '').replace(/\uFE0F/g, '').trim();

const emojiMatchPlugin: Plugin = {
    rules: {
        'header-type-emoji-match': (parsed) => {
            const rawEmoji = parsed['emoji'] ? String(parsed['emoji']) : '';
            const type = parsed.type;

            if (!rawEmoji || rawEmoji.trim().length === 0) {
                const examples = Object.entries(COMMIT_TYPE_EMOJI_MAP)
                    .slice(0, 4)
                    .map(([t, emoji]) => `${emoji} ${t}: ...`)
                    .join(', ');
                return [false, `commit header must start with an emoji matching the type (e.g.: ${examples})`];
            }

            if (!type) {
                return [false, 'commit type must not be empty after the emoji'];
            }

            const expectedEmoji = COMMIT_TYPE_EMOJI_MAP[type];
            if (!expectedEmoji) {
                const allowedTypes = Object.keys(COMMIT_TYPE_EMOJI_MAP).join(', ');
                return [false, `type "${type}" is not recognized. Allowed types: ${allowedTypes}`];
            }

            if (normalizeEmoji(rawEmoji) !== normalizeEmoji(expectedEmoji)) {
                return [
                    false,
                    `type "${type}" must be prefixed with ${expectedEmoji}. Received: "${rawEmoji.trim()}". Example: ${expectedEmoji} ${type}${parsed.scope ? `(${parsed.scope})` : ''}: <subject>`,
                ];
            }

            return [true, ''];
        },
    },
};

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
    plugins: [emojiMatchPlugin],
    ignores: [(commit) => commit.includes('dependabot[bot]') || commit.includes('chore(deps')],
    parserPreset: {
        parserOpts: {
            headerPattern: /^(?:([\p{Extended_Pictographic}\uFE0F]+)\s+)?(\w+)(?:\(([^)]+)\))?!?: (.+)$/u,
            headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
        },
    },
    rules: {
        'header-type-emoji-match': [RuleConfigSeverity.Error, 'always'],
        'type-enum': [RuleConfigSeverity.Error, 'always', Object.keys(COMMIT_TYPE_EMOJI_MAP)],
        'header-max-length': [RuleConfigSeverity.Error, 'always', 120],
        'scope-case': [RuleConfigSeverity.Error, 'always', 'kebab-case'],
    },
};

export default Configuration;
