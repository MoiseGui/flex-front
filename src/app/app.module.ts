import { CrupdateProfileModalComponent } from './components/profile/crupdate-profile-modal/crupdate-profile-modal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppComponent } from './app.component';
import { ToastrModule } from "ngx-toastr";
import { FullLayoutComponent } from './components/layouts/full-layout/full-layout.component';
import { ContentLayoutComponent } from './components/layouts/content-layout/content-layout.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { DragulaService } from "ng2-dragula";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import { LoginPageComponent } from './components/login/login-page.component';
import { CrupdateProfesseurModalComponent } from './components/professeur/crupdate-professeur-modal/crupdate-professeur-modal.component';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { GuestGard } from './shared/auth/guest-guard.service';
import { SharedModule } from './shared/shared.module';
import { ToastrComponent } from './shared/toastr/toastr.component';
import { NGXToastrService } from './shared/toastr/toastr.service';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};
export function momentAdapterFactory() {
  return adapterFactory(moment);
};
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, ToastrComponent, LoginPageComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ToastrModule.forRoot(), TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient]
    }
  }),
    HttpClientModule, MatDialogModule, MatButtonModule, NgbModule, SharedModule, AppRoutingModule, PerfectScrollbarModule, NgbModule, CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory
    }), ReactiveFormsModule],
  providers: [AuthService,
    AuthGuard,
    GuestGard,
    DragulaService,
    FormBuilder,
    NGXToastrService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }],
  bootstrap: [AppComponent],
  entryComponents: [
    CrupdateProfesseurModalComponent,
    CrupdateProfileModalComponent,

  ]
})
export class AppModule { }
