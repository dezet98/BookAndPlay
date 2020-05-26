export class AccessPeriod {
  // tslint:disable
  private _startHour: number;
  private _startMinute: number;
  private _endHour: number;
  private _endMinute: number;
  private _dayOfWeek: number; // 0 -> Sunday
  private _facilityId: number;
  private _accessPeriodId: number;


  constructor(startHour: number, startMinute: number, endHour: number, endMinute: number, dayOfWeek: number, facilityId: number, accessPeriodId?: number) {
    this._startHour = startHour;
    this._startMinute = startMinute;
    this._endHour = endHour;
    this._endMinute = endMinute;
    this._dayOfWeek = dayOfWeek;
    this._facilityId = facilityId;
    this._accessPeriodId = accessPeriodId;
  }
  // tslint:enable
  get startHour() { return this._startHour; }
  get startMinute() { return this._startMinute; }
  get endHour() { return this._endHour; }
  get endMinute() { return this._endMinute; }
  get dayOfWeek() { return this._dayOfWeek; }
  get facilityId() { return this._facilityId; }
  get accessPeriodId() { return this._accessPeriodId; }

  getAccessPeriodObject() {
    return {
      startHour: this._startHour,
      startMinute: this._startMinute,
      endHour: this._endHour,
      endMinute: this._endMinute,
      dayOfWeek: this._dayOfWeek,
      facilityId: this._facilityId,
    };
  }
}
