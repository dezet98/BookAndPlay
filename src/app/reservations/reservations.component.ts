import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation } from '../_models/reservation';
import { GeneralService } from '../_services/general.service';
import { ReservationService } from '../_services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})

export class ReservationsComponent implements OnInit {
  reservations: MatTableDataSource<Reservation>;
  upcomingReservations: Array<Reservation> = [];
  archivedReservations: Array<Reservation> = [];
  reservationColumns = ['reservationId', 'date', 'startTime', 'facility', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private reservationService: ReservationService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getReservation();
  }

  getReservation(): void {
    this.reservationService.getUserUpcoming().subscribe((reservations: Array<Reservation>) => {
      this.upcomingReservations = reservations;
      this.reservations = new MatTableDataSource(this.upcomingReservations);
      this.reservations.paginator = this.paginator;
      this.reservations.sort = this.sort;
    });

    this.reservationService.getUserArchived().subscribe((oldReservations: Array<Reservation>) => {
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
