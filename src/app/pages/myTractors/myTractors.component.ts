import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ModalTractorComponent } from '../../components/modal-tractor/modal-tractor.component';
import { ModalAlertComponent } from '../../components/modal-alert/modal-alert.component';
import { TractorService } from '../../services/tractor.service';
import { TractorInterface } from '../../interfaces/DTO/tractor-interface';

@Component({
  selector: 'app-my-tractors',
  templateUrl: './myTractors.component.html',
  styleUrls: ['./myTractors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTractorsComponent implements OnInit {
  private isLoading = new BehaviorSubject<boolean>(false);
  tractors = new BehaviorSubject<TractorInterface[]>([]);
  search = new BehaviorSubject<string>('');
  searchControl = new UntypedFormControl();


  constructor(
    private _tractorService: TractorService,
    private _changeDetector: ChangeDetectorRef,
    private _dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  loadTractors(modelName: string): void {
    this.setIsLoading(true);
    this.setTractors([]);
    this._tractorService.listMyTractors(modelName).subscribe(res => {
      this.setTractors(res)

    },
      err => { },
      () => this.setIsLoading(false));
  }

  ngOnInit(): void {
    this.loadTractors('');
    this.initializeSearchTractorsDebounce();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
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

  handleRegisterTractor() {
    let dialogRef = this._dialog.open(ModalTractorComponent, {
      width: '100vw',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadTractors(this.search.value);
    });
  }

  get tractors$(): Observable<TractorInterface[]> {
    return this.tractors.asObservable().pipe(shareReplay());
  }

  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable().pipe(shareReplay());
  }
}
