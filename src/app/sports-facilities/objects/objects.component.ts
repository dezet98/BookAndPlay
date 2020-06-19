import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SportFacility } from 'src/app/_models/sportFacility';
import { MatPaginator } from '@angular/material/paginator';
import { ImagesService } from 'src/app/_services/images.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnChanges, OnInit {
  @Input() facilities: Array<SportFacility>;
  visibleFacilities: Array<SportFacility>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private router: Router) { }

  // displaying facilities depend on page
  pageChanged() {
    const first = this.paginator.pageSize * this.paginator.pageIndex;
    const last = first + this.paginator.pageSize - 1; // -1 because first start with 0

    this.visibleFacilities = this.facilities.slice(first, last + 1);
  }

  ngOnInit(): void {
    this.paginator.pageSizeOptions = [8, 16, 32];
  }

  ngOnChanges(): void {
    this.paginator.length = this.facilities.length;
    this.paginator.firstPage();
    this.pageChanged();
  }

  toObject(id: number) {
    this.router.navigate(['/facility/' + id]);
  }
}
