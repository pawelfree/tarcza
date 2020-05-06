import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WnioskiService } from './services/wnioski.service';
import { AuthService } from './services/auth.service';
import { MinutePipe } from './services/minute.pipe';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { ComponentsModule } from './components/components.module';

@NgModule( {
  declarations: [
    AppComponent,
    MinutePipe
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    InterceptorsModule,
    ComponentsModule
  ],
  providers: [
    WnioskiService,
    AuthService
  ],
  bootstrap: [AppComponent]
} )
export class AppModule { }
