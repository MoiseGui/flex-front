import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatIconModule, MatSlideToggleModule} from '@angular/material';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import { ProfesseurRoutingModule } from './professeur-routing.module';
import { ProfesseurComponent } from './professeur.component';
import { CrupdateProfesseurModalComponent } from './crupdate-professeur-modal/crupdate-professeur-modal.component';

@NgModule({
  declarations: [ProfesseurComponent, CrupdateProfesseurModalComponent],
  imports: [
    CommonModule,
    ProfesseurRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    MatButtonModule
  ],
  entryComponents: [
    CrupdateProfesseurModalComponent,
  ],
  providers:[
    FormBuilder,
  ]
})
export class ProfesseurModule { }
