import { Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'amountColor' } )
export class AmountColorPipe implements PipeTransform {
    transform( granted: string, req: string  ) {
        const newGranted = Number(granted.replace(',', '.'));
        const newReq = Number(req.replace(',', '.'));
        const amountDeff: number = newGranted / newReq;
        let amountClass = '';
        switch (true) {
            case (amountDeff < 0.75):
            {
                amountClass = 'red';
                break;
            }
            case (amountDeff >= 0.75 && amountDeff < 1): {
                amountClass = 'orange';
                break;
            }
            case (amountDeff === 1): {
                amountClass = 'green';
                break;
            } default: {
                break;
            }
        }
        return amountClass;
    }
}
