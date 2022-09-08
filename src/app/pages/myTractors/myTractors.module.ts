import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MyTractorsComponent } from './myTractors.component';
import { CampoControlErrorModule } from '../../components/campo-control-error/campo-control-error.module';
import { TractorCardModule } from '../../components/tractor-card/tractor-card.module';
import { TractorNotFoundModule } from '../../components/tractor-not-found/tractor-not-found.module';
import { LoadingSpinnerModule } from '../../components/loading-spinner/loading-spinner.module';

@NgModule({
  declarations: [
    MyTractorsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CampoControlErrorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    TractorCardModule,
    TractorNotFoundModule,
    LoadingSpinnerModule
  ],
})
export class MyTractorsModule { }
