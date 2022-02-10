import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ControlDynamic } from './model';

@Component({
  selector: 'ng-form-dynamic',
  template: `
    <ng-template ngFor [ngForOf]="configs" let-arr>
      <div [ngSwitch]="arr.type">

        <div class="grid" *ngSwitchCase="'control'">
          <ng-control [config]="arr" [form]="form" (removed)="onRemoveControl($event)"></ng-control>
        </div>

        <div class="grid" *ngSwitchCase="'group'">
          <ng-group [form]="formGroup(arr.controlName)"></ng-group>
        </div>

        <div class="grid" *ngSwitchCase="'array'">
          <ng-array [config]="arr" [baseForm]="form" [form]="formArray(arr.controlName)"></ng-array>
        </div>

      </div>
    </ng-template>
  `,
  styles: [
  ]
})
export class FormDynamicComponent {
  @Input() configs!: ControlDynamic[];
  @Output() configsChange = new EventEmitter<ControlDynamic[]>();
  @Input() form!: FormGroup;

  constructor() { }

  formArray(controlName: string): FormArray {
    return this.form.get(controlName) as FormArray;
  }

  formGroup(controlName: string): FormGroup {
    return this.form.get(controlName) as FormGroup;
  }

  onRemoveControl(controlName: string): void {
    this.form.removeControl(controlName);
    this.configs = this.configs.filter(conf => conf.controlName != controlName);
    this.configsChange.emit(this.configs);
  }

}
