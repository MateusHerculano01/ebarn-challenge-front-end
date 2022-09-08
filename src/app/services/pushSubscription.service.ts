import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { PushSubscriptionInterface } from '../interfaces/DTO/push-subscription-interface';

@Injectable({
  providedIn: 'root'
})

export class PushSubscriptionService {
  private baseUrl = environment.serverNode;

  constructor(
    private _http: HttpClient,
  ) { }

  public store(subscription: Partial<PushSubscriptionInterface>): Observable<any> {
    return this._http.post<PushSubscriptionInterface>(`${this.baseUrl}/push-subscription/new`, subscription).pipe(
      catchError(err => throwError(err)));
  }
}
