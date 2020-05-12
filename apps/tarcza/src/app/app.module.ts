import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WnioskiService } from './services/wnioski.service';
import { AuthService } from './services/auth.service';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule( {
  declarations: [
    AppComponent
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    InterceptorsModule,
    PipesModule,
  ],
  providers: [
    AuthService,
    WnioskiService
  ],
  bootstrap: [AppComponent]
} )
export class AppModule { }
