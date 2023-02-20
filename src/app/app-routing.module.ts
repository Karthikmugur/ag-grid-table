import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridTableComponent } from './grid-table/grid-table.component';
import { ModalComponent } from './modal/modal.component';
import { PracticeComponent } from './practice/practice.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: '', component: ModalComponent},
  {path: 'grid', component: GridTableComponent},
  {path: 'table', component: TableComponent},
  {path: 'practice', component: PracticeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
