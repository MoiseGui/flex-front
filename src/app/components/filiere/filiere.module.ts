import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiliereRoutingModule } from './filiere-routing.module';
import { FiliereComponent } from './filiere.component';
import { ListFiliereComponent } from './list-filiere/list-filiere.component';
import { AddFiliereComponent } from './add-filiere/add-filiere.component';
import { MatDialogModule, MatIconModule, MatSlideToggleModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FiliereComponent, ListFiliereComponent, AddFiliereComponent],
  imports: [
    CommonModule,
    FiliereRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    MatButtonModule
  ]
})
export class FiliereModule { }
