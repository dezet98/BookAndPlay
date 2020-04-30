import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../_auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  navLinks = [
    { label: 'Sports facilities', path: '/sportsFacilities' },
    { label: 'Your objects', path: '/yourObjects' },
    { label: 'Add object', path: '/addObject' },
    { label: 'Reservations', path: '/reservations' },
  ];
  adminLink = { label: 'Admin', path: '/admin' };
  loggingLinks: any;

  isLoggedIn: boolean;
  isAdmin: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getIsLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
        this.loggingLinks = [{ label: 'Sign Out', path: '/signOut' }];
      }
      else {
        this.isLoggedIn = false;
        this.loggingLinks = [{ label: 'Sign In', path: '/signIn' }, { label: 'Sign Up', path: '/signUp' }];
      }
    });

    this.auth.isAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  signOut() {
    this.auth.logout();
  }
}
