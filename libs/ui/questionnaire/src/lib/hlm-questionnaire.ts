import { Directive } from '@angular/core';

import {
    BrnQuestionnaire,
    BrnQuestionnaireChoice,
    BrnQuestionnaireChoiceInput,
    BrnQuestionnaireChoiceLabel,
    BrnQuestionnaireChoices,
    BrnQuestionnaireChoiceShortcut,
    BrnQuestionnaireDescription,
    BrnQuestionnaireError,
    BrnQuestionnaireInput,
    BrnQuestionnaireItem,
    BrnQuestionnaireNext,
    BrnQuestionnairePrevious,
    BrnQuestionnaireProgress,
    BrnQuestionnaireSkip,
    BrnQuestionnaireSubmit,
    BrnQuestionnaireTitle,
} from '@spartan-ng/brain/questionnaire';

import { classes } from '@gacc-ng/ui/utils';

@Directive({
    selector: 'form[hlmQuestionnaire],[hlmQuestionnaire]',
    exportAs: 'hlmQuestionnaire',
    hostDirectives: [
        {
            directive: BrnQuestionnaire,
            inputs: ['items', 'defaultItem', 'item', 'shortcuts', 'noValidate'],
            outputs: ['itemChange'],
        },
    ],
    host: {
        'data-slot': 'questionnaire',
    },
})
export class HlmQuestionnaire {
    constructor() {
        classes(() => 'group/questionnaire flex flex-col gap-6 w-full max-w-xl min-w-0');
    }
}

@Directive({
    selector: '[hlmQuestionnaireProgress],hlm-questionnaire-progress',
    exportAs: 'hlmQuestionnaireProgress',
    hostDirectives: [
        {
            directive: BrnQuestionnaireProgress,
            inputs: ['aria-label', 'valueText'],
        },
    ],
    host: {
        'data-slot': 'questionnaire-progress',
    },
})
export class HlmQuestionnaireProgress {
    constructor() {
        classes(() => 'bg-muted h-1 w-full overflow-hidden rounded-full');
    }
}

@Directive({
    selector: 'fieldset[hlmQuestionnaireItem],[hlmQuestionnaireItem]',
    exportAs: 'hlmQuestionnaireItem',
    hostDirectives: [
        {
            directive: BrnQuestionnaireItem,
            inputs: ['name', 'disabled'],
        },
    ],
    host: {
        'data-slot': 'questionnaire-item',
    },
})
export class HlmQuestionnaireItem {
    constructor() {
        classes(() => 'border-0 p-0 m-0 flex flex-col gap-4 group/questionnaire-item min-w-0');
    }
}

@Directive({
    selector: 'legend[hlmQuestionnaireTitle],[hlmQuestionnaireTitle]',
    exportAs: 'hlmQuestionnaireTitle',
    hostDirectives: [{ directive: BrnQuestionnaireTitle }],
    host: {
        'data-slot': 'questionnaire-title',
    },
})
export class HlmQuestionnaireTitle {
    constructor() {
        classes(() => 'text-foreground text-lg font-semibold leading-tight');
    }
}

@Directive({
    selector: '[hlmQuestionnaireDescription],hlm-questionnaire-description',
    exportAs: 'hlmQuestionnaireDescription',
    hostDirectives: [{ directive: BrnQuestionnaireDescription }],
    host: {
        'data-slot': 'questionnaire-description',
    },
})
export class HlmQuestionnaireDescription {
    constructor() {
        classes(() => 'text-muted-foreground text-sm');
    }
}

@Directive({
    selector: '[hlmQuestionnaireChoices],hlm-questionnaire-choices',
    exportAs: 'hlmQuestionnaireChoices',
    hostDirectives: [{ directive: BrnQuestionnaireChoices }],
    host: {
        'data-slot': 'questionnaire-choices',
    },
})
export class HlmQuestionnaireChoices {
    constructor() {
        classes(() => 'flex flex-col gap-2.5');
    }
}

@Directive({
    selector: 'label[hlmQuestionnaireChoice],[hlmQuestionnaireChoice]',
    exportAs: 'hlmQuestionnaireChoice',
    hostDirectives: [
        {
            directive: BrnQuestionnaireChoice,
            inputs: ['value', 'disabled', 'defaultChecked', 'checked'],
            outputs: ['checkedChange'],
        },
    ],
    host: {
        'data-slot': 'questionnaire-choice',
    },
})
export class HlmQuestionnaireChoice {
    constructor() {
        classes(
            () =>
                'border-border bg-card hover:bg-muted/50 data-[checked=true]:border-primary data-[checked=true]:bg-primary/5 flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors',
        );
    }
}

@Directive({
    selector: 'input[hlmQuestionnaireChoiceInput]',
    exportAs: 'hlmQuestionnaireChoiceInput',
    hostDirectives: [{ directive: BrnQuestionnaireChoiceInput }],
    host: {
        'data-slot': 'questionnaire-choice-input',
    },
})
export class HlmQuestionnaireChoiceInput {
    constructor() {
        classes(() => 'accent-primary size-4 cursor-pointer');
    }
}

