import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDynamicComponent } from './form-dynamic.component';
import { ControlComponent } from './components/control/control.component';
import { GroupComponent } from './components/group/group.component';
import { ArrayComponent } from './components/array/array.component';
import { ArrayTableComponent } from './components/array-table/array-table.component';

@NgModule({
  declarations: [FormDynamicComponent, ControlComponent, GroupComponent, ArrayComponent, ArrayTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [FormDynamicComponent]
})
export class FormDynamicModule { }

export { ControlDynamic, ControlInputText } from './model';
