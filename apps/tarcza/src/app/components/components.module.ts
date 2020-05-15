import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WnioskiComponent } from './wnioski/wnioski.component';
import { WniosekComponent } from './wnioski/wniosek/wniosek.component';
import { WaitComponent } from './wait/wait.component';
import { PersonComponent } from './person/person.component';
import { OdwolanieComponent } from './odwolania/odwolanie/odwolanie.component';
import { OdwolaniaComponent } from './odwolania/odwolania.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { BladComponent } from './blad/blad.component';

import { AngularMaterialModule } from '../angular-material.module';
import { PipesModule } from '../pipes/pipes.module';
import { ErrorComponent } from './error/error.component';

@NgModule({
    imports: [
        AngularMaterialModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        BladComponent,
        LoginComponent,
        LogoutComponent,
        ErrorComponent,
        OdwolaniaComponent,
        OdwolanieComponent,
        PersonComponent,
        WaitComponent,
        WniosekComponent,
        WnioskiComponent
      ]
})
export class ComponentsModule {

    constructor() {}
}
