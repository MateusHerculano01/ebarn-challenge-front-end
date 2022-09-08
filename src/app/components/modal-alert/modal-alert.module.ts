import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ModalAlertComponent } from '../modal-alert/modal-alert.component';

@NgModule({
  declarations: [
    ModalAlertComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    ModalAlertComponent
  ]
})
export class ModalAlertModule { }
