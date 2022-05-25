import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ControlBase } from '../control.base';

@Component({
    selector: 'ng-array',
    templateUrl: './array.component.html',
    styleUrls: ['./array.component.scss']
})
export class ArrayComponent extends ControlBase implements OnInit, OnDestroy {
    parentForm!: FormGroup;
    control!: FormArray;
    controlId!: string;
    private sub = new Subject();

    constructor(private controlContainer: ControlContainer) { super(); }

    ngOnInit(): void {
        this.controlId = Math.random().toString(36).substring(7);
        this.parentForm = this.controlContainer.control as FormGroup;
        this.control = this.parentForm?.get(this.controlName) as FormArray;
    }

    ngOnDestroy(): void {
        this.sub.next();
        this.sub.complete();
    }

}
