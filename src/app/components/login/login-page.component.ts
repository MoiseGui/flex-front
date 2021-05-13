import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import {BehaviorSubject} from 'rxjs';
import {AuthService} from '../../shared/auth/auth.service';

export interface LoginData{
  email: string;
  password: string;
}


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  // @ViewChild('f', {static: false}) loginForm: NgForm;
  public loading$ = this.authService.loading$;
  public errorMessage: string = null;

  public form = this.fb.group({
    email: [''],
    password: [''],
    remember: [false],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.resetState();
  }

  ngOnInit() {
    this.authService.errorMessage$.subscribe(value => {
      if(value != ""){
        this.errorMessage = value;
      }
      else this.errorMessage = null;
    })
  }

  // On submit button click
    onSubmit() {
      this.unsetError();
      const {email, password, remember} = this.form.value;
      this.authService.signinUser(email, password, remember);
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

  unsetError(){
    this.authService.unsetError();
  }

  private resetState() {
    this.form.reset();
  }
}
