import { Component, Input } from '@angular/core';
import { Wniosek } from '../../models/wniosek';

@Component({
    selector: 'app-odwolanie',
    templateUrl: 'odwolanie.component.html',
    styleUrls: ['odwolanie.component.css']
})
export class OdwolanieComponent {

    @Input()
    odwolanie: Wniosek;
    constructor() {}
}
