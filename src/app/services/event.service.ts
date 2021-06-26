import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../shared/auth/auth.service';
import {Event} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  readonly API = 'http://localhost:3000/events';

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

  createEvent(event: Event): Observable<any> {

    const {nom, desc, salleId, profiles, repetitions} = event;
    const profileIds = profiles;
    // const repetitionIds = repetitions.map((rep) => rep.id);
    const repetitionIds = [];
    return this.http.post(`${this.API}/`, {nom, desc, salleId, profileIds, repetitionIds}, {headers: this.headers});
  }

  findAll(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API}/`, {headers: this.headers});
  }

  findById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.API}/${id}`, {headers: this.headers});
  }

  findBySalleId(salleId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API}/room-id/${salleId}`, {headers: this.headers});
  }

  findByNom(nom: string): Observable<Event> {
    return this.http.get<Event>(`${this.API}/nom/${nom}`, {headers: this.headers});
  }

  updateEvent(event: Event): Observable<any> {
    const {nom, desc, salleId, profiles, repetitions} = event;
    const profileIds = profiles;
    // const repetitionIds = repetitions.map((rep) => rep.id);
    const repetitionIds = [];

    return this.http.put<any>(`${this.API}/${event.id}`, {nom, desc, salleId, profileIds, repetitionIds},
      {headers: this.headers});
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API}/${id}`, {headers: this.headers});
  }

}
