import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WnioskiComponent } from './wnioski/wnioski.component';
import { Routes, RouterModule } from '@angular/router';
import { SzczegolyComponent } from './szczegoly/szczegoly.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/wnioski',
    pathMatch: "full"
  },
  { 
    path: 'wnioski',
    component: WnioskiComponent
  },
  {
    path: 'wnioski/:id',
    component: SzczegolyComponent
  },
  { path: '**', redirectTo: '/wnioski' }
];

@NgModule({
  declarations: [
    AppComponent,
    WnioskiComponent,
    SzczegolyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
