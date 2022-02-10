import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ng-array-table',
  template: `
    <table>
      <caption>
        <button (click)="addRow()">Add Row</button>
      </caption>
      <thead>
        <tr>
          <th>Action</th>
          <th>Code</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <ng-template ngFor [ngForOf]="tables.value" let-record let-ri="index">
          <tr>
            <td>
              <span class="btn-remove" (click)="deleteRow(ri)"></span>
            </td>
            <td>{{record.code}}</td>
            <td>{{record.name}}</td>
          </tr>
        </ng-template>
      </tbody>
    </table>
  `,
  styles: [
    `
      :host {
        table {
          border-collapse: collapse;

          tr th, tr td {
            border: 1px solid #333;
          }
        }
      }
    `
  ]
})
export class ArrayTableComponent implements OnInit {
  @Input() tables!: FormArray;
  rowIndex = 0;

  constructor() { }

  ngOnInit(): void { }

  addRow(): void {
    const rowIdx = ++this.rowIndex;
    this.tables.push(this.rowFormGroup);
    this.tables.at(this.tables.length - 1).patchValue({
      code: 'code ' + rowIdx,
      name: 'name ' + rowIdx
    })
  }

  deleteRow(ri: number): void {
    this.tables.removeAt(ri);
  }

  private get rowFormGroup(): FormGroup {
    return new FormGroup({
      code: new FormControl(),
      name: new FormControl(),
    });
  }

}
