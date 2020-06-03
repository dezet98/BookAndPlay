import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Reservation } from 'src/app/_models/reservation';
import { GeneralService } from 'src/app/_services/general.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  @Input() facilityId: number;
  dayColumns = [];
  rows: any;
  res: MatTableDataSource<Reservation>;
  chosenRes = [];
  booking = false;

  constructor(private reservationService: ReservationService, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.res = new MatTableDataSource(this.chosenRes);
    this.renderReservation();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const day = new Date().getDay();
    this.dayColumns = days.splice(day, days.length + 1).concat(days.splice(0, day));
  }

  renderReservation() {
    this.reservationService.getAll(this.facilityId).subscribe((reservations: Array<Reservation>) => {
      this.rows = this.performReservations(reservations);
      console.log(this.rows);
    }, error => {
      console.log(error);
    });
  }

  bookRes() {
    this.booking = true;
    this.reservationService.bookFew(this.chosenRes).subscribe((res) => {
      console.log(res);
      this.renderReservation();
      this.generalService.showSnackbar('You has a reservation', 'Close');
      this.booking = false;
      this.chosenRes = [];
      this.res.data = this.chosenRes;
    }, error => {
      console.log(error);
      this.generalService.showSnackbar('Error when booking', 'Close');
      this.booking = false;
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
    this.res.data = this.chosenRes;
    console.log(this.chosenRes);
  }

  removeRes(reservation: Reservation) {
    this.chosenRes.splice(this.chosenRes.indexOf(reservation), 1);
    this.res.data = this.chosenRes;
  }

  // return order array with objects to display, like: [{Sun: Reservation, Mon: '', Tue: Reservation, ...}, ...]
  performReservations(reservations: Array<Reservation>): Array<any> {
    console.log(reservations);
    let resPerHours: any;
    let key: string;
    let hour: string;
    let minute: string;
    // order into resPerHours object per hours
    resPerHours = reservations.reduce((prev: Map<string, Array<Reservation>>, curr: Reservation) => {
      hour = curr.startTime.getHours() < 10 ? ('0' + curr.startTime.getHours().toString()) : curr.startTime.getHours().toString();
      minute = curr.startTime.getMinutes() < 30 ? '00' : '30';
      key = hour + ':' + minute;

      if (!prev.has(key)) {
        prev.set(key, [curr]);
        return prev;
      }

      prev.get(key).push(curr);
      return prev;
    }, new Map());

    // sort by time:
    resPerHours = new Map([...resPerHours.entries()].sort());

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
