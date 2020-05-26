import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Reservation } from 'src/app/_models/reservation';
import { GeneralService } from 'src/app/_services/general.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  @Input() facilityId: number;
  dayColumns = [];
  rows: any;
  chosenRes = [];

  constructor(private reservationService: ReservationService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.renderReservation();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const day = new Date().getDay();
    this.dayColumns = days.splice(day, days.length + 1).concat(days.splice(0, day));
  }

  renderReservation() {
    this.reservationService.getAllReservation(this.facilityId).subscribe((reservations: Array<Reservation>) => {
      this.rows = this.performReservations(reservations);
      console.log(this.rows);
    }, error => {
      console.log(error);
    });
  }

  bookRes() {
    console.log('Booking');
    this.reservationService.book(this.chosenRes).subscribe((res) => {
      console.log(res);
      this.renderReservation();
      this.generalService.showSnackbar('You has a reservation', 'Close');
    }, error => {
      console.log(error);
      this.generalService.showSnackbar('Error when booking', 'Close');
    });
  }

  addToRes(reservation: Reservation) {
    const isRepeat = this.chosenRes.indexOf(reservation);
    if (isRepeat === -1) {
      this.chosenRes.push(reservation);
    } else {
      this.chosenRes.splice(isRepeat, 1);
    }

    this.chosenRes.sort((a: Reservation, b: Reservation) => a.startTime.getTime() - b.startTime.getTime());
    console.log(this.chosenRes);
  }

  removeRes(reservation: Reservation) {
    this.chosenRes.splice(this.chosenRes.indexOf(reservation), 1);
  }

  // return order array with objects to display, like: [{Sun: Reservation, Mon: '', Tue: Reservation, ...}, ...]
  performReservations(reservations: Array<Reservation>): Array<any> {
    console.log(reservations);
    const resPerHours = new Map();
    let key: string;
    let hour: string;
    let minute: string;
    // order into resPerHours object per hours
    reservations.sort((a: Reservation, b: Reservation) => a.startTime.getTime() - b.startTime.getTime())
      .forEach((res) => {
        hour = res.startTime.getHours() < 10 ? ('0' + res.startTime.getHours().toString()) : res.startTime.getHours().toString();
        minute = res.startTime.getMinutes() < 30 ? '00' : '30';
        key = hour + ':' + minute;
        if (!resPerHours.has(key)) {
          resPerHours.set(key, [res]);
        }
        else {
          resPerHours.get(key).push(res);
        }
      });
    console.log(resPerHours);

    const finalData = [];
    // create final table of objects
    for (const res of resPerHours.values()) {
      const tmp = { Sun: '', Mon: '', Tue: '', Wed: '', Thur: '', Fri: '', Sat: '' };
      for (const i of res) {
        tmp[this.dayColumns[i.startTime.getDay()]] = i;
      }
      finalData.push(tmp);
    }

    console.log(finalData);
    return finalData;
  }
}
