import { Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'status' } )
export class StatusAppPipe implements PipeTransform {

    transform( value: string ) {

        let appStatusPl = '';
        switch (value) {
            case 'NEW': {
                appStatusPl = 'Wprowadzony';
                break;
            }
            case 'SEND': {
                appStatusPl = 'Wysłany';
                break;
            }
            case 'REJECTED_BAD_DATA': {
                appStatusPl = 'Odrzucony';
                break;
            }
            case 'REJECTED_AFTER_SCORING': {
                appStatusPl = 'Odrzucony';
                break;
            }
            case 'GRANTED': {
                appStatusPl = 'Przyznany';
                break;
            }
            case 'GRANTED_CHANGED': {
                appStatusPl = 'Przyznany';
                break;
            }
            case 'INITIATED': {
                appStatusPl = 'Wypłacony';
                break;
            } default: {
                appStatusPl = 'Weryfikacja';
                break;
            }
        }
        return appStatusPl;
    }
}
