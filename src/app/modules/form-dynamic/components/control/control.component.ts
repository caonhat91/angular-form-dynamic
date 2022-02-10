import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ControlDynamic } from '../../model';

@Component({
  selector: 'ng-control',
  template: `
    <div class="ng-control" [formGroup]="form">
      <div class="grid" [ngSwitch]="config.controlType">
          
        <div class="control-group" *ngSwitchCase="'inputText'">
          <label [attr.for]="config.controlName">{{config.label}}</label>
          <input type="text" [id]="config.controlName" [formControlName]="config.controlName"
            [attr.required]="config.required ? true : null">
          <span class="btn-remove" (click)="removed.emit(config.controlName)"></span>

          <div class="alert" *ngIf="formControl(config.controlName).invalid && (formControl(config.controlName).dirty || formControl(config.controlName).touched)">
            <small *ngIf="formControl(config.controlName).errors?.['required']">
                Type is required.
            </small>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [
  ]
})
export class ControlComponent implements OnInit {
  @Input() config!: ControlDynamic;
  @Input() form!: FormGroup;
  @Output() removed = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  formControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl;
  }

}
