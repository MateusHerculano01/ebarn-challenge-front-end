import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ModalAlertComponent } from '../../components/modal-alert/modal-alert.component';
import { RegisterService } from '../../services/register.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _registerService: RegisterService,
    private _authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
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
    }).afterClosed().subscribe((confirmation: boolean) => {
      if (confirmation) {
        const { email, password } = this.form.value;
        this._authService.auth({ email, password }).subscribe(
          res => console.log(res),
          err => this.openDialog('Falha ao logar', 'Verifique as suas informações e tente novamente!')
        )
      }
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const { name, email, password } = this.form.value;
      this._registerService.createNewUser({ name, email, password }).subscribe(res => {
        this.openDialog('Seu usuário foi cadastro com sucesso', 'Você será redirecionado como um usuário logado!')
        console.log(res)
      }, err => {
        console.log(err)
        this.openDialog('Falha ao cadastrar usuário', 'Verifique as informações fornecidas e tente novamente!')
      })
    }
  }

}
