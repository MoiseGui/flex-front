import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Etudiant } from '../models/etudiant'

@Injectable({
  providedIn: 'root'
})
export class EtudiantState {

  private etudiants$ = new BehaviorSubject<Etudiant[]>(null)
  private loading$ = new BehaviorSubject<boolean>(false)
  private error$ = new BehaviorSubject<string>("")

  constructor() { }

  getEtudiants$() {
    return this.etudiants$.asObservable()
  } 

  setEtudiants(etudiants: Etudiant[]) {
    this.etudiants$.next(etudiants)
  }

  addEtudiant(etudiant: Etudiant) {
    const etudiants = this.etudiants$.getValue()
  
    if(etudiants == null) {
      this.etudiants$.next(new Array(etudiant))
    } else {
      this.etudiants$.next([...etudiants, etudiant])
    }
  }

  updateEtudiant(etudiant: Etudiant) {
    const etudiants = this.etudiants$.getValue();

    for (let i = 0; i < etudiants.length; i++) {
      if (etudiants[i].id == etudiant.id) etudiants[i] = etudiant;
    }
    this.etudiants$.next([...etudiants]);
  }

  deleteEtudiant(id: number) {
    let etudiants = this.etudiants$.getValue()
    etudiants = etudiants.filter(etudiants => etudiants.id != id)
    this.etudiants$.next([...etudiants])
  }

  isLoading$(){
    return this.loading$.asObservable()
  }

  setLoading(value: boolean){
    this.loading$.next(value)
  }

  setError(message){
    this.error$.next(message)
  }

  getError$() {
    return this.error$
  }
}
