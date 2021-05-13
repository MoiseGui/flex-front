import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Professeur} from '../models/professeur';
import {AuthService} from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  readonly API = 'http://localhost:3000/professeurs';

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.authService.getToken()}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.token$.subscribe(token => {
      this.headers.set('Authorization', `Bearer ${token}`);
    })
  }

  findAll(): Observable<Professeur[]>{
    return this.http.get<Professeur[]>(`${this.API}/`, {headers: this.headers});
  }

  updateprofesseur(professeur: Professeur): Observable<any>{
    const {nom, prenom, email, admin} = professeur;
    return this.http.put(`${this.API}/${professeur.id}`, {nom, prenom, email, admin}, {headers: this.headers});
  }

  addprofesseur(professeur: Professeur): Observable<any> {
    const {nom, prenom, email, password, admin} = professeur;
    return  this.http.post(`${this.API}/`, {nom, prenom, email, password, admin}, {headers: this.headers});
  }

  removeprofesseur(id: number): Observable<any> {
    return  this.http.delete(`${this.API}/${id}`, {headers: this.headers});
  }
}
