import { NgModule } from '@angular/core';
import { MinutePipe } from './minute.pipe';
import { StatusAppPipe } from './status.pipe';
import { AmountPipe } from './amount.pipe';
import { DateAppPipe } from './date.pipe';

@NgModule({
    declarations: [
        AmountPipe,
        DateAppPipe,
        MinutePipe,
        StatusAppPipe
    ],
    exports: [
        AmountPipe,
        DateAppPipe,
        MinutePipe,
        StatusAppPipe
    ]
})
export class PipesModule {
    constructor() { }
}
