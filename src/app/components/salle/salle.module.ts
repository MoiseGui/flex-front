import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SalleRoutingModule } from './salle-routing.module';
import { SalleComponent } from './salle.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [SalleComponent],
  imports: [
    CommonModule,
    SalleRoutingModule,
    Ng2SmartTableModule,
    NgxDatatableModule,
    ]
})
export class SalleModule { }
