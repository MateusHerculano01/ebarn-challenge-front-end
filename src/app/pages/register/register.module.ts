import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { CampoControlErrorModule } from '../../components/campo-control-error/campo-control-error.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent,
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
    CampoControlErrorModule,
    MatButtonModule
  ],
})
export class RegisterModule { }
