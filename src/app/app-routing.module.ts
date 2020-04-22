import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WnioskiComponent } from './wnioski/wnioski.component';
import { SzczegolyComponent } from './szczegoly/szczegoly.component';
import { SzczegolyResolver } from './szczegoly/szczegoly.resolver';


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
    resolve: {szczegoly: SzczegolyResolver},
    component: SzczegolyComponent
  },
  { path: '**', redirectTo: '/wnioski' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
