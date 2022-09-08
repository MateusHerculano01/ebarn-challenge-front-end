import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class PreAuthGuard implements CanActivate, CanLoad {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAccess();
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAccess();
  }

  private checkAccess() {
    if (!!this.storageService.getStorage('token')) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
