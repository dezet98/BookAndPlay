import { Component, OnInit } from '@angular/core';
import { SportFacility } from '../_models/sportFacility';
import { AccessPeriodService } from '../_services/access-period.service';
import { ActivatedRoute } from '@angular/router';
import { AccessPeriod } from '../_models/accessPeriod';
import { ReservationService } from '../_services/reservation.service';
import { Reservation } from '../_models/reservation';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {
  facilityId: number;
  example = new SportFacility('Boisko przy szkole nr 5', 'Piłka Nożna', '123456789', 'Mroczka 32, Warszawa', '21.21', '34.23', null, 'Obiekt posiada oswietlenie. Boisko można zamówić na połowę');
  dayColumns = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  rows: any;

  constructor(private route: ActivatedRoute, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.facilityId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getAllReservation();
  }

  getAllReservation() {
    this.reservationService.getAllReservation(this.facilityId).subscribe((reservations: Array<Reservation>) => {
      this.rows = this.performReservations(reservations);
    }, error => {
      console.log(error);
    });
  }

  // return order array with objects to display, like: [{Sun: Reservation, Mon: '', Tue: Reservation, ...}, ...]
  performReservations(reservations: Array<Reservation>): Array<any> {
    console.log(reservations);
    const resPerHours = {};
    let key: string;
    // order into resPerHours object per hours
    reservations.forEach((res) => {
      console.log('minu=' + res.startTime.getMinutes());
      key = res.startTime.getHours() < 10 ? '0' + res.startTime.getHours() : res.startTime.getHours() +
        res.startTime.getMinutes() < 30 ? '.00' : '.30';
      if (resPerHours[key] === undefined) {
        resPerHours[key] = [res];
      }
      else {
        resPerHours[key].push(res);
      }
    });
    console.log(resPerHours);

    const finalData = [];
    // create final table of objects
    for (const prop in resPerHours) {
      if (resPerHours.hasOwnProperty(prop)) {
        const sameHourRes = resPerHours[prop];
        const tmp = { Sun: '', Mon: '', Tue: '', Wed: '', Thur: '', Fri: '', Sat: '' };
        for (const i of sameHourRes) {
          console.log('i.startTime.getDay() ' + i.startTime.getDay());
          tmp[this.dayColumns[i.startTime.getDay()]] = i;
        }
        finalData.push(tmp);
      }
    }

    console.log(finalData);
    return finalData;
  }
}
