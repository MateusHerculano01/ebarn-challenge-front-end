import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';

import { TractorService } from '../../services/tractor.service';
import { TractorInterface } from '../../interfaces/DTO/tractor-interface';
import { UserInterface } from 'src/app/interfaces/DTO/user-interface';
import { StorageService } from 'src/app/services/storage.service';
import { ModalTractorComponent } from 'src/app/components/modal-tractor/modal-tractor.component';
import { ModalAlertComponent } from 'src/app/components/modal-alert/modal-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private isLoading = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<UserInterface>({});
  tractors = new BehaviorSubject<TractorInterface[]>([]);
  search = new BehaviorSubject<string>('');
  searchControl = new UntypedFormControl();

  constructor(
    private _tractorService: TractorService,
    private _changeDetector: ChangeDetectorRef,
    private _storageService: StorageService,
    private _dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  loadTractors(modelName: string): void {
    this.setIsLoading(true);
    this.setTractors([]);
    this._tractorService.listAllTractors(modelName).subscribe(res => {
      this.setTractors(res)

    },
      err => { },
      () => this.setIsLoading(false));
  }

  ngOnInit(): void {
    this.loadTractors('');
    this.initializeSearchTractorsDebounce();
    this.setUser(this._storageService.getStorage('user'));
  }

  tractorNotFound(): boolean {
    return this.tractors.value.length === 0
  }

  setTractors(value: TractorInterface[]): void {
    this.tractors.next(value);
    this._changeDetector.detectChanges();
  }

  setIsLoading(value: boolean): void {
    this.isLoading.next(value);
    this._changeDetector.detectChanges();
  }

  setUser(value: UserInterface): void {
    this.user.next(value);
    this._changeDetector.detectChanges();
  }

  initializeSearchTractorsDebounce() {
    this.searchControl.valueChanges.subscribe((modelName: string) => {
      this.search.next(modelName);
    });
    this.search
      .pipe(debounceTime(700))
      .subscribe(
        (modelName) => {
          this.loadTractors(modelName)
        }
      )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }


  handleDeleteTractor(tractor: TractorInterface) {
    this._dialog.open(ModalAlertComponent, {
      data: {
        title: 'Atenção, ação irreversível!',
        content: `Você tem certeza que deseja deletar o trator ${tractor.manufacturer} ${tractor.modelName}?`,
        hideCancel: false
      },
      width: '100vw',
    }).afterClosed()
      .subscribe((confirmation: boolean) => {
        if (confirmation) {
          this._tractorService.delete(tractor._id).subscribe((success) => {
            let tractors = this.tractors.value;
            let filteredTractors = tractors.filter(tractorFilter => tractorFilter._id !== tractor._id);
            this.setTractors(filteredTractors);
            this.openSnackBar('Trator apagado com sucesso', 'OK');
          }, (error) => {
            this.openSnackBar('Falha ao apagar trator', 'ERRO');
          })
        }
      });
  }

  handleEditTractor(tractor: TractorInterface) {
    let dialogRef = this._dialog.open(ModalTractorComponent, {
      data: tractor,
      width: '100vw',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTractors(this.search.value);
    });
  }

  get user$(): Observable<UserInterface> {
    return this.user.asObservable().pipe(shareReplay());
  }

  get tractors$(): Observable<TractorInterface[]> {
    return this.tractors.asObservable().pipe(shareReplay());
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable().pipe(shareReplay());
  }
}
