import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfesseurComponent} from '../professeur/professeur.component';
import {PeriodeComponent} from './periode.component';

const routes: Routes = [{
  path: '',
  component: PeriodeComponent,
  data: {
    title: 'Liste des Periodes'
  }
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodeRoutingModule {
}
