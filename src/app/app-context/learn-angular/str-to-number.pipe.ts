import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strToNumber'
})
export class StrToNumberPipe implements PipeTransform {

  transform(value: string): number {
    return Number(value);
  }

}
