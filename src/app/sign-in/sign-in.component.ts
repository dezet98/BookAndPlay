import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.signInForm.value);
    this.loading = true;

    this.auth.signIn(this.signInForm.value)
      .subscribe((response: any) => {
        this.router.navigate(['']);
        alert('Login was successful');  // to extend
      },
        err => {
          alert('Failed to login: '  + err.error.title ); // to extend
          console.log('Status: ' + err.status + ' Title: ' + err.error.title);
          this.loading = false;
        });
  }
}
