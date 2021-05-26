import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from '../shared/auth/auth.service';
import { Filiere } from './../models/filiere';

@Injectable({
    providedIn: 'root',
})
export class FiliereService {
  public readonly API = 'http://localhost:3000/filieres';

  public headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.authService.credentials ? this.authService.credentials.token : 'null'}`);
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {
      this.authService.credentials$.subscribe((credentials) => {
        if (credentials) { this.headers.set('Authorization', `Bearer ${credentials.token}`); }
      });
    }

    public findAll(): Observable<Filiere[]> {
        return this.http.get<Filiere[]>(`${this.API}/`, {headers: this.headers});
    }

    public updatefiliere(filiere: Filiere): Observable<any> {
        const { nom } = filiere;
        return this.http.put(`${this.API}/id/${filiere.id}`, { nom }, {headers: this.headers});
    }

    public addfiliere(nom: string): Observable<any> {
        return this.http.post(`${this.API}/`, { nom }, {headers: this.headers});
    }

    public removefiliere(id: number): Observable<any> {
        return this.http.delete(`${this.API}/id/${id}`, {headers: this.headers});
    }
}
