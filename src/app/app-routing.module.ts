import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { FullLayoutComponent } from './components/layouts/full-layout/full-layout.component';
import { CONTENT_ROUTES } from './shared/routes/content-layout';
import { ContentLayoutComponent } from './components/layouts/content-layout/content-layout.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: '',
    component: FullLayoutComponent,
    data: { title: 'full Views' },
    children: Full_ROUTES,
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
