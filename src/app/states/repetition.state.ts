import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Repetition} from '../models/repetition';
import {RepetitionDto} from '../models/repetitionDto';

@Injectable({
    providedIn: 'root'
  }
)
export class RepetitionState {

  private repetitions$ = new BehaviorSubject<Repetition[]>(null);
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<String>('');

  constructor() {
  }

  getRepetitions$() {
    return this.repetitions$.asObservable();
  }

  setRepetitions(repetitions: Repetition[]) {
    this.repetitions$.next(repetitions);
  }

  addRepetition(repetition: Repetition) {
    const repetitions = this.repetitions$.getValue();
    if (repetition == null) {
      this.repetitions$.next([...repetitions]);
    } else {
      this.repetitions$.next([...repetitions, repetition]);
    }
  }

  removeRepetition(id: number) {
    const repetition = this.repetitions$.getValue();
    repetition.filter(rep => rep.id != id);
    this.repetitions$.next(repetition);
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
    this.error$.next(message);
  }

}
