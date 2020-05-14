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

    const newSportObject = new SportObject(
      this.objectForm.get('basicForm').get('objectName').value,
      this.objectForm.get('basicForm').get('sportName').value,
      this.objectForm.get('basicForm').get('phoneNumber').value,
      this.objectForm.get('addressForm').get('address').value,
      this.objectForm.get('addressForm').get('latitude').value,
      this.objectForm.get('addressForm').get('longitude').value,
      this.objectForm.get('furtherForm').get('images').value,
      this.objectForm.get('furtherForm').get('objectDescription').value
    );
    console.log(newSportObject);
    this.userService.createObject(newSportObject).subscribe((response: any) => {
      console.log('Response: ' + response);
      console.log(response);
      this.loading = false;
    }, (error: any) => {
      console.log('Error during creating the object. Error:');
      console.log(error);
      this.loading = false;
    });
  }
}
