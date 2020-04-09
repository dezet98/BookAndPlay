import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

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
      email: ['', Validators.required],
      username: [''],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.signUpForm.value);  // for test
    this.loading = true;
    this.userService.SignUp(this.signUpForm.value)
      .subscribe((response: any) => {
        this.router.navigate(['SignIn']);
        alert('Register was successful');  // to extend
      },
        error => {
          alert('Failed to register'); // to extend
          this.loading = false;
        });
  }
}

