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
  reservations: MatTableDataSource<Reservation>;
  upcomingReservations: Array<Reservation> = [];
  archivedReservations: Array<Reservation> = [];
  reservationColumns = ['reservationId', 'date', 'startTime', 'client', 'status'];

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
      this.upcomingReservations = reservations;
      this.reservations = new MatTableDataSource(this.upcomingReservations);
      this.reservations.paginator = this.paginator;
      this.reservations.sort = this.sort;
    });

    this.reservationService.getArchived(this.facilityId).subscribe((oldReservations: Array<Reservation>) => {
      this.archivedReservations = oldReservations;
    });
  }

  onToggleRes(checked: boolean) {
    if (checked) {
      this.reservations.data = [...this.archivedReservations, ...this.upcomingReservations];
    }
    else {
      this.reservations.data = this.upcomingReservations;
    }
  }

  cancelRes(reservationId: number) {
    this.reservationService.cancel(reservationId).subscribe(() => {
      this.getReservation();
      this.generalService.showSnackbar('Cancel reservation was successful', 'Close');
    });
  }

  filter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.reservations.filter = filterValue.trim().toLowerCase();

    if (this.reservations.paginator) {
      this.reservations.paginator.firstPage();
    }
  }

}
