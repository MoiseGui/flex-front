import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Etudiant} from '../models/etudiant';
import {SpecialEvent} from '../models/event';
import {SepcialEventService} from '../services/sepcial-event.service';
import {NGXToastrService} from '../shared/toastr/toastr.service';
import {SpecialEventState} from '../states/special-event.state';

@Injectable({
  providedIn: 'root'
})
export class SpecialEventFacade {

  constructor(
    private specialEventService: SepcialEventService,
    private specialEventState: SpecialEventState,
    private toastService: NGXToastrService,
  ) {
    this.loadEvents();
  }

  loadEvents() {
    // call the service (api) to fetch data into the state in a reactive way
    this.specialEventService.findAll().subscribe(events => {
      this.specialEventState.setSpecialEvent(events);
    });
  }

  getEvents$(): Observable<SpecialEvent[]> {
    // get the the current state of the data stream reactively
    return this.specialEventState.getSpecialEvents$();
  }

  // @ts-ignore
  addEvent(event: SpecialEvent): Observable<string> {
    let message = new Subject<string>();
    // calling http service to add an event
    this.specialEventService.createEvent(event).subscribe(
      // in success
      response => {
        if (response.id) {
          // add the newly created event to the state
          // pessimist approach
          this.specialEventState.addSpecialEvent(event);
          // put verification message to OK (needed in validations)
          message.next('Ok');
        } else {
          message.next(response.message);
        } // handling unexpected success response from the server
      },
      // in error
      error => {
        this.setLoading(false);
        message.next(this.handleError(error));
      }
    );

  }

  updateEvent(event: SpecialEvent) {
    let message = new Subject<string>();
    // calling http service to update an event
    this.specialEventService.update(event).subscribe(
      // in success
      response => {
        if (response.id) {
          // add the newly created event to the state
          // pessimist approach
          this.specialEventState.updateSpecialEvent(response);
          // put verification message to OK (needed in validations)
          message.next('Ok');
        } else {
          message.next(response.message);
        } // handling unexpected success response from the server
      },
      // in error
      error => {
        this.setLoading(false);
        message.next(this.handleError(error));
      }
    );

  }

  deleteEvent(id: number) {

    this.specialEventService.delete(id).subscribe(
      response => {
        if (response.nom) {
          this.toastService.typeSuccess(`Special Event ${response.nom} deleted successfully`);
          this.specialEventState.deleteSpecialEvent(id);
        } else {
          this.toastService.typeError(response.message);
        }
      }
    );
  }

  handleError(error: any): string {
    let text = '';

    if (typeof error.error.message == 'string') {
      text = error.error.message;
    } else {
      for (let i = 0; i < error.error.message.length; i++) {
        if (i == error.error.message.length - 1) {
          text += `${error.error.message[i]}`;
        } else {
          text += `${error.error.message[i]} | `;
        }
      }
    }
    return text;
  }

  isLoading$() {
    return this.specialEventState.isLoading$();
  }

  setLoading(value: boolean) {
    this.specialEventState.setLoading(value);
  }

  getError$() {
    return this.specialEventState.getError$();
  }

  setError(message) {
    this.specialEventState.setError(message);
  }

}
