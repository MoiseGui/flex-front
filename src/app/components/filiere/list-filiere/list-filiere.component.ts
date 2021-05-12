
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FiliereState } from 'src/app/states/filiere.state';
import { Filiere } from 'src/app/models/filiere';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FiliereFacade } from 'src/app/facades/filiere.facade';
import { Modal } from 'src/app/shared/ui/modal.service';
import swal from 'sweetalert2';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import { AddFiliereComponent } from '../add-filiere/add-filiere.component';


@Component({
  selector: 'app-list-filiere',
  templateUrl: './list-filiere.component.html',
  styleUrls: ['./list-filiere.component.css']
})
export class ListFiliereComponent implements OnInit {
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
  showCrupdateFiliere() {
    this.filiereFacade.addFiliereDialog(
      "Ajouter une Filiere",
      "text",
      this.filiereFacade
    );
  }
  updateFilter(event) {
    console.log(event);
  }
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;

    const old = { ...this.rows[rowIndex] };
    const filiere = { ...this.rows[rowIndex] };

    filiere.nom = event.target.value;
    console.log(filiere.nom);
    this.filiereFacade.updateFiliere(filiere, old);
  }
  removeFiliere(id: number) {
    console.log(id);
    this.confirmDelete(id);
  }
  confirmDelete(id: number) {
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // If confirmed
      if (result.value) {
        this.filiereFacade.removeFiliere(id);
        // swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    });
  }

}
