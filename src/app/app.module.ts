import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtHelperService, JwtInterceptor } from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WnioskiComponent } from './wnioski/wnioski.component';
import { WnioskiService } from './services/wnioski.service';
import { BladComponent } from './blad/blad.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './services/auth.service';
import { WaitComponent } from './wait/wait.component';

@NgModule({
  declarations: [
    AppComponent,
    WnioskiComponent,
    BladComponent,
    LoginComponent,
    LogoutComponent,
    WaitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("id_token");
        },
        whitelistedDomains: ["localhost:3000"]
      }
    })
  ],
  providers: [
    WnioskiService,
    JwtHelperService,
    AuthService
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
