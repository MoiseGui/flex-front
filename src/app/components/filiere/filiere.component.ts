import { value } from './../../shared/data/dropdowns';
import { Modal } from './../../shared/ui/modal.service';
import { FiliereFacade } from './../../facades/filiere.facade';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { FiliereState } from 'src/app/states/filiere.state';
import { Filiere } from 'src/app/models/filiere';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AddFiliereComponent } from './add-filiere/add-filiere.component';

@Component({
  selector: 'app-filiere',
  templateUrl: './filiere.component.html',
  styleUrls: ['./filiere.component.css']
})
export class FiliereComponent implements OnInit {
  public title: String = "";

  filieres$: Observable<Filiere[]>;

  editing = {};

  // utilisé pour l'affichage dans le html
  rows = [];

  // sera utilisé pour la recherche
  temp = [];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private filiereFacade: FiliereFacade,
    private modal: Modal,
  ) {
    this.activatedRoute.data.subscribe(data => {
      this.title = data.title;
    });
  }

  ngOnInit() {
    this.filieres$ = this.filiereFacade.getfilieres$();

    // Fill the rows with the rooms
    this.filieres$.subscribe(filieres => {
      this.rows = filieres;
      this.temp = filieres;
      // console.log("Les données",this.rows);
    });

    // whenever there is an error
    this.filiereFacade.getError$().subscribe(message => {
      // "" means there is no error
      if (message != "") {
        // alert(message);
        this.alertErrorMessage(message);
        // seet no error after handling the error
        this.filiereFacade.setError("");
      }
    });
  }
  alertErrorMessage(message: string) {
    alertFunctions.typeError(message);
  }
  showCrupdateFiliere(filiere?: Filiere) {
    this.modal.show(AddFiliereComponent, { filiere }).afterClosed().subscribe(data => {
      if (!data) return;
      // this.refreshCompany();
    });
  }
  updateFilter(event) {
    console.log(event);
  }
  updateValue(event, cell, rowIndex) { }
  removeFiliere(value: string) {

  }
}
