import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ProfesseurFacade} from '../../facades/professeur.facade';
import {SpecialEventFacade} from '../../facades/special-event.facade';
import {SpecialEvent} from '../../models/event';
import {Professeur} from '../../models/professeur';
import {Modal} from '../../shared/ui/modal.service';
import {CrupdateProfesseurModalComponent} from '../professeur/crupdate-professeur-modal/crupdate-professeur-modal.component';
import {AddNewEventComponent} from './addnewevent/addnewevent.component';

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.css']
})
export class SpecialEventComponent implements OnInit {

  public title: String = '';

  event_specials$: Observable<SpecialEvent[]>;

  editing = {};

  // utilisé pour l'affichage dans le html
  rows = [];

  // sera utilisé pour la recherche
  temp = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private specialEventFacade: SpecialEventFacade,
    private modal: Modal,
  ) {

    //Get the title of the page from the routing
    this.activatedRoute.data.subscribe(data => {
      this.title = data.title;
    });

  }

  ngOnInit() {
    this.event_specials$ = this.specialEventFacade.getEvents$();

    // Fill the rows with the rooms
    this.event_specials$.subscribe(profs => {
      this.rows = profs;
      this.temp = profs;
      // console.log("Les données",this.rows);
    });

    // whenever there is an error
    this.specialEventFacade.getError$().subscribe(message => {
      // "" means there is no error
      if (message != '') {
        // alert(message);
        // this.alertErrorMessage(message);
        // seet no error after handling the error
        this.specialEventFacade.setError('');
      }
    });
  }

  updateFilter($event: KeyboardEvent) {

  }

  showEventDetails(row: any) {

  }

  yesOrNo(value): string {
    return value == true ? 'Yes' : 'No';
  }

  addNewEventSpecial() {
    this.modal.show(AddNewEventComponent, {}).afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      // this.refreshCompany();
    });
  }
}
