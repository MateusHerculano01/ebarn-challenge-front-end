import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ModalAlertComponent } from '../../components/modal-alert/modal-alert.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(
    private _dialog: MatDialog,
    private _formBuilder: UntypedFormBuilder,
    private _authService: AuthService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

    this.form = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }

  public checkInvalidField(field: string) {
    let fieldElement = this.form.controls[field];
    if (fieldElement.errors) {
      return fieldElement.errors[field] && fieldElement.touched;
    }
  }

  public openDialog(title: string, content: string): void {
    this._dialog.open(ModalAlertComponent, {
      data: {
        title,
        content,
        hideCancel: true
      },
      width: '100vw',
    });
  }

  public onSubmit() {
    const { email, password } = this.form.value;
    this._authService.auth({ email, password }).subscribe(res => {
      console.log(res)
      this.openSnackBar('Login realizado com sucesso, você será redirecinado a home', 'OK')
    }, err => {
      console.log(err)
      this.openDialog('Falha ao logar', 'Verifique as suas informações e tente novamente!')
    })
  }

}
