import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AngularMaterialModule} from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WnioskiComponent } from './wnioski/wnioski.component';
import { SzczegolyComponent } from './szczegoly/szczegoly.component';
import { WnioskiService } from './services/wnioski.service';
import { JwtInterceptor } from './services/jwt.interceptor';
import { BladComponent } from './blad/blad.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    WnioskiComponent,
    SzczegolyComponent,
    BladComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  providers: [
    WnioskiService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
