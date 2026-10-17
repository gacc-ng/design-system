import type { Plugin, UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

/**
 * Standard mapping between Conventional Commit types and allowed Gitmoji symbols.
 */
export const COMMIT_TYPE_EMOJI_MAP: Record<string, { emoji: string; alternates?: string[]; description: string }> = {
    feat: {
        emoji: '✨',
        description: 'A new feature',
    },
    fix: {
        emoji: '🐛',
        alternates: ['🚑️', '🚑'],
        description: 'A bug fix',
    },
    docs: {
        emoji: '📝',
        alternates: ['📚'],
        description: 'Documentation only changes',
    },
    style: {
        emoji: '💄',
        description: 'Changes that do not affect the meaning of the code (formatting, styles)',
    },
    refactor: {
        emoji: '♻️',
        description: 'A code change that neither fixes a bug nor adds a feature',
    },
    perf: {
        emoji: '⚡',
        description: 'A code change that improves performance',
    },
    test: {
        emoji: '✅',
        description: 'Adding missing tests or correcting existing tests',
    },
    build: {
        emoji: '🏗️',
        alternates: ['📦'],
        description: 'Changes that affect the build system or external dependencies',
    },
    ci: {
        emoji: '👷',
        alternates: ['🤖'],
        description: 'Changes to our CI configuration files and scripts',
    },
    chore: {
        emoji: '🔧',
        description: "Other changes that don't modify src or test files",
    },
    revert: {
        emoji: '⏪',
        description: 'Reverts a previous commit',
    },
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
                    .map(([t, val]) => `${val.emoji} ${t}: ...`)
                    .join(', ');
                return [false, `commit header must start with an emoji matching the type (e.g.: ${examples})`];
            }

            if (!type) {
                return [false, 'commit type must not be empty after the emoji'];
            }

            const mapping = COMMIT_TYPE_EMOJI_MAP[type];
            if (!mapping) {
                const allowedTypes = Object.keys(COMMIT_TYPE_EMOJI_MAP).join(', ');
                return [false, `type "${type}" is not recognized. Allowed types: ${allowedTypes}`];
            }

            const allowedEmojis = [mapping.emoji, ...(mapping.alternates || [])].map(normalizeEmoji);
            const normalizedInput = normalizeEmoji(rawEmoji);

            if (!allowedEmojis.includes(normalizedInput)) {
                return [
                    false,
                    `type "${type}" must be prefixed with ${mapping.emoji}. Received: "${rawEmoji.trim()}". Example: ${mapping.emoji} ${type}${parsed.scope ? `(${parsed.scope})` : ''}: <subject>`,
                ];
            }

            return [true, ''];
        },
    },
};

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
    plugins: [emojiMatchPlugin],
    parserPreset: {
        /* eslint-disable no-misleading-character-class */
        parserOpts: {
            headerPattern:
                /^(?:([\p{Extended_Pictographic}\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}]+)\s+)?(\w+)(?:\(([^)]+)\))?!?: (.+)$/u,
            headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
        },
        /* eslint-enable no-misleading-character-class */
    },
    rules: {
        'header-type-emoji-match': [RuleConfigSeverity.Error, 'always'],
        'type-enum': [RuleConfigSeverity.Error, 'always', Object.keys(COMMIT_TYPE_EMOJI_MAP)],
        'header-max-length': [RuleConfigSeverity.Error, 'always', 120],
        'scope-case': [RuleConfigSeverity.Error, 'always', 'kebab-case'],
    },
};

export default Configuration;
