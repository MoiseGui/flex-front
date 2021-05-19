import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  readonly API = 'http://localhost:3000/Profiles';

  constructor(
    private http: HttpClient,
  ) { }

  // find all Profiles
  findAll(): Observable<Profile[]>{
    return this.http.get<Profile[]>(`${this.API}/`);
  }

  // find Profile by id
  findById(id: number): Observable<any>{
    return this.http.get<Profile>(`${this.API}/id/${id}`);
  }

  // find Profile by libelle
  findByLibelle(libelle: string): Observable<any>{
    return this.http.get<Profile>(`${this.API}/libelle/${libelle}`)
  }

  // add Profile (return the saved Profile !!)
  addProfile(Profile: Profile): Observable<any> {
    const { libelle, open, professeurs, /* fillieres, events, specialEvents */ } = Profile;
    return this.http.post<Profile>(`${this.API}/`, {libelle , open, professeurs, /* fillieres, events, specialEvents */});
  }

}
