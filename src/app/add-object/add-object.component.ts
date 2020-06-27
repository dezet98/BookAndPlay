import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SportFacilityService } from '../_services/sport-facility.service';
import { ImagesService } from '../_services/images.service';
import { GeneralService } from '../_services/general.service';


@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.scss']
})
export class AddObjectComponent implements OnInit {
  objectForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private facilityService: SportFacilityService,
    private imagesService: ImagesService,
    private generalService: GeneralService) { }

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
        images: [''],
        objectDescription: ['']
      })
    });
  }

  onCreateObject() {
    this.loading = true;

    this.facilityService.createSportFacility(
      this.objectForm.get('basicForm').get('objectName').value,
      this.objectForm.get('basicForm').get('sportName').value,
      this.objectForm.get('basicForm').get('phoneNumber').value,
      this.objectForm.get('addressForm').get('address').value,
      this.objectForm.get('addressForm').get('latitude').value,
      this.objectForm.get('addressForm').get('longitude').value,
      this.objectForm.get('furtherForm').get('objectDescription').value
    ).subscribe((facilityId: number) => {
      this.imagesService.uploadFacilityImages(this.objectForm.get('furtherForm').get('images').value, facilityId).subscribe((res) => {
        this.generalService.showSnackbar('You create object!', 'Close');
        this.loading = false;
      }, () => {
        this.generalService.showSnackbar('Object was create but error with upload images!', 'Close');
        this.loading = false;
      });
    }, () => {
      this.generalService.showSnackbar('Error when create object!', 'Close');
      this.loading = false;
    });
  }

}
