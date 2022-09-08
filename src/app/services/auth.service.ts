import { Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserInterface } from '../interfaces/DTO/user-interface';
import { StorageService } from './storage.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = environment.serverNode;

  constructor(
    private _http: HttpClient,
    private storageService: StorageService,
    private _router: Router
  ) { }

  public auth({ email, password }: Partial<UserInterface>): Observable<any> {
    return this._http.post<{ response: UserInterface; token: string; }>(`${this.baseUrl}/sessions`, { email, password }).pipe(
      catchError(err => throwError(err)),
      tap(data => this.storageService.setStorage('user', data.response)),
      tap(data => this.storageService.setStorage('token', data.token)),
      tap(data => this._router.navigate(['/'])),
      tap(data => window.location.reload()));
  }
}
