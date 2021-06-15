import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatSlideToggleModule} from '@angular/material';
import {SpecialEventRoutingModule} from './special-event-routing.module';

import {AddNewEventComponent} from './addnewevent/addnewevent.component';

@NgModule({
  declarations: [AddNewEventComponent],
  imports: [
    CommonModule,
    SpecialEventRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class SpecialEventModule {
}
