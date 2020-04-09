import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, public router: Router) { }

  // if user is logged in we navigate him to home page if he want to go at signIn or signUp pages by using url
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
