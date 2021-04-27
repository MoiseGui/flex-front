import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ListProfileComponent } from './list-profile/list-profile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';

@NgModule({
  declarations: [ProfileComponent, ListProfileComponent, AddProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class ProfileModule { }
