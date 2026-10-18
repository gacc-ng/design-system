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
            const header = parsed.header || parsed.raw || '';
            const leadingEmojiMatch = header.match(/^([\p{Extended_Pictographic}\uFE0F]+)\s+(\w+)/u);
            if (leadingEmojiMatch) {
                const [, foundEmoji, foundType] = leadingEmojiMatch;
                const expected = COMMIT_TYPE_EMOJI_MAP[foundType] || foundEmoji;
                return [
                    false,
                    `the emoji must be placed after the colon, not at the beginning of the header.\n` +
                        `Received: "${header}"\n` +
                        `Expected format: "${foundType}: ${expected} <description>" or "${foundType}(scope): ${expected} <description>"`,
                ];
            }

            const rawEmoji = parsed['emoji'] ? String(parsed['emoji']) : '';
            const type = parsed.type;

            if (!type) {
                return [false, 'commit type must not be empty (e.g.: feat, fix, chore, docs)'];
            }

            const expectedEmoji = COMMIT_TYPE_EMOJI_MAP[type];
            if (!expectedEmoji) {
                const allowedTypes = Object.keys(COMMIT_TYPE_EMOJI_MAP).join(', ');
                return [false, `type "${type}" is not recognized. Allowed types: ${allowedTypes}`];
            }

            if (!rawEmoji || rawEmoji.trim().length === 0) {
                const scopePart = parsed.scope ? `(${parsed.scope})` : '';
                return [
                    false,
                    `commit header must include an emoji after the colon for type "${type}".\n` +
                        `Expected format: "${type}${scopePart}: ${expectedEmoji} <description>"`,
                ];
            }

            if (normalizeEmoji(rawEmoji) !== normalizeEmoji(expectedEmoji)) {
                const scopePart = parsed.scope ? `(${parsed.scope})` : '';
                return [
                    false,
                    `type "${type}" must use the emoji ${expectedEmoji} after the colon. Received: "${rawEmoji.trim()}".\n` +
                        `Expected format: "${type}${scopePart}: ${expectedEmoji} <description>"`,
                ];
            }

            if (!parsed.subject || parsed.subject.trim().length === 0) {
                return [false, 'commit subject description must not be empty after the emoji'];
            }

            return [true, ''];
        },
    },
};

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
    plugins: [emojiMatchPlugin],
    ignores: [
        (commit) =>
            commit.includes('dependabot[bot]') ||
            commit.includes('chore(deps') ||
            commit.startsWith('chore(release):') ||
            commit.startsWith('chore(ui-helm): 🔧 release'),
    ],
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w+)(?:\(([^)]*)\))?!?: (?:([\p{Extended_Pictographic}\uFE0F]+)\s+)?(.*)$/u,
            headerCorrespondence: ['type', 'scope', 'emoji', 'subject'],
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
