import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmploiRoutingModule} from './emploi-routing.module';
// @ts-ignore
import {EmploiComponent} from './emploi/emploi.component';
import {AddEventComponent} from './add-event/add-event.component';

@NgModule({
  declarations: [EmploiComponent, AddEventComponent],
  imports: [
    CommonModule,
    EmploiRoutingModule
  ]
})
export class EmploiModule {
}
