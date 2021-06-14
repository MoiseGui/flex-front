import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SpecialEvent} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class SpecialEventState {

  private specialEvents$ = new BehaviorSubject<SpecialEvent[]>(null)
  private loading$ = new BehaviorSubject<boolean>(null)
  private error$ = new BehaviorSubject<string>("")

  constructor() {}

  getSpecialEvents$() {
    return this.specialEvents$.asObservable()
  }

  setSpecialEvent(events: SpecialEvent[]) {
    return this.specialEvents$.next(events)
  }

  addSpecialEvent(event: SpecialEvent) {
    const events = this.specialEvents$.getValue()

    if(event == null) this.specialEvents$.next([...events])
    else this.specialEvents$.next([...events, event])

  }

  updateSpecialEvent(event: SpecialEvent) {
    const events = this.specialEvents$.getValue()

    for (let i=0; i < events.length; i++)
      if (events[i].id == event.id)
        events[i] = event

    this.specialEvents$.next([...events])
  }

  deleteSpecialEvent(id: number) {
    const events = this.specialEvents$.getValue()
    events.filter(event => event.id != id)
    this.specialEvents$.next([...events])
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
