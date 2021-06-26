import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {RepetitionRoutingModule} from './repetition-routing.module';
import {RepetitionComponent} from './repetition.component';

@NgModule({
  declarations: [RepetitionComponent],
    imports: [
        CommonModule,
        RepetitionRoutingModule,
        NgxDatatableModule
    ]
})
export class RepetitionModule {
}
