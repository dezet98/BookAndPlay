import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../_auth/auth.service';
import { UserService } from '../_services/user.service';
import { ScreenSizeService } from '../_shared/screen-size.service';

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
  loggedOutLinks = [{ label: 'Sign In', path: '/signIn' }, { label: 'Sign Up', path: '/signUp' }];
  loggedInLinks = [{ label: 'Profile', path: '/profile' }, { label: 'Sign Out', path: '/' }];

  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;

  isHandset: boolean;

  constructor(private screenSizeService: ScreenSizeService, private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.auth.getIsLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.getUserName();
      }
    });

    this.auth.isAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });

    this.setHandset();
  }

  getUserName() {
    this.userService.getName().subscribe((name: string) =>
      this.userName = name);
  }

  signOut() {
    this.auth.logout();
  }

  setHandset() {
    this.screenSizeService.lessThanMd().subscribe((result: boolean) => {
      this.isHandset = result;
    });
  }
}
