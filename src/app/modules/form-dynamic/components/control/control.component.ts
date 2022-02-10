import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlDynamic } from '../../model';

@Component({
  selector: 'ng-control',
  template: `
    <div [formGroup]="form">
      <div class="grid" [ngSwitch]="config.controlType">
          
        <div class="control-group" *ngSwitchCase="'inputText'">
          <label [attr.for]="config.controlName">{{config.label}}</label>
          <input type="text" [id]="config.controlName" [formControlName]="config.controlName"
            [attr.required]="config.required ? true : null">
          <span class="btn-remove" (click)="removed.emit(config.controlName)"></span>
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

}
