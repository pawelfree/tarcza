import { Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'minute' } )
export class MinutePipe implements PipeTransform {
    transform( value: number ): string {
        return Math.floor( value / 60 ) + ":" + ( "0" + ( value % 60 ) ).slice( -2 );
    }
}