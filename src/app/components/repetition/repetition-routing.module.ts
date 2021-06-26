import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepetitionComponent} from './repetition.component';

const routes: Routes = [{
  path: '',
  component: RepetitionComponent,
  data: {
    title: 'Repetitions'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepetitionRoutingModule {
}
