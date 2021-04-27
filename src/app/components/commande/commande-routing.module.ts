import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCommandeComponent } from './list-commande/list-commande.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-commande',
        component: ListCommandeComponent,
        data: {
          title: 'Commande'
        }
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
