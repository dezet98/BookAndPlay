import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  personalDataForm: FormGroup;
  personalData: any;
  panelIsOpen = [false, false, false, false];  // name, surname, email, phoneNumber

  accountSettingsForm: FormGroup;
  hidePassword = true;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.personalDataForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      phoneNumber: [''],
    });

    this.accountSettingsForm = this.fb.group({
      oldPassword: [''],
      newPassword: [''],
      password: ['']
    });

    this.getUserPersonalData();
  }

  getUserPersonalData() {
    this.userService.getPersonalData().subscribe((response: any) => {
      this.personalData = response;
      this.personalDataForm.get('name').setValue(response.name);
      this.personalDataForm.get('surname').setValue(response.surname);
      this.personalDataForm.get('email').setValue(response.email);
      this.personalDataForm.get('phoneNumber').setValue(response.phoneNumber);
    }, error => {
      console.log('Error when load user data. Error: ');
      console.log(error);
    });
  }

  changeUserName() {
    this.userService.setPersonalData({ Name: this.personalDataForm.get('name').value }).subscribe(() => {
      this.getUserPersonalData();
      console.log('hej');
    });
  }

  changeUserSurname() {
    this.userService.setPersonalData({ Surname: this.personalDataForm.get('surname').value }).subscribe((response: any) => {
      if (response) {
        this.getUserPersonalData();
      }
    });
  }

  changeUserEmail() {
    this.userService.setPersonalData({ Email: this.personalDataForm.get('email').value }).subscribe((response: any) => {
      this.getUserPersonalData();
    });
  }

  changeUserPhoneNumber() {
    this.userService.setPersonalData({ PhoneNumber: this.personalDataForm.get('phoneNumber').value }).subscribe((response: any) => {
      this.getUserPersonalData();
    });
  }

  changeUserPassword() {
    console.log('change password');
  }

  deleteUserAccount() {
    this.userService.deleteAccount().subscribe((error: any) => {
      console.log('Error when deleting user account. Status: ' + error.status);
    });
  }
}
