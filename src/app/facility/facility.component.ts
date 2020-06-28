import { Component, OnInit } from '@angular/core';
import { SportFacility } from '../_models/sportFacility';
import { ActivatedRoute } from '@angular/router';
import { SportFacilityService } from '../_services/sport-facility.service';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {
  facilityId: number;
  facility: SportFacility;

  constructor(private route: ActivatedRoute, private facilityService: SportFacilityService) { }

  ngOnInit(): void {
    this.facilityId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getFacility();
  }

  getFacility() {
    this.facilityService.getFacility(this.facilityId).subscribe((facility: SportFacility) => this.facility = facility);
  }
}
