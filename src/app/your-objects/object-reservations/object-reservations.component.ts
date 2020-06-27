import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Reservation } from 'src/app/_models/reservation';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralService } from 'src/app/_services/general.service';


@Component({
  selector: 'app-object-reservations',
  templateUrl: './object-reservations.component.html',
  styleUrls: ['./object-reservations.component.scss']
})
export class ObjectReservationsComponent implements OnChanges {
  @Input() facilityId: number;
  allReservations: MatTableDataSource<Reservation>;
  newReservations: MatTableDataSource<Reservation>;
  reservationColumns = ['reservationId', 'date', 'startTime', 'client', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private reservationService: ReservationService, private generalService: GeneralService) { }

  ngOnChanges(): void {
    if (Number.isInteger(this.facilityId)) {
      this.getReservation();
    }
  }

  getReservation(): void {
    this.reservationService.getUpcomingBooked(this.facilityId).subscribe((reservations: Array<Reservation>) => {
      this.newReservations = new MatTableDataSource(reservations);
      this.newReservations.paginator = this.paginator;
      this.newReservations.sort = this.sort;
    });

    this.reservationService.getArchived(this.facilityId).subscribe((oldReservations: Array<Reservation>) => {
      this.allReservations = new MatTableDataSource([...oldReservations, ...this.newReservations.data]);
      this.allReservations.paginator = this.paginator;
      this.allReservations.sort = this.sort;
    });
  }

  cancelRes(reservationId: number) {
    this.reservationService.cancel(reservationId).subscribe(() => {
      this.getReservation();
      this.generalService.showSnackbar('Cancel reservation was successful', 'Close');
    });
  }

  filter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.newReservations.filter = filterValue.trim().toLowerCase();
    this.allReservations.filter = filterValue.trim().toLowerCase();

    if (this.newReservations.paginator) {
      this.newReservations.paginator.firstPage();
    }
    else if (this.allReservations.paginator) {
      this.allReservations.paginator.firstPage();
    }
  }
}
