import { Component, OnInit } from '@angular/core';
import { Config as con } from '../../config';
@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.scss']
})
export class AddObjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('api: ' + con.API_KEY);
  }
}
