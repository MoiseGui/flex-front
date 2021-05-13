import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(!this.authService.isAuthenticated()) this.router.navigate(['login']);

    return this.authService.isAuthenticated();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.authService.isAuthenticated()) this.router.navigate(['login']);

    return this.authService.isAuthenticated();
  }
}
