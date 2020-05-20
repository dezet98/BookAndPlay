import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FacilityService } from '../_services/facility.service';
import { AccessPeriodService } from '../_services/access-period.service';
import { AccessPeriod } from '../_models/accessPeriod';

@Component({
  selector: 'app-your-objects',
  templateUrl: './your-objects.component.html',
  styleUrls: ['./your-objects.component.scss']
})
export class YourObjectsComponent implements OnInit {
  form: FormGroup;
  facilities = [];

  constructor(private facilityService: FacilityService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      facility: ['']
    });

    this.setSelectOptions();
  }

  setSelectOptions() {
    this.facilityService.getOwnObjects().subscribe((facilities) => {
      this.facilities = facilities;
      if (facilities.length !== 0) {
        this.form.get('facility').setValue(this.facilities[0]);
      }
    }, error => {
      console.log('Error when loading user sport facilities. Error:');
      console.log(error);
    });
  }
}

    /*this.accessPeriodService.addAccessPeriods(new AccessPeriod(1, 1, 1, 1, 2, 6)).subscribe((res) => { console.log(res) },
      (error) => console.log(error));*/
