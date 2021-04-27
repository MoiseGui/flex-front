import { AddEventComponent } from './add-event/add-event.component';
import { EmploiComponent } from './emploi.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: EmploiComponent,
        data: {
          title: 'Emploi des salles'
        }
      },
      {
        path: 'add',
        component: AddEventComponent,
        data: {
          title: 'Ajouter un événement'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmploiRoutingModule { }
