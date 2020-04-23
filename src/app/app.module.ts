import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from "@auth0/angular-jwt";

import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WnioskiComponent } from './wnioski/wnioski.component';
import { WnioskiService } from './services/wnioski.service';
import { BladComponent } from './blad/blad.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    WnioskiComponent,
    BladComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
