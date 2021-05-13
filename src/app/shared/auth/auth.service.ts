import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly API = 'http://localhost:3000/auth/admin';

  public loading$ = new BehaviorSubject<boolean>(false);
  public errorMessage$ = new BehaviorSubject<string>("");

  token$ = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(email: string, password: string) {
    this.http.post<any>(`${this.API}/login`, { email, password }).subscribe(response => {
      if(response.access_token){
        this.token$.next(response.access_token);
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
    this.token$.next(null);
    this.router.navigate(['login']);
  }

  getToken() {
    return this.token$.getValue();
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    return !!this.getToken();
  }

  setError(message: string){
    this.errorMessage$.next(message);
  }

  unsetError(){
    this.errorMessage$.next("");
  }
}
