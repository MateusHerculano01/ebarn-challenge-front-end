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

import { CampoControlErrorModule } from '../campo-control-error/campo-control-error.module';
import { ModalTractorComponent } from './modal-tractor.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ModalTractorComponent,
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
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    ModalTractorComponent
  ]
})
export class ModalTractorModule { }
