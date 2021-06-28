import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Professeur} from '../models/professeur';
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
      this.repetitions$.next(new Array(repetition));
    } else {
      this.repetitions$.next([...repetitions, repetition]);
    }
  }
  
  update(id: number, repetition: Repetition) {
    const repetitions = this.repetitions$.getValue();
      
    for(let i = 0; i < repetitions.length ; i++)
      if (repetitions[i].id == repetition.id)
        repetitions[i] = repetition
    
    this.repetitions$.next[...repetitions]

  }

  removeRepetition(id: number) {
    let repetitions = this.repetitions$.getValue();
    repetitions = repetitions.filter(rep => rep.id != id);
    this.repetitions$.next(repetitions);
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
