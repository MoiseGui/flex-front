import { CalendarRepetition } from './../models/repetition';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Repetition} from '../models/repetition';
import {RepetitionDto} from '../models/repetitionDto';
import {AuthService} from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RepetitionService {

  // repetition
  readonly API = 'http://localhost:3000/repetitions';

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.authService.credentials ? this.authService.credentials.token : 'null'}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.credentials$.subscribe(credentials => {
      if (credentials) {
        this.headers.set('Authorization', `Bearer ${credentials.token}`);
      }
    });
  }

  findAll(): Observable<Repetition[]> {
    return this.http.get<Repetition[]>(`${this.API}/`, {headers: this.headers});
  }

  findById(id: number): Observable<CalendarRepetition> {
    return this.http.get<CalendarRepetition>(`${this.API}/${id}`, {headers: this.headers});
  }

  create(repetition: RepetitionDto): Observable<any> {
    // jour === jourOrder !!!!!!!!!!!!!!!!!!!!!!!!
    const {eventId, jourOrder, creaneauOrder, periodeId} = repetition;
    // const eventId = event.id;
    // const periodeId = periode.id;
    // const creaneauOrder = creneau.id;
    // const jourOrder = jour;
    console.log(eventId, periodeId, creaneauOrder, jourOrder);

    return this.http.post<Repetition>(`${this.API}/`, {
      eventId, periodeId, jourOrder, creaneauOrder
    }, {headers: this.headers});
  }

  update(id: number, repetition: Repetition): Observable<any> {
    const {event, jour, creneau, periode} = repetition;
    const eventId = event.id;
    const periodeId = periode.id;
    const creaneauOrder = creneau.id;
    const jourOrder = jour;
    return this.http.put(`${this.API}/${id}`,{
      eventId, periodeId, jourOrder, creaneauOrder
    }, {headers: this.headers});
  }

  create2(repetition: RepetitionDto): Observable<any> {
    // jour === jourOrder !!!!!!!!!!!!!!!!!!!!!!!!
    const {eventId, jourOrder, creaneauOrder, periodeId} = repetition;

    return this.http.post<Repetition>(`${this.API}/`, {
      eventId, periodeId, jourOrder, creaneauOrder
    }, {headers: this.headers});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, {headers: this.headers});
  }

}
