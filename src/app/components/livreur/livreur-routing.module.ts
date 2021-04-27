import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLivreurComponent } from './add-livreur/add-livreur.component';
import { ListLivreurComponent } from './list-livreur/list-livreur.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListLivreurComponent,
        data: {
          title: 'liste des livreurs'
        }
      },
         {
        path: 'add',
        component: AddLivreurComponent,
        data: {
          title: 'Ajout des livreurs'
        }
      },
    ]
  }
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivreurRoutingModule { }
