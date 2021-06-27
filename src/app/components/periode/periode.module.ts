import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatDialogModule, MatSlideToggleModule} from '@angular/material';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {PeriodeComponent} from './/periode.component';
import {PeriodeRoutingModule} from './periode-routing.module';
import { AddperiodeComponent } from './addperiode/addperiode.component';

@NgModule({
  declarations: [PeriodeComponent, AddperiodeComponent],
  imports: [
    CommonModule,
    PeriodeRoutingModule,
    NgxDatatableModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class PeriodeModule {
}
