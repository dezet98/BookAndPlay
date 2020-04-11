import { Component } from '@angular/core';
import { AuthService } from './_auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookAndPlay';
  isLoggedIn: boolean;

  constructor(private auth: AuthService) {
    auth.getIsLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
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
