import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlDynamic, ControlInputText } from '../../model';

@Component({
  selector: 'ng-group',
  template: `
    <button (click)="addControl()">Add Control</button>
    <ng-template ngFor [ngForOf]="confs" let-conf>
      <ng-control [config]="conf" [form]="form" (removed)="onRemoveControl($event)"></ng-control>
    </ng-template>
  `,
  styles: [
  ]
})
export class GroupComponent implements OnInit {
  @Input() form!: FormGroup;
  confs!: ControlDynamic[];
  order: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.confs = [];
  }

  addControl(): void {
    const order = ++this.order;
    const controlName = 'code' + order;
    const control = new ControlInputText(
      {
        controlName: controlName,
        label: 'Code' + order,
        required: true,
        order: order
      }
    );
    this.confs.push(control);

    const formControl = control.required ? new FormControl(null, Validators.required) : new FormControl();

    this.form.addControl(controlName, formControl);
  }

  onRemoveControl(controlName: string): void {
    this.form.removeControl(controlName);
    this.confs = this.confs.filter(conf => conf.controlName != controlName);
  }

}
