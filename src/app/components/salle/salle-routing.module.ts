import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SalleComponent} from './salle.component';

const routes: Routes = [
  {
    path: '',
    component: SalleComponent,
    data: {
      title: 'Liste des salles'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalleRoutingModule { }
