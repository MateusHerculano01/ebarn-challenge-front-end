import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { StorageService } from '../../services/storage.service';
import { ModalAlertComponent } from '../modal-alert/modal-alert.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showMenu: boolean | null = false;

  constructor(
    private _dialog: MatDialog,
    private _storageService: StorageService,
    private _router: Router,
  ) { }

  ngOnInit(): void { }

  handleLogout(): void {
    const dialogRef = this._dialog.open(ModalAlertComponent, {
      data: {
        title: 'Atenção!',
        content: 'Tem certeza que deseja sair da sua conta?',
      },
      width: '100vw',
    });
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {

        this._storageService.clearStorage('token');
        this._storageService.clearStorage('user');
        window.location.reload();
        this._router.navigate(['/login'])
      }
    });
  }

}
