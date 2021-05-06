import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Professeur } from '../models/professeur';
import { ProfesseurService } from '../services/professeur.service';
import { NGXToastrService } from '../shared/toastr/toastr.service';
import { ProfesseurState } from '../states/professeur.state';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurFacade {

  constructor(
    private profService: ProfesseurService,
    private profState: ProfesseurState,
    private toastService: NGXToastrService,
  ) {
    this.loadProfs();
  }

  loadProfs() {
    this.profService.findAll().subscribe(profs => {
      this.profState.setProfesseurs(profs);
    })
  }

  getProfesseurs$(): Observable<Professeur[]> {
    return this.profState.getProfesseurs$();
  }

  addProfesseur(prof: Professeur): Observable<string> {
    let message = new Subject<string>();
    this.profService.addprofesseur(prof).subscribe(response => {
      // console.log("Response",response.message)
      if (response.id) {
        this.profState.addProfesseur(response);
        message.next("Ok");
      }
      else {
        message.next(response.message);
      }
    }, error => {
      this.setLoading(false);
      message.next(this.handleError(error));
    })

    return message;
  }

  updateProfesseur(id: number, prof: Professeur): Observable<string> {
    let message = new Subject<string>();

    this.profService.updateprofesseur({ ...prof, id }).subscribe(response => {
      if (response.id) {
        this.profState.updateProfesseur(response);
        message.next("Ok");
      }
      else {
        message.next(response.message);
      }
    }, error => {
      // console.log("Error", message)
      this.setLoading(false);
      message.next(this.handleError(error));
    })

    return message;
  }

  removeProfesseur(id: number) {
    this.profService.removeprofesseur(id).subscribe(response => {
      if (response.nom) {
        this.toastService.typeSuccess(`Professeur ${response.nom} deleted successfully`);
        this.profState.removeProfesseur(id);
      }
      else {
        this.toastService.typeError(response.message);
      }
    });
  }

  handleError(error: any): string {
    let text = "";
    for (let i = 0; i < error.error.message.length; i++) {
      if (i == error.error.message.length - 1) text += `${error.error.message[i]}`
      else text += `${error.error.message[i]} | `
    }
    return text;
  }

  getError$() {
    return this.profState.getError$();
  }

  setError(message) {
    this.profState.setError(message);
  }

  getLoading$() {
    return this.profState.isLoading$();
  }

  setLoading(value: boolean) {
    this.profState.setLoading(value);
  }
}
