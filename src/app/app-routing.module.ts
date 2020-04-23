import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WnioskiComponent } from './wnioski/wnioski.component';
import { SzczegolyComponent } from './szczegoly/szczegoly.component';
import { SzczegolyResolver } from './szczegoly/szczegoly.resolver';
import { AuthGuard } from './services/auth.guard';
import { BladComponent } from './blad/blad.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/wnioski',
    pathMatch: "full"
  },
  {
    path: 'login/:token',
    component: LoginComponent
  },
  {
    path: 'wnioski',
    canActivate: [AuthGuard],
    component: WnioskiComponent
  },
  {
    path: 'wnioski/:id',
    canActivate: [AuthGuard],
    resolve: { szczegoly: SzczegolyResolver },
    component: SzczegolyComponent
  },
  {
    path: '**',
    component: BladComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
