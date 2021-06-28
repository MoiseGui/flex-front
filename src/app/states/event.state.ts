import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Event} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventState {

  private events$ = new BehaviorSubject<Event[]>(null)
  private loading$ = new BehaviorSubject<boolean>(false)
  private error$ = new BehaviorSubject<string>("")

  constructor() {}

  getEvents$() {
    return this.events$.asObservable()
  }

  setEvents$(events: Event[]) {
    return this.events$.next(events)
  }

  addEvent(event: Event) {

    // get the current state
    const events = this.events$.getValue()

    if (event == null) {
      // if the event is null roll back the state
      this.events$.next([...events])
    } else {
      // if not append the event to the state
      this.events$.next([...events, event])
    }
  }

  updateEvent(event: Event) {

    // get the current state
    const events = this.events$.getValue()

    // find the concerned element and update it
    for(let i = 0; i < events.length ; i++)
      if (events[i].id == event.id)
        events[i] = event

    // update the state stream
    this.events$.next([...events])
  }

  deleteEvent(id: number) {
    // get the current state
    const events = this.events$.getValue()
    // filter the state !
    events = events.filter(e => e.id != id)
    // update the state stream
    this.events$.next([...events])
  }

  isLoading$() {
    return this.loading$.asObservable();
  }

  setLoading(value: boolean) {
    this.loading$.next(value);
  }

  getError$() {
    return this.error$;
  }

  setError(message) {
    this.error$.next(message)
  }

}
