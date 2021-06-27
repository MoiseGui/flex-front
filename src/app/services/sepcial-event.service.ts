import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../shared/auth/auth.service';
import {SpecialEvent} from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class SepcialEventService {

  readonly API = 'http://localhost:3000/specialEvents';
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

  createEvent(event: SpecialEvent): Observable<any> {
    const {nom, desc, salleId, profiles, date, heureDeb, heureFin, activated} = event;
    const profileIds = profiles;

    return this.http.post(`${this.API}/`, {nom, desc, salleId, profileIds, date, heureDeb, heureFin, activated}, {headers: this.headers});
  }

  findAll(): Observable<SpecialEvent[]> {
    return this.http.get<SpecialEvent[]>(`${this.API}/`, {headers: this.headers});
  }

  findById(id: number): Observable<SpecialEvent> {
    return this.http.get<SpecialEvent>(`${this.API}/${id}`, {headers: this.headers});
  }

  findByNom(nom: string): Observable<SpecialEvent> {
    return this.http.get<SpecialEvent>(`${this.API}/nom/${nom}`, {headers: this.headers});
  }

  update(event: SpecialEvent): Observable<any> {

    const {id, nom, desc, salleId, profiles, date, heureDeb, heureFin, activated} = event;
    const profileIds = profiles;
    return this.http.put<any>(`${this.API}/${id}`, {
      nom,
      desc,
      salleId,
      profileIds,
      date,
      heureDeb,
      heureFin,
      activated
    }, {headers: this.headers});
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, {headers: this.headers});
  }

}
