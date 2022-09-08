import { Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserInterface } from '../interfaces/DTO/user-interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  private baseUrl = environment.serverNode;

  constructor(
    private _http: HttpClient
  ) { }

  public createNewUser({ name, email, password }: Partial<UserInterface>): Observable<any> {
    return this._http.post<{ response: UserInterface; token: string; }>(`${this.baseUrl}/users/new`, { name, email, password }).pipe(
      catchError(err => throwError(err))
    )
  }
}
