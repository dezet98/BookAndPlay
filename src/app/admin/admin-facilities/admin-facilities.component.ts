import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SportFacilityService } from 'src/app/_services/sport-facility.service';

@Component({
  selector: 'app-admin-facilities',
  templateUrl: './admin-facilities.component.html',
  styleUrls: ['./admin-facilities.component.scss']
})
export class AdminFacilitiesComponent implements OnInit {
  facilities: any;
  facilitiesColumns = ['facilityId', 'name', 'owner', 'sport', 'city', 'description', 'address'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private adminService: AdminService, private facilityService: SportFacilityService) { }

  ngOnInit(): void {
    this.getFacilities();
  }

  getFacilities() {
    this.adminService.getFacilities().subscribe( (facilities: Array<any>) => {
      this.facilities = new MatTableDataSource(facilities);
      this.facilities.paginator = this.paginator;
      this.facilities.sort = this.sort;
      console.log(facilities);
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.facilities.filter = filterValue.trim().toLowerCase();

    if (this.facilities.paginator) {
      this.facilities.paginator.firstPage();
    }
  }
}
