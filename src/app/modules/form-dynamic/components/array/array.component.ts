import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ControlDynamic } from '../../model';

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

  constructor() { }

  ngOnInit(): void {
    this.confs = [];
  }

  addGroup(): void {
    this.form.push(new FormGroup({}));
  }

  formControl(ri: number): FormControl {
    return this.form.at(ri) as FormControl;
  }

  formGroup(ri: number): FormGroup {
    return this.form.at(ri) as FormGroup;
  }

}
