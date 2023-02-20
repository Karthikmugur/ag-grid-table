import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent, IRowNode, RowNode } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})
export class GridTableComponent implements OnInit{

  constructor(private http: HttpClient) {}

  private gridApi!: GridApi;

  empForm: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required, this.duplicateIdValidator.bind(this)]),
    name: new FormControl(null, Validators.required),
    mobile: new FormControl(null, [Validators.required, Validators.pattern("[6-9][0-9]{9}")]),
    sal: new FormControl(null)
  });
  
  duplicateIdValidator(control: FormControl) {
    let id = control.value;
    if(id && this.empdata.includes(id)){
      return{
        duplicateId: {
          id: id
        }
      }
    }
    return null;
  }

  rowData$!: Observable<any[]>;
  colDefs: ColDef[] = [
    { field: 'empId' },
    { field: 'empName' },
    { field: 'empPhone' },
    { field: 'empSalary' }
  ];

  defaultColDef: ColDef = {
    sortable: true, resizable: true
  }

  ngOnInit() {
    this.rowData$ = this.http.get<any[]>('/assets/employee.json');
  }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  empdata: any[] = [];
  onBtForEachNode() {
    this.empdata = [];
    console.log('api.forEachNode() feature of accessing ag-grid table data');
    this.gridApi.forEachNode((node: IRowNode<any>, index?: number) => {
      this.empdata.push(node.data!.empId), console.log(node.data!);
    });
  }

  onSubmission() {
    this.onBtForEachNode()
    console.log(this.empForm.value);
    console.log(this.empdata)
    /*
    var num: (() => IterableIterator<any>)[] = [];
    this.rowData$.forEach(function(empId){
      num.push(empId.values);
    });
    */

    const newItems = [{
      "empId": this.empForm.value.id,
      "empName": this.empForm.value.name,
      "empPhone": this.empForm.value.mobile,
    }];
    var j = 0;
    for (let i = 0; i < this.empdata.length; i++) {
      if (this.empForm.value.id == this.empdata[i]) {
        j = 1;
        break;
      }
    }
    if (j == 1) {
      alert("EmpId is Already Exist");
    }
    else if (j == 0) {
      const res = this.gridApi.applyTransaction({
        add: newItems
      })!;
    }

    this.empForm.reset();
  }

}


