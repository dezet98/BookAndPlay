import { ReservationStep } from './reservationsStep';
import { AccessPeriod } from './accessPeriod';

export class ReservationRule {
  days: Array<boolean>;
  startHour: number;
  startMinute: number;
  step: ReservationStep;
  amountOfSteps: number;
  facilityId: number;

  constructor(
    days: Array<boolean>,
    startHour: number,
    startMinute: number,
    step: ReservationStep,
    amountOfSteps: number,
    facilityId: number
  ) {
    this.days = days;
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.step = step;
    this.amountOfSteps = amountOfSteps;
    this.facilityId = facilityId;
  }

  addDays(newDays: Array<boolean>) {
    for (const [index, day] of newDays.entries()) {
      if (day) {
        this.days[index] = true;
      }
    }
  }

  // change rule to array of accessPeriod
  getAccessPeriods(): any {
    const accessPeriods = [];
    let startHour: number;
    let startMinute: number;
    let endHour: number;
    let endMinute: number;

    for (const [index, day] of this.days.entries()) {
      if (day) {
        startHour = this.startHour;
        startMinute = this.startMinute;

        for (let step = 0; step < this.amountOfSteps; step++) {
          endHour = startHour + this.step.hour;
          endMinute = startMinute + this.step.minute;

          while (endMinute > 59) {
            endHour++;
            endMinute -= 60;
          }

          accessPeriods.push(new AccessPeriod(startHour, startMinute, endHour, endMinute, index, this.facilityId));

          startHour = endHour;
          startMinute = endMinute;
        }
      }
    }

    return accessPeriods;
  }
}


