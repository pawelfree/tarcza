import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
    exports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatToolbarModule]
})
export class AngularMaterialModule { }
