import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Salle} from '../models/salle';
import {AuthService} from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  readonly API = 'http://localhost:3000/salles';

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.authService.credentials ? this.authService.credentials.token : "null"}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.credentials$.subscribe(credentials => {
      this.headers.set('Authorization', `Bearer ${credentials ? credentials.token : 'null'}`);
    })
  }

  findAll(): Observable<Salle[]>{
    return this.http.get<Salle[]>(`${this.API}/`, {headers: this.headers});
  }

  updateSalle(salle: Salle): Observable<any>{
    return this.http.put(`${this.API}/${salle.id}`, {nom: salle.nom}, {headers: this.headers});
  }

  addSalle(nom: string): Observable<any> {
    return  this.http.post(`${this.API}/`, {nom}, {headers: this.headers});
  }

  removeSalle(id: number): Observable<any> {
    return  this.http.delete(`${this.API}/${id}`, {headers: this.headers});
  }
}
