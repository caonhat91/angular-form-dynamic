import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'ng-form-dynamic',
    templateUrl: './form-dynamic.component.html',
    styleUrls: ['./form-dynamic.component.scss']
})
export class FormDynamicComponent implements OnInit {
    @Input() form!: FormGroup;

    constructor() { }

    ngOnInit(): void {
    }

}
