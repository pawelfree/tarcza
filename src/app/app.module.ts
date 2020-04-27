import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
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
import { PersonComponent } from './person/person.component';
import { MinutePipe } from './services/minute.pipe';

@NgModule( {
  declarations: [
    AppComponent,
    WnioskiComponent,
    BladComponent,
    LoginComponent,
    LogoutComponent,
    WaitComponent,
    PersonComponent,
    MinutePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  providers: [
    WnioskiService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
} )
export class AppModule { }
