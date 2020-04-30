import { Component, Input } from '@angular/core';
import { Wniosek } from '../models/wniosek';

@Component({
    selector: 'app-odwolania',
    templateUrl: 'odwolania.component.html',
    styleUrls: ['odwolania.component.css']
})
export class OdwolaniaComponent {

    @Input()
    odwolania: Wniosek[];
    constructor() {}
}
