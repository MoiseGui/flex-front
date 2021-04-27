import { AddProfileComponent } from './add-profile/add-profile.component';
import { ListProfileComponent } from './list-profile/list-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'list',
        component: ListProfileComponent,
        data: {
          title: 'Liste des profiles d\'événement'
        }
      },
      {
        path: 'add',
        component: AddProfileComponent,
        data:{
          title: 'Ajouter un nouveau profile d\'événement'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
