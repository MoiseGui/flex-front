import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDispatcherComponent } from './add-dispatcher/add-dispatcher.component';
import { ListDispatcherComponent } from './list-dispatcher/list-dispatcher.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListDispatcherComponent,
        data: {
          title: 'liste des dispatchers'
        }
      },
         {
        path: 'add',
        component: AddDispatcherComponent,
        data: {
          title: 'Ajout des dispatchers'
        }
      },
    ]
  }
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispatcherRoutingModule { }
