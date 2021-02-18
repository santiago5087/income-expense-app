import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate() {
    return this.authService.isLoggedIn();
  }

  canLoad() {
    return this.authService.isLoggedIn().pipe(take(1));
  }

}
