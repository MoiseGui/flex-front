import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Credentials {
  email: string;
  role: string;
  token: string;
}

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _credentials$ = new BehaviorSubject<Credentials | null>(null);

  readonly API = 'http://localhost:3000/auth/admin';

  public loading$ = new BehaviorSubject<boolean>(false);
  public errorMessage$ = new BehaviorSubject<string>("");

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials$.next(JSON.parse(savedCredentials));
    }
  }

  /**
   * Gets the user credentials.
   * @return Credentials The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials$.getValue();
  }
  get credentials$(){
    return this._credentials$.asObservable();
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials$.next(credentials || null);

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  signinUser(email: string, password: string, remember: boolean = false) {
    this.http.post<any>(`${this.API}/login`, { email, password }).subscribe(response => {
      if(response.access_token){
        const {access_token} = response;
        const {email, role} = response.payload;
        const credentials = {email, role, token: access_token};

        this.setCredentials(credentials, remember);

        // this.token$.next(response.access_token);
        this.router.navigate(['dashboard']);
      }
      else{
        this.setError(response.message);
      }
    }, error => {
      this.setError(error.error.message);
    })
  }

  logout() {
    this.setCredentials();
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    return !!this.credentials;
  }

  setError(message: string){
    this.errorMessage$.next(message);
  }

  unsetError(){
    this.errorMessage$.next("");
  }
}
