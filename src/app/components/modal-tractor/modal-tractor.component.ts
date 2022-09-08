import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TractorInterface } from '../../interfaces/DTO/tractor-interface';
import { TractorService } from '../../services/tractor.service';
import { ModalAlertComponent } from '../modal-alert/modal-alert.component';

@Component({
  selector: 'app-modal-tractor',
  templateUrl: './modal-tractor.component.html',
  styleUrls: ['./modal-tractor.component.scss']
})
export class ModalTractorComponent implements OnInit {

  tractorForm!: FormGroup;
  imagePreview!: string;
  imageSelected!: File;

  constructor(
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _tractorService: TractorService,
    public _dialogRef: MatDialogRef<ModalTractorComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TractorInterface
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.tractorForm = this._formBuilder.group({
      manufacturer: [null, [Validators.required]],
      modelName: [null, [Validators.required]],
      power: [null, [Validators.required]],
      year: [null, [Validators.required]],
      photo: [null],
    });

    if (this.data) {
      this.tractorForm.patchValue(this.data);
      this.imagePreview = this.data.photoUrl as string;
      this.tractorForm.patchValue({
        fileSource: this.data.photoUrl
      });
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      if (file) {
        this.imageSelected = file;
      }

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.tractorForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000
    });
  }

  openDialog(title: string, content: string): void {
    this._dialog.open(ModalAlertComponent, {
      data: {
        title,
        content,
        hideCancel: true
      },
      width: '100vw',
    });
  }

  verifyError(err: any) {
    if (err.error.message.includes('duplicate key error')) {
      return this.openDialog('Modelos duplicados', 'Você já tem um modelo de trator igual a este cadastrado.')
    }
  }

  onSubmit() {

    const { manufacturer, modelName, power, year } = this.tractorForm.value

    if (this.tractorForm.valid) {
      const formData = new FormData();

      formData.append('manufacturer', manufacturer);
      formData.append('modelName', modelName);
      formData.append('power', power);
      formData.append('year', year);
      formData.append('photo', this.imageSelected);

      if (this.data && this.data._id) {
        this._tractorService.update(this.data._id, formData).subscribe(res => {
          this._dialogRef.close();
          this.openSnackBar('Trator atualizado com sucesso', 'OK');
          console.log(res)
        }, (err: HttpErrorResponse) => {
          this.verifyError(err);
          this.openSnackBar('Falha ao atualizar trator', 'ERROR')
        })
      } else {
        this._tractorService.create(formData).subscribe(res => {
          this._dialogRef.close();
          this.openSnackBar('Trator cadastrado com sucesso', 'OK');
          console.log(res)
        }, (err: HttpErrorResponse) => {
          this.verifyError(err);
          this.openSnackBar('Falha ao cadastrar trator', 'ERROR');

        })
      }
    }
  }

  checkInvalidField(field: string) {
    let fieldElement = this.tractorForm.controls[field];
    if (fieldElement.errors) {
      return fieldElement.errors[field] && fieldElement.touched;
    }
  }

}
