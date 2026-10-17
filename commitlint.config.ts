import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
    parserPreset: {
        parserOpts: {
            headerPattern:
                /^(?:([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]+)\s+)?(\w+)(?:\(([^)]+)\))?!?: (.+)$/u,
            headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
        },
    },
    rules: {
        'type-enum': [
            RuleConfigSeverity.Error,
            'always',
            ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'],
        ],
        'header-max-length': [RuleConfigSeverity.Error, 'always', 120],
        'scope-case': [RuleConfigSeverity.Error, 'always', 'kebab-case'],
    },
};

export default Configuration;
