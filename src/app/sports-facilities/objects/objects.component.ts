import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { SportFacility } from 'src/app/_models/sportFacility';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnChanges, OnInit {
  @Input() facilities: Array<SportFacility>;
  visibleFacilities: Array<SportFacility>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor() { }

  // displaying facilities depend on page
  pageChanged(): void {
    const first = this.paginator.pageSize * this.paginator.pageIndex;
    const last = first + this.paginator.pageSize - 1; // -1 because first start with 0

    this.visibleFacilities = this.facilities.slice(first, last + 1);
  }

  ngOnInit() {
    this.paginator.pageSizeOptions = [8, 16, 32];
  }

  ngOnChanges() {
    this.paginator.length = this.facilities.length;
    this.paginator.firstPage();
    this.pageChanged();
  }
}
