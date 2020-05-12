import { NgModule } from '@angular/core';
import { MinutePipe } from './minute.pipe';
import { StatusAppPipe } from './status.pipe';
import { AmountPipe } from './amount.pipe';
import { DateAppPipe } from './date.pipe';
import { StatusColorPipe } from './statusColor.pipe';
import { AmountColorPipe } from './amountColor.pipe';

@NgModule({
    declarations: [
        AmountPipe,
        DateAppPipe,
        MinutePipe,
        StatusAppPipe,
        StatusColorPipe,
        AmountColorPipe
    ],
    exports: [
        AmountPipe,
        DateAppPipe,
        MinutePipe,
        StatusAppPipe,
        StatusColorPipe,
        AmountColorPipe
    ]
})
export class PipesModule {
    constructor() { }
}
