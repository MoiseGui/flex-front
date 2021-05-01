import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Professeur} from '../models/professeur';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {
  readonly API = 'http://localhost:3000/professeurs';
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Professeur[]>{
    return this.http.get<Professeur[]>(`${this.API}/`);
  }

  updateprofesseur(professeur: Professeur): Observable<any>{
    const {nom, prenom, email, admin} = professeur;
    return this.http.put(`${this.API}/${professeur.id}`, {nom, prenom, email, admin});
  }

  addprofesseur(professeur: Professeur): Observable<any> {
    const {nom, prenom, email, admin} = professeur;
    return  this.http.post(`${this.API}/`, {nom, prenom, email, admin});
  }

  removeprofesseur(id: number): Observable<any> {
    return  this.http.delete(`${this.API}/${id}`);
  }
}
