import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampoControlErrorComponent } from '../campo-control-error/campo-control-error.component';

@NgModule({
  declarations: [
    CampoControlErrorComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CampoControlErrorComponent
  ]
})
export class CampoControlErrorModule { }