@Directive({
    selector: '[hlmQuestionnaireChoiceLabel],hlm-questionnaire-choice-label',
    exportAs: 'hlmQuestionnaireChoiceLabel',
    hostDirectives: [{ directive: BrnQuestionnaireChoiceLabel }],
    host: {
        'data-slot': 'questionnaire-choice-label',
    },
})
export class HlmQuestionnaireChoiceLabel {
    constructor() {
        classes(() => 'text-foreground flex-1 select-none text-sm font-medium cursor-pointer');
    }
}

@Directive({
    selector: '[hlmQuestionnaireChoiceShortcut]',
    exportAs: 'hlmQuestionnaireChoiceShortcut',
    hostDirectives: [{ directive: BrnQuestionnaireChoiceShortcut }],
    host: {
        'data-slot': 'questionnaire-choice-shortcut',
    },
})
export class HlmQuestionnaireChoiceShortcut {
    constructor() {
        classes(
            () =>
                'border-border bg-muted/60 text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-xs font-medium',
        );
    }
}

@Directive({
    selector: 'input[hlmQuestionnaireInput],textarea[hlmQuestionnaireInput]',
    exportAs: 'hlmQuestionnaireInput',
    hostDirectives: [{ directive: BrnQuestionnaireInput }],
    host: {
        'data-slot': 'questionnaire-input',
    },
})
export class HlmQuestionnaireInput {
    constructor() {
        classes(
            () =>
                'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3',
        );
    }
}

@Directive({
    selector: '[hlmQuestionnaireError],hlm-questionnaire-error',
    exportAs: 'hlmQuestionnaireError',
    hostDirectives: [{ directive: BrnQuestionnaireError }],
    host: {
        'data-slot': 'questionnaire-error',
    },
})
export class HlmQuestionnaireError {
    constructor() {
        classes(() => 'text-destructive text-xs font-medium');
    }
}

@Directive({
    selector: '[hlmQuestionnaireActions],hlm-questionnaire-actions',
    exportAs: 'hlmQuestionnaireActions',
    host: {
        'data-slot': 'questionnaire-actions',
    },
})
export class HlmQuestionnaireActions {
    constructor() {
        classes(() => 'flex items-center justify-between gap-3 pt-2');
    }
}

@Directive({
    selector: 'button[hlmQuestionnairePrevious]',
    exportAs: 'hlmQuestionnairePrevious',
    hostDirectives: [
        {
            directive: BrnQuestionnairePrevious,
            inputs: ['disabled'],
        },
    ],
    host: {
        'data-slot': 'questionnaire-previous',
    },
})
export class HlmQuestionnairePrevious {
    constructor() {
        classes(
            () =>
                'border-input bg-background hover:bg-muted inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        );
    }
}

@Directive({
    selector: 'button[hlmQuestionnaireSkip]',
    exportAs: 'hlmQuestionnaireSkip',
    hostDirectives: [
        {
            directive: BrnQuestionnaireSkip,
            inputs: ['disabled'],
        },
    ],
    host: {
        'data-slot': 'questionnaire-skip',
    },
})
export class HlmQuestionnaireSkip {
    constructor() {
        classes(
            () =>
                'text-muted-foreground hover:text-foreground cursor-pointer text-xs underline underline-offset-4 transition-colors disabled:pointer-events-none disabled:opacity-50',
        );
    }
}

@Directive({
    selector: 'button[hlmQuestionnaireNext]',
    exportAs: 'hlmQuestionnaireNext',
    hostDirectives: [
        {
            directive: BrnQuestionnaireNext,
            inputs: ['disabled'],
        },
    ],
    host: {
        'data-slot': 'questionnaire-next',
    },
})
export class HlmQuestionnaireNext {
    constructor() {
        classes(
            () =>
                'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-1.5 text-sm font-medium shadow-xs transition-colors disabled:pointer-events-none disabled:opacity-50',
        );
    }
}

@Directive({
    selector: 'button[hlmQuestionnaireSubmit]',
    exportAs: 'hlmQuestionnaireSubmit',
    hostDirectives: [
        {
            directive: BrnQuestionnaireSubmit,
            inputs: ['disabled'],
        },
    ],
    host: {
        'data-slot': 'questionnaire-submit',
    },
})
export class HlmQuestionnaireSubmit {
    constructor() {
        classes(
            () =>
                'bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-1.5 text-sm font-medium shadow-xs transition-colors disabled:pointer-events-none disabled:opacity-50',
        );
    }
}

export const HlmQuestionnaireImports = [
    HlmQuestionnaire,
    HlmQuestionnaireProgress,
    HlmQuestionnaireItem,
    HlmQuestionnaireTitle,
    HlmQuestionnaireDescription,
    HlmQuestionnaireChoices,
    HlmQuestionnaireChoice,
    HlmQuestionnaireChoiceInput,
    HlmQuestionnaireChoiceLabel,
    HlmQuestionnaireChoiceShortcut,
    HlmQuestionnaireInput,
    HlmQuestionnaireError,
    HlmQuestionnaireActions,
    HlmQuestionnairePrevious,
    HlmQuestionnaireSkip,
    HlmQuestionnaireNext,
    HlmQuestionnaireSubmit,
] as const;
