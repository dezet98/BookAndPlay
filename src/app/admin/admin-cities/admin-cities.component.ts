import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-cities',
  templateUrl: './admin-cities.component.html',
  styleUrls: ['./admin-cities.component.scss']
})
export class AdminCitiesComponent implements OnInit {
  cities: any;
  citiesColumns = ['cityId', 'name'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.adminService.getCities().subscribe( (cities: Array<any>) => {
      this.cities = new MatTableDataSource(cities);
      this.cities.paginator = this.paginator;
      this.cities.sort = this.sort;
      console.log(cities);
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cities.filter = filterValue.trim().toLowerCase();

    if (this.cities.paginator) {
      this.cities.paginator.firstPage();
    }
  }
}
