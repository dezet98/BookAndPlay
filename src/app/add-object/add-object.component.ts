import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { SportObject } from '../_models/sportObject';

@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.scss']
})
export class AddObjectComponent implements OnInit {
  objectForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.objectForm = this.fb.group({
      basicForm: this.fb.group({
        objectName: ['', Validators.required],
        sportName: ['', Validators.required],
        phoneNumber: ['', Validators.required]
      }),
      addressForm: this.fb.group({
        address: ['', Validators.required],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required]
      }),
      furtherForm: this.fb.group({
        images: [[]],
        objectDescription: ['']
      })
    });
  }

  onCreateObject() {
    this.loading = true;
    console.log('CreateObject');

    const form = this.objectForm.value;
    const newSportObject = new SportObject(
      form.objectName,
      form.sportName,
      form.phoneNumber,
      form.address,
      form.latitude,
      form.longitude,
      form.images,
      form.objectDescription
    );

    this.userService.createObject(newSportObject).subscribe((response: any) => {
      console.log('Response: ' + response);
    }, (error: any) => {
      console.log('Error during creating the object. Status: ' + error.status);
    });
    this.loading = false;
  }
}
