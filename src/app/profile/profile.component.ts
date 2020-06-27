import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_auth/auth.service';
import { GeneralService } from '../_services/general.service';
import { User } from '../_models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  personalData = [
    { name: 'name', realValue: '', isOpen: false, loading: false },
    { name: 'surname', realValue: '', isOpen: false, loading: false },
    { name: 'email', realValue: '', isOpen: false, loading: false },
    { name: 'phoneNumber', realValue: '', isOpen: false, loading: false }
  ];

  accountSettings = [
    { oldPassword: '', newPassword: '', hideOldPassword: true, hideNewPassword: true, loading: false },
    { password: '', hidePassword: true, loading: false }
  ];

  constructor(private userService: UserService, private generalService: GeneralService, private auth: AuthService) { }

  ngOnInit(): void {
    this.setPersonalData();
  }

  setPersonalData() {
    this.userService.getPersonalData().subscribe((user: User) => {
      for (const item of this.personalData) {
        item.realValue = user.getPersonalData()[item.name];
      }
    });
  }

  changePersonalData(item: any, newValue: string) {
    item.loading = true;
    this.userService.setPersonalData(item.name, newValue).subscribe((user) => {
      item.realValue = user[item.name];
      this.generalService.showSnackbar(`You change name on ${user[item.name]}`, 'Close');
      item.loading = false;
    }, () => {
      this.generalService.showSnackbar(`Error when changing ${item.name}`, 'Close');
      item.loading = false;
    });
  }

  changeUserPassword(oldPassword: string, newPassword: string) {
    this.accountSettings[0].loading = true;
    this.userService.changePassword(oldPassword, newPassword).subscribe(() => {
      this.generalService.showSnackbar('You change password correctly', 'Close');
      this.accountSettings[0].loading = false;
    }, () => {
      this.generalService.showSnackbar('Error when changing password', 'Close');
      this.accountSettings[0].loading = false;
    });
  }

  deleteUserAccount(password: string) {
    this.accountSettings[0].loading = true;
    this.userService.deleteAccount(password).subscribe(() => {
      this.generalService.showSnackbar('Account was deleted', 'Close');
    }, () => {
      this.generalService.showSnackbar('Error when deleting account', 'Close');
      this.accountSettings[0].loading = false;
    });
  }
}
