import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZero'
})
export class AddZeroPipe implements PipeTransform {

  // change value to 'clock value', like: 8 -> '08',  12 -> '12'
  transform(value: number, ...args: unknown[]): unknown {
    if (value < 10) {
      return '0' + value;
    }

    return value.toString();
  }

}
