import { Component } from '@angular/core';
import { getData } from '../data';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ColDef, GridApi, GridReadyEvent, RowNodeTransaction } from 'ag-grid-community';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  empForm: FormGroup = new FormGroup({
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required)
  });

  constructor() {
  }
  private gridApi!: GridApi;

  rowData: any[] | null = getData();
  public rowSelection: 'single' | 'multiple' = 'multiple';

  getRowData(){
    const rowData: any[] = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.table(rowData);
  }

  colDefs: ColDef[] = [
    { field: 'empId' },
    { field: 'empName' },
    { field: 'empSalary' },
    { field: 'empPhone' }
  ];

  defaultColDef: ColDef = {
    sortable: true, resizable: true
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  ngOnInit() {
  }

  clearData() {
    const rowData: any[] = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    const res = this.gridApi.applyTransaction({
      remove: rowData,
    })!;
    printResult(res);
  }

  
  onSubmission() {
    console.log(this.empForm.value);
    this.empForm.reset();
    this.addItems();
  }

  addItems() {
    const newItems = [{
      empId: this.empForm.value.empId,
      empName: this.empForm.value.empName,
      empMobile: this.empForm.value.empMobile,
    }];
    const res = this.gridApi.applyTransaction({
      add: newItems,
    })!;
    printResult(res);
  }

}

function printResult(res: RowNodeTransaction) {
  console.log('---------------------------------------');
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log('Removed Row Node', rowNode);
    });
  }
}
