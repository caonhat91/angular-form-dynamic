import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlDynamic, ControlInputText } from './modules/form-dynamic/model';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  reactiveForm!: FormGroup;
  formDynamic!: FormGroup;
  controlDynamicLst!: ControlDynamic[];
  order: number = 0;

  get nativeElement(): HTMLElement {
    return this.host.nativeElement as HTMLElement;
  }

  get type(): FormControl {
    return this.reactiveForm.get('type') as FormControl;
  }

  get controlType(): FormControl {
    return this.reactiveForm.get('controlType') as FormControl;
  }

  get controlName(): FormControl {
    return this.reactiveForm.get('controlName') as FormControl;
  }

  get controlLabel(): FormControl {
    return this.reactiveForm.get('controlLabel') as FormControl;
  }

  get elementType(): FormControl {
    return this.reactiveForm.get('elementType') as FormControl;
  }

  get isRequire(): FormControl {
    return this.reactiveForm.get('isRequire') as FormControl;
  }

  constructor(private host: ElementRef) { }

  ngOnInit(): void {
    this.reactiveForm = this.buildForm;
    this.clear();
  }

  clear(): void {
    // this.reactiveForm.reset();
    this.reactiveForm.patchValue({
      type: 'control',
      controlType: 'inputText',
      controlLabel: '',
      controlName: '',
      elementType: 'element',
      isRequire: false,
    });
    this.order = 0;
    this.controlDynamicLst = [];
    this.formDynamic = new FormGroup({});
  }

  onSubmit(): void {
    if (this.invalid) {
      return;
    }
    const isExisted = this.controlDynamicLst.find(conf => conf.controlName === this.controlName.value);
    if (!isExisted) {
      if (this.controlType.value == 'inputText') {
        const inputTextControl = new ControlInputText(
          {
            type: this.type.value,
            elementType: this.elementType.value,
            controlName: this.controlName.value,
            label: this.controlLabel.value,
            required: this.isRequire.value,
            order: this.order++
          }
        );
        this.controlDynamicLst.push(inputTextControl);
      }
      if (this.controlType.value == 'select') {
        // 
      }
    }

    const group: any = {};
    this.controlDynamicLst.forEach((control: ControlDynamic) => {
      let formElement;
      if (control.type == 'control') {
        formElement = control.required ? new FormControl(null, Validators.required) : new FormControl();
      }
      if (control.type == 'group') {
        formElement = new FormGroup({});
      }
      if (control.type == 'array') {
        formElement = new FormArray([]);
      }

      formElement && this.formDynamic.addControl(control.controlName, formElement);
    });
  }

  private get invalid(): boolean {
    this.reactiveForm.markAllAsTouched();
    if (this.reactiveForm.invalid) {
      const inputInvalid = this.nativeElement.querySelector('input.ng-invalid') as HTMLInputElement;
      inputInvalid?.focus();
      return true;
    }
    return false;
  }

  private get buildForm(): FormGroup {
    return new FormGroup({
      type: new FormControl('', Validators.required),
      controlType: new FormControl('', Validators.required),
      controlLabel: new FormControl('', Validators.required),
      controlName: new FormControl('', Validators.required),
      elementType: new FormControl('', Validators.required),
      isRequire: new FormControl(false),
    });
  }

}
