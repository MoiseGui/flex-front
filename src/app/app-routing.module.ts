import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import {LoginPageComponent} from './components/login/login-page.component';
import {AuthGuard} from './shared/auth/auth-guard.service';
import {GuestGard} from './shared/auth/guest-guard.service';
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { FullLayoutComponent } from './components/layouts/full-layout/full-layout.component';
import { CONTENT_ROUTES } from './shared/routes/content-layout';
import { ContentLayoutComponent } from './components/layouts/content-layout/content-layout.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [GuestGard],
  },
  { path: '',
    component: FullLayoutComponent,
    data: { title: 'full Views' },
    children: Full_ROUTES,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Login' },
    canActivate: [GuestGard],
  },
  {
    path: '**',
    redirectTo: 'pages/error'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
