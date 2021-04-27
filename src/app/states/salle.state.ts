import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Salle} from '../models/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleState {

  private salles$ = new BehaviorSubject<Salle[]>(null);
  private loading$ = new BehaviorSubject<boolean>(false);
  private updating$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string>("");


  constructor() { }


  getSalles$(){
    return this.salles$.asObservable();
  }

  setSalles(salles:Salle[]){
    this.salles$.next(salles);
  }

  addSalle(salle: Salle){
    const salles = this.salles$.getValue();
    if(salles == null){
      this.salles$.next(new Array(salle))
    }else{
      this.salles$.next([...salles,salle]);
    }
  }

  updateSalle(salle: Salle): void{
    const salles = this.salles$.getValue();

    salles.forEach(element => {
      if(element._id == salle._id) element._nom = salle._nom;
    });

    this.salles$.next([...salles]);
  }

  removeSalle(id: number){
    let salles = this.salles$.getValue();

    salles = salles.filter((salle) => salle._id != id)

    this.salles$.next([...salles]);
  }

  setError(message){
    this.error$.next(message)
  }

  isLoading$(){
    return this.loading$.asObservable();
  }

  getError$() {
    return this.error$;
  }
}
