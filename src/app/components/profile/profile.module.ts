import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent,],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class ProfileModule { }
