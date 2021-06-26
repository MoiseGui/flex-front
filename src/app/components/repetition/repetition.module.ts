import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RepetitionRoutingModule} from './repetition-routing.module';
import {RepetitionComponent} from './repetition.component';

@NgModule({
  declarations: [RepetitionComponent],
  imports: [
    CommonModule,
    RepetitionRoutingModule
  ]
})
export class RepetitionModule {
}
