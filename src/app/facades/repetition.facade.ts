import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Repetition} from '../models/repetition';
import {RepetitionDto} from '../models/repetitionDto';
import {RepetitionService} from '../services/repetition.service';
import {NGXToastrService} from '../shared/toastr/toastr.service';
import {RepetitionState} from '../states/repetition.state';

@Injectable({
  providedIn: 'root'
})
export class RepetitionFacade {

  constructor(
    private repetitionService: RepetitionService,
    private repetitionState: RepetitionState,
    private toastService: NGXToastrService,
  ) {
    this.loadRepetitions();
  }

  loadRepetitions() {
    this.repetitionService.findAll().subscribe(
      response => this.repetitionState.setRepetitions(response));
  }

  getRepetitions(): Observable<Repetition[]> {
    return this.repetitionState.getRepetitions$();
  }

  findById(id: number){
    return this.repetitionService.findById(id);
  }

  addRepetition(repetition: Repetition): Observable<string> {
    let message = new Subject<string>();
    const repetitionDto = {
      'eventId': repetition.event.id,
      'periodeId': repetition.periode.id,
      'jourOrder': repetition.jour,
      'creaneauOrder': repetition.creneau.id
    };
    this.repetitionService.create(repetitionDto).subscribe(
      response => {
        if (response.id) {
          this.repetitionState.addRepetition(response);
          message.next('Ok');
        } else {
          message.next(response.message);
        }
      }
      , error => {
        this.setLoading(false);
        message.next(this.handleError(error));
      }
    );
    return message;
  }
  
  updateRepetition(id: number, rep: Repetition) {
    let message = new Subject<string>();

    this.repetitionService.update(id, rep).subscribe(response => {
      if (response.id) {
        this.profileState.updateProfile(id, response);
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

  deleteRepetition(id: number) {
    this.repetitionService.delete(id).subscribe(
      response => {
        if (response.nom) {
          this.toastService.typeSuccess(`Repetition ${response.nom} deleted successfully`);
          this.repetitionState.removeRepetition(id);
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

  isLoading$() {
    return this.repetitionState.isLoading$();
  }

  setLoading(value: boolean) {
    this.repetitionState.setLoading(value);
  }

  getError$() {
    return this.repetitionState.getError$();
  }

  setError(message) {
    this.repetitionState.setError(message);
  }
}
