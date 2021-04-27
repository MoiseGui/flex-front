import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatcherRoutingModule } from './dispatcher-routing.module';
import { ListDispatcherComponent } from './list-dispatcher/list-dispatcher.component';
import { AddDispatcherComponent } from './add-dispatcher/add-dispatcher.component';

@NgModule({
  declarations: [ListDispatcherComponent, AddDispatcherComponent],
  imports: [
    CommonModule,
    DispatcherRoutingModule
  ]
})
export class DispatcherModule { }
