export class ControlDynamic {
    type: string;
    elementType: string;
    controlType: string;
    controlName: string;
    label: string;
    required: boolean;
    order: number;

    constructor(options: {
        type?: string;
        elementType?: string;
        controlType?: string;
        controlName?: string;
        label?: string;
        required?: boolean;
        order?: number;
    } = {}) {
        this.type = options?.type || '';
        this.elementType = options?.elementType || '';
        this.controlType = options?.controlType || '';
        this.controlName = options?.controlName || '';
        this.label = options?.label || '';
        this.required = !!options?.required;
        this.order = options?.order == undefined ? 1 : options?.order;
    }
}
