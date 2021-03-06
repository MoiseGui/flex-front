import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CalendarsComponent} from './calendar.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarsComponent,
    data: {
      title: 'Calendar'
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {
}

export const routedComponents = [CalendarsComponent];
