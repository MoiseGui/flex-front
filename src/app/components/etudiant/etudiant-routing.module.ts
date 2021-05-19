import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EtudiantComponent } from './etudiant.component';

const routes: Routes = [{
  path: '',
  component: EtudiantComponent,
  data: {
    title: "Liste des etudiants"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
