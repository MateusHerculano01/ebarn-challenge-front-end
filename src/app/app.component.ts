import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { SwPush } from "@angular/service-worker";
import { StorageService } from './services/storage.service';
import { PushSubscriptionService } from './services/pushSubscription.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private isUserAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _storageService: StorageService,
    private _pushSubscriptionService: PushSubscriptionService,
    private _swPush: SwPush
  ) {
  }

  ngOnInit(): void {
    this.setIsUserAuthenticated(!!this._storageService.getStorage('token'))
    this.requestSubscription();
  }

  requestSubscription = () => {
    if (!this._swPush.isEnabled) {
      console.log("Sem permissão para receber notificações!");
      return;
    }

    if (this.isUserAuthenticated.value) {
      this._swPush.requestSubscription({
        serverPublicKey: 'BL1b4q9TfAZLnvMMZlIuZNRfqN6x-Gcvjnbc_WkujAsCnmctsQ2gZvp7LjAYiEmoBUiK-BMkujLOpf7lTrrCJys'
      }).then((subscription: any) => {
        this._pushSubscriptionService.store(JSON.parse(JSON.stringify(subscription))).subscribe(res => console.log(res));
      }).catch((err: any) => console.log(err));
    }
  };
  setIsUserAuthenticated(value: boolean): void {
    this.isUserAuthenticated.next(value);
    this._changeDetector.detectChanges();
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.isUserAuthenticated.asObservable().pipe(shareReplay());
  }


}
