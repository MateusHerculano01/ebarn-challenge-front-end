import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '../services/storage.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private _storageService: StorageService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._storageService.getStorage('token')}`
      }
    });
    return next.handle(request);
  }
}
