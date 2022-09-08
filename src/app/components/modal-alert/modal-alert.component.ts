import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalAlertInterface } from '../../interfaces/modal-alert-interface';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalAlertComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalAlertInterface
  ) { }
}
