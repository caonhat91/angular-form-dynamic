import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { ArrayComponent } from './components/array/array.component';
import { ControlComponent } from './components/control/control.component';
import { GroupComponent } from './components/group/group.component';
import { HTTP_CLIENT_CUSTOM } from './core/di-custom/http-client-custom';
import { HTTP_XSRF_EXTRACTOR } from './core/di-custom/http-xsrf-extractor';
import { HTTP_CLIENT_INTERCEPTOR } from './core/interceptor/http-client-interceptor.interceptor';
import { IsFormArrayPipe } from './pipes/is-form-array.pipe';
import { IsFormControlPipe } from './pipes/is-form-control.pipe';
import { IsFormGroupPipe } from './pipes/is-form-group.pipe';
import { JsonStandardPipe } from './pipes/json-standard.pipe';
import { LabelFormatPipe } from './pipes/label-format.pipe';
import { FormDynamicComponent } from './components/form-dynamic/form-dynamic.component';

export const XSRF_COOKIE_NAME = new InjectionToken<string>('xsrf_cookie_name');
export const XSRF_HEADER_NAME = new InjectionToken<string>('xsrf_header_name');
const XSRF_COOKIE_VALUE = environment.xsrf_cookie;
const XSRF_HEADER_VALUE = environment.xsrf_header;

@NgModule({
    declarations: [AppComponent, JsonStandardPipe, IsFormControlPipe, IsFormGroupPipe, IsFormArrayPipe, LabelFormatPipe, ControlComponent, GroupComponent, ArrayComponent, FormDynamicComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: XSRF_COOKIE_VALUE,
            headerName: XSRF_HEADER_VALUE
        }),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        HTTP_CLIENT_CUSTOM,
        HTTP_XSRF_EXTRACTOR,
        HTTP_CLIENT_INTERCEPTOR,
        { provide: XSRF_COOKIE_NAME, useValue: XSRF_COOKIE_VALUE },
        { provide: XSRF_HEADER_NAME, useValue: XSRF_HEADER_VALUE },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
