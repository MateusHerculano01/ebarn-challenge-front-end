import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!!this.storageService.getStorage('token')) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
