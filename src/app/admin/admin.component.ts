import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  allUsers: Array<User>;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }


  getAllUsers() {
    this.adminService.getUsers().subscribe( (allUsers: Array<User>) => {
      this.allUsers = allUsers;
      console.log(allUsers);
      console.log(this.allUsers);
    });
  }
}
