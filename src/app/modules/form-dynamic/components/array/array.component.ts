import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlDynamic, ControlInputText } from '../../model';

@Component({
  selector: 'ng-array',
  template: `
    <div class="grid" [formGroup]="baseForm" [ngSwitch]="config.elementType">

      <div class="grid" *ngSwitchCase="'table'">
        <ng-array-table [tables]="form"></ng-array-table>
      </div>

      <div class="grid" *ngSwitchDefault>
        <button (click)="addGroup()">Add Group</button>
        <div *ngFor="let conf of confs; index as ri" [formArrayName]="config.controlName">
          <ng-group [form]="formGroup(ri)"></ng-group>
        </div>
      </div>

    </div>
  `,
  styles: [
  ]
})
export class ArrayComponent implements OnInit {
  @Input() config!: ControlDynamic;
  @Input() baseForm!: FormGroup;
  @Input() form!: FormArray;
  confs!: ControlDynamic[];
  order = 0;

  constructor() { }

  ngOnInit(): void {
    this.confs = [];
  }

  addGroup(): void {
    const order = ++this.order;
    const controlName = 'code' + order;
    const inputTextControl = new ControlInputText(
      {
        controlName: controlName,
        label: 'Code',
        order: order
      }
    );
    this.confs.push(inputTextControl);

    const group: any = {};
    this.confs.forEach((control: ControlDynamic) => {
      group[control.controlName] = control.required ? new FormControl(null, Validators.required) : new FormControl();
    });
    const formGroup = new FormGroup(group);
    this.form.push(formGroup);
  }

  formControl(ri: number): FormControl {
    return this.form.at(ri) as FormControl;
  }

  formGroup(ri: number): FormGroup {
    return this.form.at(ri) as FormGroup;
  }

}
