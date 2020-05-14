import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;

    this.auth.signIn(this.signInForm.value)
      .subscribe((response: any) => {
        this.router.navigate(['']);
        this.userService.showSnackbar('Login was successful', 'Close');
      },
        error => {
          this.userService.showSnackbar('Failed to login', 'Close');
          console.log('Error:');
          console.log(error);
          this.loading = false;
        });
  }
}
