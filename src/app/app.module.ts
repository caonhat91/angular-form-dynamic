import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormDynamicModule } from './modules/form-dynamic/form-dynamic.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormDynamicModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
