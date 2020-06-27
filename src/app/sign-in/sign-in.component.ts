import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_auth/auth.service';
import { Router } from '@angular/router';
import { GeneralService } from '../_services/general.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;

    this.auth.signIn(this.signInForm.get('email').value, this.signInForm.get('password').value)
      .subscribe(() => {
        this.router.navigate(['']);
        this.generalService.showSnackbar('Login was successful', 'Close');
      }, () => {
        this.generalService.showSnackbar('Failed to login', 'Close');
        this.loading = false;
      });
  }
}
