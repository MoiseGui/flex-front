import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { Etudiant } from '../models/Etudiant'
import { EtudiantService } from '../services/etudiant.service'
import { NGXToastrService } from '../shared/toastr/toastr.service'
import { EtudiantState } from '../states/etudiant.state'

@Injectable({
  providedIn: 'root'
})
export class EtudiantFacade {

  constructor(
    private etudiantService: EtudiantService,
    private etudiantState: EtudiantState,
    private toastService: NGXToastrService,
  ) { 
    this.loadEtudiants()
  }

  loadEtudiants() {
    this.etudiantService.findAll().subscribe(etudiant => {
      this.etudiantState.setEtudiants(etudiant)
    })
  }

  getEtudiants$(): Observable<Etudiant[]> {
    return this.etudiantState.getEtudiants$();
  }
  addEtudiant(etudiant: Etudiant): Observable<string> {
    let message = new Subject<string>();
    this.etudiantService.addEtudiant(etudiant).subscribe(response => {
      if (response.id) {
        this.etudiantState.addEtudiant(response);
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

  updateEtudiant(id: number, etudiant: Etudiant): Observable<string> {
    let message = new Subject<string>();
    
    this.etudiantService.updateEtudiant({ ...etudiant, id }).subscribe(response => {
      if (response.id) {
        this.etudiantState.updateEtudiant(response);
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

  deleteEtudiant(id: number) {
    this.etudiantService.deleteEtudiant(id).subscribe(response => {
      if (response.nom) {
        this.toastService.typeSuccess(`Etudiant ${response.nom} deleted successfully`);
        this.etudiantState.deleteEtudiant(id);
      }
      else {
        this.toastService.typeError(response.message);
      }
    });
  }

  handleError(error: any): string{
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


  getError$() {
    return this.etudiantState.getError$();
  }

  setError(message) {
    this.etudiantState.setError(message);
  }

  getLoading$() {
    return this.etudiantState.isLoading$();
  }

  setLoading(value: boolean) {
    this.etudiantState.setLoading(value);
  }
}
