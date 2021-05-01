import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Professeur} from '../models/professeur';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurState {

  private professeurs$ = new BehaviorSubject<Professeur[]>(null);
  private loading$ = new BehaviorSubject<boolean>(false);
  private updating$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string>("");

  constructor() { }

  getProfesseurs$(){
    return this.professeurs$.asObservable();
  }

  setProfesseurs(profs: Professeur[]){
    this.professeurs$.next(profs);
  }

  addProfesseur(prof: Professeur){
    const profs = this.professeurs$.getValue();

    if(profs == null){
      this.professeurs$.next(new Array(prof));
    }
    else {
      this.professeurs$.next([...profs,prof]);
    }
  }

  updateProfesseur(prof: Professeur){
    const profs = this.professeurs$.getValue();

    // foreach can't get the job done
    for(let i = 0; i < profs.length; i++){
      if(profs[i].id == prof.id) profs[i] = prof;
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
    this.professeurs$.next([...profs]);
  }

  removeProfesseur(id: number){
    let profs = this.professeurs$.getValue();

    profs = profs.filter(prof => prof.id != id);

    this.professeurs$.next([...profs]);
  }

  setError(message){
    this.error$.next(message)
  }

  getError$() {
    return this.error$;
  }

  isLoading$(){
    return this.loading$.asObservable();
  }

  setLoading(value: boolean){
    this.loading$.next(value);
  }
}
