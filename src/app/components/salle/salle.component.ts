import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { SalleFacade } from '../../facades/salle.facade';
import { Salle } from '../../models/salle';
import * as alertFunctions from '../../shared/data/sweet-alerts';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent implements OnInit {

  public title: String = "";

  salles$: Observable<Salle[]>;

  editing = {};

  // utilisé pour l'affichage dans le html
  rows = [];

  // sera utilisé pour la recherche
  temp = [];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private salleFacade: SalleFacade,
  ) {

    //Get the title of the page from the routing
    this.activatedRoute.data.subscribe(data => {
      this.title = data.title;
    });

  }

  ngOnInit(): void {
    this.salles$ = this.salleFacade.getSalles$();

    // Fill the rows with the rooms
    this.salles$.subscribe(salles => {
      this.rows = salles;
      this.temp = salles;
      // console.log("Les données",this.rows);
    });

    // whenever there is an error
    this.salleFacade.getError$().subscribe(message => {
      // "" means there is no error
      if (message != "") {
        // alert(message);
        this.alertErrorMessage(message);
        // seet no error after handling the error
        this.salleFacade.setError("");
      }
    });
  }

  // Error Type Alert
  alertErrorMessage(message: string) {
    alertFunctions.typeError(message);
  }

  addSalle() {
    this.salleFacade.addSallesDialog(
      "Ajouter une salle",
      "text",
      this.salleFacade
    );
  }


  removeSalle(id: number) {
    this.confirmDelete(id);
  }

  // For the search field
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  // Editing room name code
  async updateValue(event, cell, rowIndex) {

    this.editing[rowIndex + '-' + cell] = false;

    const old = { ...this.rows[rowIndex] };
    const salle = { ...this.rows[rowIndex] };

    salle.nom = event.target.value;

    this.salleFacade.updatesalle(salle, old);
    // this.rows[rowIndex][cell] = response.nom;
    // this.rows = [...this.rows];

  }

  // Confirm Button Action
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
        this.salleFacade.removeSalle(id);
        // swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }

}
