import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfesseurComponent} from './professeur.component';

const routes: Routes = [{
  path: '',
  component: ProfesseurComponent,
  data: {
    title: "Liste des professeurs"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesseurRoutingModule { }
