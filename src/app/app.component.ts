import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientCustom } from './core/di-custom/http-client-custom';
import { Form } from './core/utils/form.util';

@Component({
    selector: 'ng-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: []
})
export class AppComponent implements OnInit {
    reactiveForm!: FormGroup;

    constructor(private http: HttpClientCustom) { }

    ngOnInit(): void {
        this.reactiveForm = this.buildForm;
    }

    async generalData() {
        // const data = await this.http.mock('form-dynamic').toPromise();
        const data = await this.http.mock('data').toPromise();
        this.objectData.patchValue(JSON.stringify(data));
        this.formatJson();
    }

    formatJson(): void {
        this.objectData.patchValue(JSON.stringify(JSON.parse(this.objectData.value ?? '{}'), undefined, 4));
    }

    onSubmit(): void {
        this.reactiveForm.markAllAsTouched();
        if (this.reactiveForm.invalid) {
            return;
        }
        const data = JSON.parse(this.objectData.value);
        this.reactiveForm.removeControl('form');
        this.reactiveForm.addControl('form', Form.buildForm(data));
    }

    onSubmitForm(controlName: string, controlValue: string): void {
        this.form.get(controlName)?.patchValue(JSON.parse(controlValue));
        console.log(controlName, this.form.get(controlName)?.value);
        this.form.controls
    }

    get objectData(): FormControl {
        return this.reactiveForm.get('objectData') as FormControl;
    }

    get form(): FormGroup {
        return this.reactiveForm.get('form') as FormGroup;
    }

    private get buildForm(): FormGroup {
        return new FormGroup({
            objectData: new FormControl(null, Validators.required),
        });
    }

}
