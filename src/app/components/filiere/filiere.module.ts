import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiliereRoutingModule } from './filiere-routing.module';
import { FiliereComponent } from './filiere.component';
import { ListFiliereComponent } from './list-filiere/list-filiere.component';
import { AddFiliereComponent } from './add-filiere/add-filiere.component';

@NgModule({
  declarations: [FiliereComponent, ListFiliereComponent, AddFiliereComponent],
  imports: [
    CommonModule,
    FiliereRoutingModule
  ]
})
export class FiliereModule { }
