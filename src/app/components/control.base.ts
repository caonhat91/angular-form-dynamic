import { Directive, Input } from "@angular/core";

@Directive()
export class ControlBase {
    @Input() controlName!: string;
}