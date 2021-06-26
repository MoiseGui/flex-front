import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Creneau} from '../models/creneau';
import {Jour} from '../models/Jour';
import {AuthService} from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JourService {

  readonly API = 'http://localhost:3000/jours';

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

  findAll(): Observable<Jour[]> {
    return this.http.get<Jour[]>(`${this.API}/`, {headers: this.headers});
  }
}
