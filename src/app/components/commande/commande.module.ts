import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommandeRoutingModule } from './commande-routing.module';
import { ListCommandeComponent } from './list-commande/list-commande.component';

@NgModule({
  declarations: [ListCommandeComponent],
  imports: [
    CommonModule,
    CommandeRoutingModule,
  ],
})
export class CommandeModule { }
