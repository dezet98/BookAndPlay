import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnInit {

  objects = [1, 2, 3, 4, 5, 6, 7];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toObject(id: number) {
    this.router.navigate(['/facility/' + id]);
  }
}
