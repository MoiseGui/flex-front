import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {LocalDataSource} from 'ng2-smart-table';
import {Observable} from 'rxjs';
import swal from 'sweetalert2';
import {ProfesseurFacade} from '../../facades/professeur.facade';
import {Professeur} from '../../models/professeur';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import {Modal} from '../../shared/ui/modal.service';
import {CrupdateProfesseurModalComponent} from './crupdate-professeur-modal/crupdate-professeur-modal.component';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.scss']
})
export class ProfesseurComponent implements OnInit {

  public title:String = "";

  professeurs$ : Observable<Professeur[]>;

  editing = {};

  // utilisé pour l'affichage dans le html
  rows = [];

  // sera utilisé pour la recherche
  temp = [];

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  constructor(
    private activatedRoute:ActivatedRoute,
    private professeurFacade: ProfesseurFacade,
    private modal: Modal,
  ) {

    //Get the title of the page from the routing
    this.activatedRoute.data.subscribe(data => {
      this.title = data.title;
    });

  }

  ngOnInit(): void {
    this.professeurs$ = this.professeurFacade.getProfesseurs$();

    // Fill the rows with the rooms
    this.professeurs$.subscribe(profs => {
      this.rows = profs;
      this.temp = profs;
      // console.log("Les données",this.rows);
    });

    // whenever there is an error
    this.professeurFacade.getError$().subscribe(message => {
      // "" means there is no error
      if(message != "") {
        // alert(message);
        this.alertErrorMessage(message);
        // seet no error after handling the error
        this.professeurFacade.setError("");
      }
    });
  }

  // Error Type Alert
  alertErrorMessage(message: string){
    alertFunctions.typeError(message);
  }

  showCrupdateProfessor(professeur?: Professeur){
    this.modal.show(CrupdateProfesseurModalComponent, {professeur}).afterClosed().subscribe(data => {
      if ( ! data) return;
      // this.refreshCompany();
    });
  }


  removeProfesseur(id: number) {
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
        this.professeurFacade.removeProfesseur(id);
      }
    })
  }

  // used to sure Yes for True and No for False
  yesOrNo(value): string{
    return value==true ? "Yes" : "No";
  }

}
