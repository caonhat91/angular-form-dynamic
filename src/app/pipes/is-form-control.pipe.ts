import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
    name: 'isFormControl'
})
export class IsFormControlPipe implements PipeTransform {

    transform({ value }: any, ...args: unknown[]): boolean {
        return value.constructor.name == FormControl.name;
    }

}
