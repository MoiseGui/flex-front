import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Observable} from 'rxjs';
import {PerdiodFacade} from '../../facades/perdiod.facade';
import {ProfesseurFacade} from '../../facades/professeur.facade';
import {Etudiant} from '../../models/etudiant';
import {Periode} from '../../models/periode';
import {Modal} from '../../shared/ui/modal.service';
import {AddFiliereComponent} from '../filiere/add-filiere/add-filiere.component';
import {AddperiodeComponent} from './addperiode/addperiode.component';

@Component({
  selector: 'app-periode',
  templateUrl: './periode.component.html',
  styleUrls: ['./periode.component.css']
})
export class PeriodeComponent implements OnInit {

  public title: String = '';
  periode$: Observable<Periode[]>;

  editing = {};

  // utilisé pour l'affichage dans le html
  rows = [];

  // sera utilisé pour la recherche
  temp = [];

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private periodFacade: PerdiodFacade,
    private modal: Modal,
  ) {

    //Get the title of the page from the routing
    this.activatedRoute.data.subscribe(data => {
      this.title = data.title;
    });

  }

  ngOnInit() {
    this.periode$ = this.periodFacade.gettPeriods$();
    this.periode$.subscribe((periodes) => {
      this.rows = periodes;
    });
  }

  showCrupdatePeriode(perdiod?: Periode) {
    this.modal.show(AddperiodeComponent, {perdiod}).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      // this.refreshCompany();
    });
  }

  updateFilter($event: KeyboardEvent) {

  }

  yesOrNo(value: any) {

  }

  removePeriod(id: any) {
    console.log(id);
  }
}
