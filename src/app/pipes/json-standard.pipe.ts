import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'jsonStandard'
})
export class JsonStandardPipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): string {
        if (!value) {
            return '';
        }
        return JSON.parse(value);
    }

}
