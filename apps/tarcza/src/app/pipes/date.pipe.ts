import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'date' })
export class DateAppPipe implements PipeTransform {
    transform(value: string ): string {
        return value.replace(/([0-9]{4})-([0-9]{2})-([0-9]{2}).*/, '$3-$2-$1');
    }
}
