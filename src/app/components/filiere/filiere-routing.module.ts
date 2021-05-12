import { AddFiliereComponent } from './add-filiere/add-filiere.component';
import { ListFiliereComponent } from './list-filiere/list-filiere.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListFiliereComponent,
        data: {
          title: 'Liste des filières'
        }
      },
      {
        path: 'add',
        component: AddFiliereComponent,
        data: {
          title: 'Ajouter une filière'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiliereRoutingModule { }
