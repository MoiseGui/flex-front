import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Creneau} from '../models/creneau';
import {AuthService} from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RepetitionService {

  // creneau
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

  findAll(): Observable<Creneau[]> {
    return this.http.get<Creneau[]>(`${this.API}/`, {headers: this.headers});
  }
}
