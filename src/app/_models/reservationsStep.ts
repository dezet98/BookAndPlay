export class ReservationStep {
  hour: number;
  minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }

  getInMinutes() {
    return this.hour * 60 + this.minute;
  }
}


