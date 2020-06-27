import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: any = [];
  userColumns = ['userId', 'name', 'surname', 'email', 'phoneNumber'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private adminService: AdminService) {
    this.getUsers();
   }

  ngOnInit(): void {
  }

  getUsers() {
    this.adminService.getUsers().subscribe( (users: Array<any>) => {
      this.users = new MatTableDataSource(users);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }
}
