import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WnioskiComponent } from './components/wnioski/wnioski.component';
import { AuthGuard } from './services/auth.guard';
import { BladComponent } from './components/blad/blad.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PersonComponent } from './components/person/person.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/wnioski',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'wnioski',
    canActivate: [AuthGuard],
    component: WnioskiComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'person',
    component: PersonComponent
  },
  {
    path: '**',
    component: BladComponent
  }
];

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
