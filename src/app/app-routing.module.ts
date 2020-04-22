import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WnioskiComponent } from './wnioski/wnioski.component';
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
