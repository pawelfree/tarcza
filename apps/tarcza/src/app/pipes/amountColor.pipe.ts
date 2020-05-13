import { Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'amountColor' } )
export class AmountColorPipe implements PipeTransform {
    transform( granted: string, req: string  ) {
        const newGranted = Number(granted.replace(',', '.'));
        const newReq = Number(req.replace(',', '.'));
        console.log(newReq + ' :: ' + newGranted);
        let amountClass = '';
        switch (true) {
            case (newGranted / newReq > 0.25 && newGranted / newReq < 1):
            case (newGranted / newReq === 0):
            {
                amountClass = 'red';
                break;
            }
            case (newGranted / newReq <= 0.25): {
                amountClass = 'orange';
                break;
            }
            case (newGranted / newReq === 1): {
                amountClass = 'green';
                break;
            } default: {
                break;
            }
        }
        return amountClass;
    }
}
