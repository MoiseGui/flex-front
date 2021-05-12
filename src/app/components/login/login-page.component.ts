import { Component, ViewChild } from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {BehaviorSubject} from 'rxjs';

export interface LoginData{
  email: string;
  password: string;
}


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  // @ViewChild('f', {static: false}) loginForm: NgForm;
  public errors$ = new BehaviorSubject<Partial<LoginData>>({});

  public form = this.fb.group({
    email: [''],
    password: [''],
    remember: [false],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetState();
  }

    // On submit button click
    onSubmit() {
      this.resetState();
        // this.loginForm.reset();
      this.router.navigate(['dashboard']);
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

  private resetState() {
    this.form.reset();
    this.errors$.next({});
  }
}
