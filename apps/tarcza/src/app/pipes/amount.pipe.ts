
import { Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'amount' } )
export class AmountPipe implements PipeTransform {
    transform( value: string ) {
        const newValue: string  =  value.replace('.', ',');
        return newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' zł.';
    }
}
