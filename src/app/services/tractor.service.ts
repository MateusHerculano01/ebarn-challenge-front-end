import { Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TractorInterface } from '../interfaces/DTO/tractor-interface';

@Injectable({
  providedIn: 'root'
})

export class TractorService {
  private baseUrl = environment.serverNode;

  constructor(
    private _http: HttpClient
  ) { }

  public listAllTractors(modelName: string): Observable<TractorInterface[]> {
    return this._http.get<TractorInterface[]>(`${this.baseUrl}/tractors/?modelName=${modelName}`).pipe(
      catchError(err => throwError(err))
    );
  }

  public listMyTractors(modelName: string): Observable<TractorInterface[]> {
    return this._http.get<TractorInterface[]>(`${this.baseUrl}/tractors/my-tractors?modelName=${modelName}`).pipe(
      catchError(err => throwError(err))
    );
  }

  public create(formData: any): Observable<any> {

    return this._http.post<TractorInterface>(`${this.baseUrl}/tractors/new`, formData).pipe(
      catchError(err => throwError(err))
    );
  }

  public delete(tractorId: string | number): Observable<{ delete: boolean }> {
    return this._http.delete<{ delete: boolean }>(`${this.baseUrl}/tractors/delete/${tractorId}`).pipe(
      catchError(err => throwError(err))
    );
  }

  public update(tractorId: string | number, formData: any): Observable<TractorInterface> {
    return this._http.patch<TractorInterface>(`${this.baseUrl}/tractors/update/${tractorId}`, formData).pipe(
      catchError(err => throwError(err))
    );
  }
}
