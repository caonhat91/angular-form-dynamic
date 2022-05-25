import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ControlBase } from '../control.base';

@Component({
    selector: 'ng-control',
    templateUrl: './control.component.html',
    styleUrls: ['./control.component.scss'],
})
export class ControlComponent extends ControlBase implements OnInit, OnDestroy {
    control!: FormControl;
    controlId!: string;
    private sub = new Subject();

    constructor(private controlContainer: ControlContainer) { super(); }

    ngOnInit(): void {
        this.controlId = Math.random().toString(36).substring(7);
        this.control = this.controlContainer.control?.get(this.controlName) as FormControl;
        this.control.valueChanges.pipe(takeUntil(this.sub)).subscribe(v => {
            this.control.patchValue(JSON.parse(v), { emitEvent: false });
        });
    }

    ngOnDestroy(): void {
        this.sub.next();
        this.sub.complete();
    }

}
