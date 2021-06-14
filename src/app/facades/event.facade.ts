import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Event} from '../models/event';
import {EventService} from '../services/event.service';
import {NGXToastrService} from '../shared/toastr/toastr.service';
import {EventState} from '../states/event.state';

@Injectable({
  providedIn: 'root'
})
export class EventFacade {

  constructor(
    private eventService: EventService,
    private eventState: EventState,
    private toastService: NGXToastrService,
  ) {
    this.loadEvents()
  }

  loadEvents() {
    // call the service (api) to fetch data into the state in a reactive way
    this.eventService.findAll().subscribe(events => {
      this.eventState.setEvents$(events)
    })
  }

  getEvents$(): Observable<Event[]> {
    // get the the current state of the data stream reactively
    return this.eventState.getEvents$()
  }

  addEvent(event: Event) {
    let message = new Subject<string>()

    // calling http service to add an event
    this.eventService.createEvent(event).subscribe(
      // in success
      response => {
        if (response.id) {
          // add the newly created event to the state
          // pessimist approach
          this.eventState.addEvent(event)
          // put verification message to OK (needed in validations)
          message.next("Ok")
        } else
          message.next(response.message) // handling unexpected success response from the server
      },
      // in error
      error => {
      this.setLoading(false);
      message.next(this.handleError(error));
      }
    )

  }

  updateEvent(event: Event) {
    let message = new Subject<string>()
    // calling http service to update an event
    this.eventService.updateEvent(event).subscribe(
      // in success
      response => {
        if (response.id) {
          // add the newly created event to the state
          // pessimist approach
          this.eventState.updateEvent(response)
          // put verification message to OK (needed in validations)
          message.next("Ok")
        } else
          message.next(response.message) // handling unexpected success response from the server
      },
      // in error
      error => {
        this.setLoading(false);
        message.next(this.handleError(error))
      }
    )

  }

  deleteEvent(id: number) {

    this.eventService.delete(id).subscribe(
      response => {
        if (response.nom) {
          this.toastService.typeSuccess(`Event ${response.nom} deleted successfully`)
          this.eventState.deleteEvent(id)
        } else {
          this.toastService.typeError(response.message)
        }
      }
    )
  }

  handleError(error: any): string {
    let text = "";

    if (typeof error.error.message == 'string') {
      text = error.error.message;
    }
    else {
      for (let i = 0; i < error.error.message.length; i++) {
        if (i == error.error.message.length - 1) text += `${error.error.message[i]}`
        else text += `${error.error.message[i]} | `
      }
    }
    return text;
  }

  isLoading$() {
    return this.eventState.isLoading$();
  }

  setLoading(value: boolean) {
    this.eventState.setLoading(value);
  }

  getError$() {
    return this.eventState.getError$();
  }

  setError(message) {
    this.eventState.setError(message);
  }

}
