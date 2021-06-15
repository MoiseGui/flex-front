import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SpecialEventComponent} from './special-event.component';

const routes: Routes = [
  {
    path: '',
    component: SpecialEventComponent,
    data: {
      title: 'Liste des Special Events'
    },
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialEventRoutingModule {
}

