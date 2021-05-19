import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile'
import { AuthService } from '../shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  readonly API = 'http://localhost:3000/profiles';

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.authService.credentials ? this.authService.credentials.token : "null"}`);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.credentials$.subscribe(credentials => {
      if (credentials) this.headers.set('Authorization', `Bearer ${credentials.token}`);
    })
  }

  // find all Profiles
  findAll(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.API}/`, { headers: this.headers });
  }

  // find Profile by id
  findById(id: number): Observable<any> {
    return this.http.get<Profile>(`${this.API}/id/${id}`, { headers: this.headers });
  }

  // find Profile by libelle
  findByLibelle(libelle: string): Observable<any> {
    return this.http.get<Profile>(`${this.API}/libelle/${libelle}`, { headers: this.headers })
  }

  // add Profile (return the saved Profile !!)
  addProfile(Profile: Profile): Observable<any> {
    const { libelle, open, professeurs, filieres, /* events, specialEvents */ } = Profile;
    return this.http.post<Profile>(`${this.API}/`, { libelle, open, professeurs, filieres, /* events, specialEvents */ }, { headers: this.headers });
  }

}
