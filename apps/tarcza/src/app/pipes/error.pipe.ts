import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'errorMsg' })
export class ErrorMsgPipe implements PipeTransform {
  transform(kodBledu: string) {
    let msg = 'Wystąpił nieoczekiwany błąd';
    if (kodBledu) {
      switch (kodBledu) {
        case 'INCORECT_HASH':
        case 'INCORECT_OWNER':
          {
            msg = 'Nie posiadasz uprawnień do złożenia odwołania do tego wniosku';
            break;
          }
        case 'CLAIM_NOT_ALLOWED':
          {
            msg = 'Złożenie odwołania do tego wniosku nie jest możliwe. Sprawdź zasady odwołania się określone w programie';
            break;
          }
        case 'CURRENT_CLAIM':
          {
            msg = 'W chwili obecnej nie jest możliwe złożenie odwołania do tego wniosku. Upewnij się, że odwołanie nie zostało już złożone';
            break;
          }
        default:
          {
            msg = 'W tej chwili nie jest możliwe złożenie odwołania. Skontaktuj się z nami';
            break;
          }
      }
    }
    return msg;
  }
}
