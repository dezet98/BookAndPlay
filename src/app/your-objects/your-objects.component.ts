import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SportFacilityService } from '../_services/sport-facility.service';
import { SportFacility } from '../_models/sportFacility';

@Component({
  selector: 'app-your-objects',
  templateUrl: './your-objects.component.html',
  styleUrls: ['./your-objects.component.scss']
})
export class YourObjectsComponent implements OnInit {
  form: FormGroup;
  facilities: Array<SportFacility> = [];

  constructor(private facilityService: SportFacilityService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      facility: ['']
    });

    this.setSelectOptions();
  }

  setSelectOptions() {
    this.facilityService.getOwnSportFacilites().subscribe((facilities: Array<SportFacility>) => {
      console.log(facilities);
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
