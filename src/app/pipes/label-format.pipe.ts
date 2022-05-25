import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelFormat'
})
export class LabelFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
