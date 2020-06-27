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
  allReservations: MatTableDataSource<Reservation>;
  newReservations: MatTableDataSource<Reservation>;
  reservationColumns = ['reservationId', 'date', 'startTime', 'facility', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private reservationService: ReservationService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getReservation();
  }

  getReservation(): void {
    this.reservationService.getUserUpcoming().subscribe((reservations: Array<Reservation>) => {
      this.newReservations = new MatTableDataSource(reservations);
      this.newReservations.paginator = this.paginator;
      this.newReservations.sort = this.sort;
    });

    this.reservationService.getUserArchived().subscribe((oldReservations: Array<Reservation>) => {
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
