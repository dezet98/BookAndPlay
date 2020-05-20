import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysOfWeek'
})
export class DaysOfWeekPipe implements PipeTransform {

  transform(value: Array<boolean>, ...args: unknown[]): unknown {
    const daysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

    return daysNames.filter((day: string, index: number) => value[index]);
  }

}
