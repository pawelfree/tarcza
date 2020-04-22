import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WnioskiComponent } from './wnioski/wnioski.component';
import { SzczegolyComponent } from './szczegoly/szczegoly.component';
import { WnioskiService } from './services/wnioski.service';

@NgModule({
  declarations: [
    AppComponent,
    WnioskiComponent,
    SzczegolyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule
  ],
  providers: [
    WnioskiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
