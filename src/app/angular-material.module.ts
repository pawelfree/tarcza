import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
    exports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatDividerModule]
})
export class AngularMaterialModule { }
