import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { GeneralService } from '../_services/general.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(private fb: FormBuilder, private userService: UserService, private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['']
    });
  }

  onSubmit() {
    this.loading = true;

    const form = this.signUpForm.value;
    this.userService.signUp(new User(form.name, form.surname, form.email, form.password, form.phoneNumber))
      .subscribe((response: any) => {
        this.router.navigate(['signIn']);
        this.generalService.showSnackbar('Register was succesful. You can now sign in', 'Close');
      },
        error => {
          this.generalService.showSnackbar('Failed to register.', 'Close');
          console.log('Error:');
          console.log(error);
          this.loading = false;
        });
  }
}

