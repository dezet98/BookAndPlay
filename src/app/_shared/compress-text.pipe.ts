import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compressText'
})
export class CompressTextPipe implements PipeTransform {

  transform(value: string, length: number): string {
    if (value.length > length) {
      return value.slice(0, length) + '...';
    }

    return value;
  }

}
