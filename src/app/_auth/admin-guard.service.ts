import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(public auth: AuthService) { }

  // if user(without admin right) want to go at admin page by using url he will logout
  canActivate(): boolean {
    if (!this.auth.isAdmin()) {
      this.auth.logout();
      return false;
    }

    return true;
  }
}
