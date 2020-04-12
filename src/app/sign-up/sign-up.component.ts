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

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      phoneNumber: ['']
    });
  }

  onSubmit() {
    this.loading = true;

    const form = this.signUpForm.value;
    this.userService.SignUp(new User(form.name, form.surname, form.email, form.password, form.phoneNumber))
      .subscribe((response: any) => {
        this.router.navigate(['SignIn']);
        alert('Register was successful: ' + JSON.stringify(response));  // to extend
      },
        err => {
          alert('Failed to register: ' + err.error.title); // to extend
          console.log('Status: ' + err.status + ' Title: ' + err.error.title);
          this.loading = false;
        });
  }
}

