import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { CampoControlErrorModule } from '../campo-control-error/campo-control-error.module';
import { TractorCardComponent } from './tractor-card.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    TractorCardComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatCardModule,
    CampoControlErrorModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  exports: [
    TractorCardComponent
  ]
})
export class TractorCardModule { }
