import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatSlideToggleModule} from '@angular/material';
import {NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {SpecialEventRoutingModule} from './special-event-routing.module';
import {AddNewEventComponent} from './addnewevent/addnewevent.component';


@NgModule({
  declarations: [AddNewEventComponent],
  imports: [
    CommonModule,
    SpecialEventRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    NgbTimepickerModule,
    NgbDatepickerModule
  ],
  entryComponents: [
    AddNewEventComponent,
  ],
  providers: [
    FormBuilder,
  ]
})
export class SpecialEventModule {
}
