import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TsakListComponent } from './tsak-list/tsak-list.component';
import { TsakFormComponent } from './tsak-form/tsak-form.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'tasklist'},
  { path: "tasklist", component: TsakListComponent },
  { path: "taskform", component: TsakFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
