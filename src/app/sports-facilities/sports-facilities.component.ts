import { Component, OnInit } from '@angular/core';
import { SportFacility } from '../_models/sportFacility';
import { SportFacilityService } from '../_services/sport-facility.service';


@Component({
  selector: 'app-sports-facilities',
  templateUrl: './sports-facilities.component.html',
  styleUrls: ['./sports-facilities.component.scss']
})
export class SportsFacilitiesComponent implements OnInit {
  facilities: Array<SportFacility> = [];

  constructor(private facilityService: SportFacilityService) { }

  ngOnInit() {
    this.facilityService.getAllFacilities().subscribe((facilities: Array<SportFacility>) => {
      this.facilities = facilities;
    }, error => {
      console.log('Error when load default facilities. Error:');
      console.log(error);
    });
  }

  changeFacilities(facilities: Array<SportFacility>) {
    this.facilities = facilities;
  }
}

