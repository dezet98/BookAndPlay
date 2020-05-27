export class Reservation {
  // tslint:disable
  private _startTime: Date;
  private _endTime: Date;
  private _status: number;
  private _accessPeriodId: number;
  private _sportId: number; // 0 -> Sunday
  private _facilityId: number;
  private _ownerId: number;
  private _reservationId: number;
  // tslint:enable

  constructor(
    startTime: Date,
    endTime: Date,
    status: number,
    accessPeriodId: number,
    sportId: number,
    facilityId: number,
    ownerId: number,
    reservationId: number) {
    this._startTime = startTime;
    this._endTime = endTime;
    this._status = status;
    this._accessPeriodId = accessPeriodId;
    this._sportId = sportId;
    this._facilityId = facilityId;
    this._ownerId = ownerId;
    this._reservationId = reservationId;
  }

  get startTime() { return this._startTime; }
  get endTime() { return this._endTime; }
  get accessPeriodId() { return this._accessPeriodId; }
  get status() { return this._status; }
  get sportId() { return this._sportId; }
  get facilityId() { return this._facilityId; }
  get ownerId() { return this._ownerId; }
  get reservationId() { return this._reservationId; }

  getAccessPeriodObject() {
    return {

    };
  }
}
