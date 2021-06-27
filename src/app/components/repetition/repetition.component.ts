import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Observable} from 'rxjs';
import swal from 'sweetalert2';
import {ProfesseurFacade} from '../../facades/professeur.facade';
import {RepetitionFacade} from '../../facades/repetition.facade';
import {Professeur} from '../../models/professeur';
import {Repetition} from '../../models/repetition';
import {Modal} from '../../shared/ui/modal.service';
import {CrupdateProfesseurModalComponent} from '../professeur/crupdate-professeur-modal/crupdate-professeur-modal.component';
import {AddNewRepetitionComponent} from './add-new-repetition/add-new-repetition.component';

@Component({
  selector: 'app-repetition',
  templateUrl: './repetition.component.html',
  styleUrls: ['./repetition.component.css']
})
export class RepetitionComponent implements OnInit {

  public title: String = '';

  repetition$: Observable<Repetition[]>;

  editing = {};

  // utilisé pour l'affichage dans le html
  rows = [];

  // sera utilisé pour la recherche
  temp = [];

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private repetitionFacade: RepetitionFacade,
    private modal: Modal,
  ) {

    //Get the title of the page from the routing
    this.activatedRoute.data.subscribe(data => {
      this.title = data.title;
    });

  }

  ngOnInit(): void {
    this.repetition$ = this.repetitionFacade.getRepetitions();

    // Fill the rows with the rooms
    this.repetition$.subscribe((repet) => {
      this.rows = repet;
      this.temp = repet;
      // console.log("Les données",this.rows);
    });

    // whenever there is an error
    this.repetitionFacade.getError$().subscribe(message => {
      // "" means there is no error
      if (message != '') {
        // alert(message);
        // this.alertErrorMessage(message);
        // seet no error after handling the error
        this.repetitionFacade.setError('');
      }
    });
  }

  yesOrNo(value: any) {

  }

  updateFilter($event: KeyboardEvent) {

  }

  showCrupdateRep(repetition?: Repetition) {
    this.modal.show(AddNewRepetitionComponent, {repetition}).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      // this.refreshCompany();
    });
  }

  removeRepetitionn(id: number) {
    console.log(id);
    this.confirmDelete(id);
  }

  confirmDelete(id: number) {
    swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // If confirmed
      if (result.value) {
        this.repetitionFacade.deleteRepetition(id);
      }
    });
  }
}
