import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Periode} from '../models/periode';
import {Professeur} from '../models/professeur';

@Injectable({
  providedIn: 'root'
})
export class PeriodeState {

  private periode$ = new BehaviorSubject<Periode[]>(null);
  private loading$ = new BehaviorSubject<boolean>(false);
  private updating$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string>('');

  constructor() {
  }

  getPeriodes$() {
    return this.periode$.asObservable();
  }

  setperiodes(periodes: Periode[]) {
    this.periode$.next(periodes);
  }

  addperiodes(periode: Periode) {
    const periodes = this.periode$.getValue();

    if (periodes == null) {
      this.periode$.next(new Array(periode));
    } else {
      this.periode$.next([...periodes, periode]);
    }
  }

  updateperiodes(periode: Periode) {
    const periodes = this.periode$.getValue();

    // foreach can't get the job done
    for (let i = 0; i < periodes.length; i++) {
      if (periodes[i].id == periode.id) {
        periodes[i] = periode;
      }
    }

    // profs.forEach(element => {
    //   if(element.id == prof.id) {
    //     console.log("Old",element)
    //     console.log("Neew",prof)
    //     element = prof;
    //     console.log("After affectation",element)
    //   };
    // });

    // console.log("Profs", profs);
    this.periode$.next([...periodes]);
  }

  removePeriode(id: number) {
    let periodes = this.periode$.getValue();

    periodes = periodes.filter(p => p.id != id);

    this.periode$.next([...periodes]);
  }

  setError(message) {
    this.error$.next(message);
  }

  getError$() {
    return this.error$;
  }

  isLoading$() {
    return this.loading$.asObservable();
  }

  setLoading(value: boolean) {
    this.loading$.next(value);
  }
}
