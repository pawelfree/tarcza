
import { Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'amount' } )
export class AmountPipe implements PipeTransform {
    transform( value: number ): string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' zł.';
    }
}
