import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {RepetitionRoutingModule} from './repetition-routing.module';
import {RepetitionComponent} from './repetition.component';
import { AddNewRepetitionComponent } from './add-new-repetition/add-new-repetition.component';

@NgModule({
  declarations: [RepetitionComponent, AddNewRepetitionComponent],
  imports: [
    CommonModule,
    RepetitionRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class RepetitionModule {
}
