import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { EtudiantComponent } from './etudiant.component';
import { CrupdateEtudiantModalComponent } from './crupdate-etudiant-modal/crupdate-etudiant-modal.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatIconModule, MatDialogModule, MatSlideToggleModule, MatButtonModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CrupdateProfesseurModalComponent } from '../professeur/crupdate-professeur-modal/crupdate-professeur-modal.component';

@NgModule({
  declarations: [EtudiantComponent, CrupdateEtudiantModalComponent],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
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
  providers: [
    FormBuilder,
  ]
})
export class EtudiantModule { }
