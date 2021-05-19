import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../shared/auth/auth.service'
import { Etudiant } from '../models/etudiant'

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  readonly API = 'http://localhost:3000/etudiants'

  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', `Bearer ${this.authService.credentials ? this.authService.credentials.token : "null"}`)
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.credentials$.subscribe(credentials => {
      if(credentials) this.headers.set('Authorization', `Bearer ${credentials.token}`)
    })
  }

  findAll(): Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(`${this.API}/`, {headers: this.headers})
  }
  
  findById(id :number): Observable<Etudiant>{
    return this.http.get<Etudiant>(`${this.API}/${id}`, {headers: this.headers})
  }
  
  findByCne(cne :string): Observable<Etudiant>{
    return this.http.get<Etudiant>(`${this.API}/cne/${cne}`, {headers: this.headers})
  }

  addEtudiant(etudiant: Etudiant): Observable<any>{
    const {nom, prenom, email, cne, filiere} = etudiant
    return this.http.post(`${this.API}/`, {nom, prenom, email, cne, filiere}, {headers: this.headers})
  }

  updateEtudiant(etudiant: Etudiant): Observable<any>{
    const {nom, prenom, email, cne, filiere} = etudiant
    return this.http.put(`${this.API}/${etudiant.id}`, {nom, prenom, email, cne, filiere}, {headers: this.headers})
  } 
  
  deleteEtudiant(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, {headers: this.headers})
  }

}
