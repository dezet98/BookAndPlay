import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../_auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  navLinks = [
    { label: 'Sports facilities', path: '/sportsFacilities' },
    { label: 'Your objects', path: '/yourObjects' },
    { label: 'Reservations', path: '/reservations' },
  ];
  adminLink = { label: 'Admin', path: '/admin' };
  isLoggedIn: boolean;
  loggingLinks: any;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) {
    auth.getIsLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
        this.loggingLinks = [{ label: 'Sign Out', path: '/signOut' }];
      }
      else {
        this.isLoggedIn = false;
        this.loggingLinks = [{ label: 'Sign In', path: '/signIn' }, { label: 'Sign Up', path: '/signUp' }];
      }
    });
  }

  isAdmin() {
    return this.auth.isAdmin();
    /*
    this.auth.isAdmin().subscribe( (isAdmin: boolean) => {
      return isAdmin;
    });
    */
  }

  signOut() {
    this.auth.logout();
  }
}
