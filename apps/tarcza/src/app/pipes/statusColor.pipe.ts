import { Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'statusColor' } )
export class StatusColorPipe implements PipeTransform {

    transform( value: string ) {

        let statusColor = '';
        switch (value) {
            case 'NEW': 
            case 'GRANTED':
            case 'GRANTED_CHANGED':
            case 'SEND':
            {
                statusColor = 'green';
                break;
            }
            case 'REJECTED_BAD_DATA': 
            case 'REJECTED_AFTER_SCORING':
            {
                statusColor = 'red';
                break;
            }
            default: {
                break;
            }
        }
        return statusColor;
    }
}
