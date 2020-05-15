export class AccessPeriod {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  dayOfWeek: number; // 0 -> Sunday
  facilityId: number;

  constructor(startHour: number, startMinute: number, endHour: number, endMinute: number, dayOfWeek: number, facilityId: number) {
    this.startHour = startHour;
    this.startMinute = startMinute;
    this.endHour = endHour;
    this.endMinute = endMinute;
    this.dayOfWeek = dayOfWeek;
    this.facilityId = facilityId;
  }

  getAccessPeriodObject() {
    return {
      startHour: this.startHour,
      startMinute: this.startMinute,
      endHour: this.endHour,
      endMinute: this.endMinute,
      dayOfWeek: this.dayOfWeek,
      facilityId: this.facilityId
    };
  }
}
