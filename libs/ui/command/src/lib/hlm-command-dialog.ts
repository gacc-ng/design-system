import { type BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, Component, computed, input, linkedSignal, output } from '@angular/core';

import { type BrnDialogState } from '@spartan-ng/brain/dialog';
import { type ClassValue } from 'clsx';

import { HlmDialogImports } from '@gacc-ng/ui/dialog';
import { hlm } from '@gacc-ng/ui/utils';

@Component({
    selector: 'hlm-command-dialog',
    exportAs: 'hlmCommandDialog',
    imports: [HlmDialogImports],
    template: `
        <hlm-dialog [state]="_state()" (stateChanged)="stateChanged($event)">
            <hlm-dialog-content
                *hlmDialogPortal="let ctx"
                [class]="_computedDialogContentClass()"
                [showCloseButton]="showCloseButton()"
            >
                <hlm-dialog-header class="sr-only">
                    <h2 hlmDialogTitle>{{ title() }}</h2>
                    <p hlmDialogDescription>{{ description() }}</p>
                </hlm-dialog-header>
                <ng-content />
            </hlm-dialog-content>
        </hlm-dialog>
    `,
})
export class HlmCommandDialog {
    public readonly title = input<string>('Command Palette');
    public readonly description = input<string>('Search for a command to run...');

    public readonly state = input<BrnDialogState>('closed');
    protected readonly _state = linkedSignal(this.state);

    public readonly showCloseButton = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

    public readonly dialogContentClass = input<ClassValue>('');
    protected readonly _computedDialogContentClass = computed(() => hlm('w-96 p-0', this.dialogContentClass()));

    public readonly stateChange = output<BrnDialogState>();

    protected stateChanged(state: BrnDialogState): void {
        this.stateChange.emit(state);
        this._state.set(state);
    }
}
