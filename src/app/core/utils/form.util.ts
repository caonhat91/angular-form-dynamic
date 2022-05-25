import { FormArray, FormControl, FormGroup } from "@angular/forms";

export class Form {
    static buildForm(data: any): FormGroup {
        const group: any = {};

        if (!data) {
            return new FormGroup(group);
        };

        const buildGroup = (obj: any, control: any) => {
            Object.keys(obj).forEach(key => {
                let value = obj[key];
                if (typeof value == 'object' && value != null) {
                    if (control.constructor.name == FormArray.name) {
                        const array = control as FormArray;
                        array.push(new FormGroup({}));
                        buildGroup(value, array.at(+key));
                    } else if (control.constructor.name == FormGroup.name) {
                        const group = control as FormGroup;
                        group.addControl(key, Array.isArray(value) ? new FormArray([]) : new FormGroup({}));
                        buildGroup(value, group.get(key));
                    } else if (Array.isArray(value)) {
                        control[key] = new FormArray([]);
                        buildGroup(value, control[key]);
                    } else {
                        control[key] = new FormGroup({});
                        buildGroup(value, control[key]);
                    }
                } else {
                    if (control.constructor.name == FormArray.name) {
                        (control as FormArray).push(new FormControl());
                    } else if (control.constructor.name == FormGroup.name) {
                        (control as FormGroup).addControl(key, new FormControl(value));
                    } else {
                        control[key] = new FormControl(value);
                    }
                }
            });
        };

        buildGroup(data, group);
        return new FormGroup(group);
    }
}
