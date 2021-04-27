import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivreurRoutingModule } from './livreur-routing.module';
import { ListLivreurComponent } from './list-livreur/list-livreur.component';
import { AddLivreurComponent } from './add-livreur/add-livreur.component';

@NgModule({
  declarations: [ListLivreurComponent, AddLivreurComponent],
  imports: [
    CommonModule,
    LivreurRoutingModule
  ]
})
export class LivreurModule { }
