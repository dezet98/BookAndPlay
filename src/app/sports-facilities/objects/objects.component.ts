import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnInit {

  objects = [1, 2, 3, 4, 5, 6, 7];

  constructor() { }

  ngOnInit(): void {
  }

  showObject(id: number) {
    alert('Object number ' + id);
  }
}
