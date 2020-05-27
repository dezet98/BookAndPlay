import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Reservation } from 'src/app/_models/reservation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-object-reservations',
  templateUrl: './object-reservations.component.html',
  styleUrls: ['./object-reservations.component.scss']
})
export class ObjectReservationsComponent implements OnChanges {
  @Input() facilityId: number;
  reservations: any = [];
  reservationColumns = ['reservationId', 'date', 'startTime', 'client', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private reservationService: ReservationService) { }

  ngOnChanges() {
    if (Number.isInteger(this.facilityId)) {
      this.getReservations();
    }
  }

  getReservations() {
    this.reservationService.getAllReservation(this.facilityId).subscribe((reservations: Array<Reservation>) => {
      this.reservations = new MatTableDataSource(reservations);
      this.reservations.paginator = this.paginator;
      this.reservations.sort = this.sort;
      console.log(reservations);
      console.log(reservations.indexOf(reservations[0]));
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reservations.filter = filterValue.trim().toLowerCase();

    if (this.reservations.paginator) {
      this.reservations.paginator.firstPage();
    }
  }

  /*
    getReservations(): void {
      this.reservationService.getAllReservation(this.facilityId).subscribe((reservations: Array<Reservation>) => {
        let key: string;
        console.log(reservations);
        console.log(reservations.sort((a: Reservation, b: Reservation) => a.startTime.getTime() - b.startTime.getTime()));
        this.sortRes = reservations.sort((a: Reservation, b: Reservation) => a.startTime.getTime() - b.startTime.getTime())
          .reduce((prev: any, curr: Reservation) => {
            console.log(prev);
            key = curr.startTime.getDate() + '/' + curr.startTime.getMonth() + '/' + curr.startTime.getFullYear();
            if (!prev.has(key)) {
              console.log(prev);
              prev.set(key, [curr]);
              return prev;
            }
            console.log(prev);
            prev.get(key).push(curr);
            return prev;
          }, new Map());

      }, error => {
        console.log(error);
      });

    }
  */
}
