import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ControlBase } from '../control.base';

@Component({
    selector: 'ng-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent extends ControlBase implements OnInit, OnDestroy {
    control!: FormGroup;
    controlId!: string;
    private sub = new Subject();

    constructor(private controlContainer: ControlContainer) { super(); }

    ngOnInit(): void {
        this.controlId = Math.random().toString(36).substring(7);
        this.control = this.controlContainer.control as FormGroup;
    }

    ngOnDestroy(): void {
        this.sub.next();
        this.sub.complete();
    }

}
