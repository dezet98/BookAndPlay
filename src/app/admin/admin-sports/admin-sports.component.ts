import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-sports',
  templateUrl: './admin-sports.component.html',
  styleUrls: ['./admin-sports.component.scss']
})
export class AdminSportsComponent implements OnInit {
  sports: any;
  sportsColumns = ['sportId', 'name', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private adminService: AdminService) {
    this.getSports();
   }

  ngOnInit(): void {
  }

  getSports() {
    this.adminService.getSports().subscribe( (sports: Array<any>) => {
      this.sports = new MatTableDataSource(sports);
      this.sports.paginator = this.paginator;
      this.sports.sort = this.sort;
      console.log(sports);
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sports.filter = filterValue.trim().toLowerCase();

    if (this.sports.paginator) {
      this.sports.paginator.firstPage();
    }
  }

  deleteSport() {
    console.log('delete');
  }
}
