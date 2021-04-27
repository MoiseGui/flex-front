import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Salle} from '../models/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  readonly API = 'http://localhost:8080/salles';
  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Salle[]>{
    return this.http.get<Salle[]>(`${this.API}/`);
  }

  updateSalle(salle: Salle): Observable<any>{
    return this.http.put(`${this.API}/${salle._id}`, {nom: salle._nom});
  }

  addSalle(nom: string): Observable<any> {
    return  this.http.post(`${this.API}/`, {nom});
  }

  removeSalle(id: number): Observable<any> {
    return  this.http.delete(`${this.API}/${id}`);
  }
}
