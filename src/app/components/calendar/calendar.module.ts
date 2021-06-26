import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule, MatSlideToggleModule} from '@angular/material';

import {NgbModalModule, NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CalendarRoutingModule} from './calendar-routing.module';

import {CalendarsComponent} from './calendar.component';
import {DateTimePickerComponent} from './date-time-picker.component';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        CalendarRoutingModule,
        NgbModalModule.forRoot(),
        NgbDatepickerModule.forRoot(),
        NgbTimepickerModule.forRoot(),
        FormsModule,
        MatSlideToggleModule,
        MatCheckboxModule
    ],
  declarations: [
    CalendarsComponent,
    DateTimePickerComponent
  ]
})
export class CalendarsModule {
}
