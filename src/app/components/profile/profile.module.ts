import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { CrupdateProfileModalComponent } from './crupdate-profile-modal/crupdate-profile-modal.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [ProfileComponent, CrupdateProfileModalComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    Ng2SmartTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    NgxDatatableModule,
    MatButtonModule,
  ],
  entryComponents: [
    CrupdateProfileModalComponent,
  ],
  providers: [
    FormBuilder,
  ]
})
export class ProfileModule { }
