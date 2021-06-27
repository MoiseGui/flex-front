import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Etudiant} from '../models/etudiant';
import {Periode} from '../models/periode';
import {PeriodeService} from '../services/periode.service';
import {ProfesseurService} from '../services/professeur.service';
import {NGXToastrService} from '../shared/toastr/toastr.service';
import {PeriodeState} from '../states/periode.state';
import {ProfesseurState} from '../states/professeur.state';

@Injectable({
  providedIn: 'root'
})
export class PerdiodFacade {

  constructor(
    private periodeService: PeriodeService,
    private periodeState: PeriodeState,
    private toastService: NGXToastrService,
  ) {
    this.getPeriods$();
  }

  getPeriods$() {
    this.periodeService.findAll().subscribe(periodes => {
      this.periodeState.setperiodes(periodes);
    });
  }

  gettPeriods$(): Observable<Periode[]> {
    return this.periodeState.getPeriodes$();
  }

  addperiode(periode: Periode): Observable<string> {
    let message = new Subject<string>();
    this.periodeService.addperiode(periode).subscribe(response => {
      if (response.id) {
        this.periodeState.addperiodes(response);
        message.next('Ok');
      } else {
        message.next(response.message);
      }
    }, error => {
      this.setLoading(false);
      message.next(this.handleError(error));
    });

    return message;
  }

  updateEtudiant(id: number, periode: Periode): Observable<string> {
    let message = new Subject<string>();

    this.periodeService.updateperiode({...periode, id}).subscribe(response => {
      if (response.id) {
        this.periodeState.updateperiodes(response);
        message.next('Ok');
      } else {
        message.next(response.message);
      }
    }, error => {
      this.setLoading(false);
      message.next(this.handleError(error));
    });

    return message;
  }

  deletePeriode(id: number) {
    this.periodeService.removeperiode(id).subscribe(response => {
      if (response.nom) {
        this.toastService.typeSuccess(`Etudiant ${response.nom} deleted successfully`);
        this.periodeState.removePeriode(id);
      } else {
        this.toastService.typeError(response.message);
      }
    });
  }

  handleError(error: any): string {
    let text = '';

    if (typeof error.error.message == 'string') {
      text = error.error.message;
    } else {
      for (let i = 0; i < error.error.message.length; i++) {
        if (i == error.error.message.length - 1) {
          text += `${error.error.message[i]}`;
        } else {
          text += `${error.error.message[i]} | `;
        }
      }
    }
    return text;
  }

  getError$() {
    return this.periodeState.getError$();
  }

  setError(message) {
    this.periodeState.setError(message);
  }

  getLoading$() {
    return this.periodeState.isLoading$();
  }

  setLoading(value: boolean) {
    this.periodeState.setLoading(value);
  }
}
