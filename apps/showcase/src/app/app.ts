import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HlmButton } from '@gacc-ng/ui/button';

import { NxWelcome } from './nx-welcome';

@Component({
    imports: [NxWelcome, RouterModule, HlmButton],
    selector: 'gacc-root',
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected title = 'showcase';
}
