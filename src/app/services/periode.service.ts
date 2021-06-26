import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Periode} from '../models/periode';
import {Professeur} from '../models/professeur';
import {AuthService} from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {

  readonly API = 'http://localhost:3000/periodes';

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

  findAll(): Observable<Periode[]> {
    return this.http.get<Periode[]>(`${this.API}/`, {headers: this.headers});
  }

  updateperiode(periode: Periode): Observable<any> {
    const {libelle, dateDeb, dateFin} = periode;
    return this.http.put(`${this.API}/${periode.id}`, {libelle, dateDeb, dateFin}, {headers: this.headers});
  }

  addperiode(periode: Periode): Observable<any> {
    const {libelle, dateDeb, dateFin} = periode;
    return this.http.post(`${this.API}/`, {libelle, dateDeb, dateFin}, {headers: this.headers});
  }

  removeperiode(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, {headers: this.headers});
  }
}
