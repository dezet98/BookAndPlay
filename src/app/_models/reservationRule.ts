import { ReservationStep } from './reservationsStep';
import { AccessPeriod } from './accessPeriod';

export class ReservationRule {
  days: Array<boolean>;
  startHour: number;
  startMinute: number;
  step: ReservationStep;
  amountOfSteps: number;
  facilityId: number;
  accessPeriodsIds: Array<number>;

  constructor(
    days: Array<boolean>,
    startHour: number,
    startMinute: number,
    step: ReservationStep,
    amountOfSteps: number,
    facilityId: number,
    accessPeriodsIds?: Array<number>
  ) {
    this.days = days;
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.step = step;
    this.amountOfSteps = amountOfSteps;
    this.facilityId = facilityId;
    this.accessPeriodsIds = accessPeriodsIds;
  }

  addDays(newDays: Array<boolean>) {
    for (const [index, day] of newDays.entries()) {
      if (day) {
        this.days[index] = true;
      }
    }
  }

  sumAccessPeriodsIds(accessPeriodsIds: Array<number>) {
    this.accessPeriodsIds = this.accessPeriodsIds.concat(accessPeriodsIds);
  }

  getEndTime() {
    const durMinutes = this.amountOfSteps * this.step.getInMinutes();
    let hour = this.startHour + Math.floor(durMinutes / 60);
    let minute = this.startMinute + (durMinutes % 60);

    while (minute > 59) {
      hour++;
      minute -= 60;
    }

    return [hour, minute];
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


