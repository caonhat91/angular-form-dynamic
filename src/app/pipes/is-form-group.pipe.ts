import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
    name: 'isFormGroup'
})
export class IsFormGroupPipe implements PipeTransform {

    transform({ value }: any, ...args: unknown[]): boolean {
        return value.constructor.name == FormGroup.name;
    }

}
