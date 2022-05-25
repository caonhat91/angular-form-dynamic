import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
    name: 'isFormArray'
})
export class IsFormArrayPipe implements PipeTransform {

    transform({ value }: any, ...args: unknown[]): boolean {
        return value.constructor.name == FormArray.name;
    }

}
