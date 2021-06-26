import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Observable} from 'rxjs';
import {ProfesseurFacade} from '../../facades/professeur.facade';
import {Professeur} from '../../models/professeur';
import {Modal} from '../../shared/ui/modal.service';

@Component({
  selector: 'app-repetition',
  templateUrl: './repetition.component.html',
  styleUrls: ['./repetition.component.css']
})
export class RepetitionComponent implements OnInit {

  public title: String = '';

  professeurs$: Observable<Professeur[]>;

  editing = {};

  // utilisé pour l'affichage dans le html
  rows = [];

  // sera utilisé pour la recherche
  temp = [];

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
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
      if (message != '') {
        // alert(message);
        // this.alertErrorMessage(message);
        // seet no error after handling the error
        this.professeurFacade.setError('');
      }
    });
  }

  yesOrNo(value: any) {

  }

  updateFilter($event: KeyboardEvent) {

  }

  showCrupdateRep(row: any) {

  }

  removeRepetitionn(value: any) {

  }
}
