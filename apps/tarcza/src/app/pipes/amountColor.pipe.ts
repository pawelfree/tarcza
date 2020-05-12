import { Pipe, PipeTransform } from '@angular/core';

@Pipe( { name: 'amountColor' } )
export class AmountColorPipe implements PipeTransform {
    transform( granted: number, req: number  ): string {
        let amountClass = '';
        switch (true) {
            case (granted / req <= 0.25): {
                amountClass = 'orange';
                break;
            }
            case (granted / req > 0.25 && granted / req < 1): {
                amountClass = 'red';
                break;
            }
            case (granted / req === 1): {
                amountClass = 'green';
                break;
            } default: {
                break;
            }
        }
        return amountClass;
    }
}
