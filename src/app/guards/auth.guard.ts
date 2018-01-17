import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) {

    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isTokenExpired()) {
      console.log(this.authService.isTokenExpired());
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
