import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlDynamic } from '../model';

@Component({
  selector: 'ng-form-dynamic',
  templateUrl: './form-dynamic.component.html',
  styles: [
  ]
})
export class FormDynamicComponent {
  @Input() configs!: ControlDynamic[];
  @Input() form!: FormGroup;

  constructor() { }

}
