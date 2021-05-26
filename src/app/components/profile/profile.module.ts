import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {CrupdateProfileModalComponent} from './crupdate-profile-modal/crupdate-profile-modal.component';
import {MatButtonModule, MatDialogModule, MatIconModule, MatSlideToggleModule} from '@angular/material';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ProfileDetailComponent} from './profile-detail/profile-detail.component';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [ProfileComponent, CrupdateProfileModalComponent, ProfileDetailComponent],
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
    MatListModule,
    MatExpansionModule
  ],
  entryComponents: [
    CrupdateProfileModalComponent,
    ProfileDetailComponent
  ],
  providers: [
    FormBuilder,
  ]
})
export class ProfileModule {
}
