import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {Repetition} from '../models/repetition'
import {AuthService} from '../shared/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class RepetitionService {

  // repetition
  readonly API = 'http://localhost:3000/repetitions'

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.authService.credentials ? this.authService.credentials.token : 'null'}`)

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.credentials$.subscribe(credentials => {
      if (credentials) {
        this.headers.set('Authorization', `Bearer ${credentials.token}`)
      }
    })
  }

  findAll(): Observable<Repetition[]> {
    return this.http.get<Repetition[]>(`${this.API}/`, {headers: this.headers})
  }

  create(repetition: Repetition): Observable<any> {
    // jour === jourOrder !!!!!!!!!!!!!!!!!!!!!!!!
    const {event, jour, creneau, periode} = repetition

    const eventId = event.id
    const periodeId = periode.id
    const creneauOrder = creneau.ordre

    return this.http.post<Repetition>(`${this.API}/`, {
      eventId, periodeId, jour, creneauOrder
    }, {headers: this.headers})
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, {headers: this.headers})
  }

}
