import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

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
        this.userService.showSnackbar('Register was succesful. You can now sign in', 'Close');
      },
        error => {
          this.userService.showSnackbar('Failed to register.', 'Close');
          console.log('Error:');
          console.log(error);
          this.loading = false;
        });
  }
}

