import { User } from './user';

export class Reservation {
  // tslint:disable
  private _startTime: Date;
  private _endTime: Date;
  private _archives: boolean;
  private _status: number;
  private _accessPeriodId: number;
  private _sportId: number; // 0 -> Sunday
  private _facilityId: number;
  private _facilityName: string;
  private _ownerId: number;
  private _user: User;
  private _reservationId: number;
  // tslint:enable

  constructor(
    startTime: Date,
    endTime: Date,
    archives: boolean,
    status: number,
    accessPeriodId: number,
    sportId: number,
    facilityId: number,
    facilityName: string,
    ownerId: number,
    user: User,
    reservationId: number) {
    this._startTime = startTime;
    this._endTime = endTime;
    this._archives = archives;
    this._status = status;
    this._accessPeriodId = accessPeriodId;
    this._sportId = sportId;
    this._facilityId = facilityId;
    this._facilityName = facilityName;
    this._ownerId = ownerId;
    this._user = user;
    this._reservationId = reservationId;
  }

  get startTime() { return this._startTime; }
  get endTime() { return this._endTime; }
  get archives() { return this._archives; }
  get accessPeriodId() { return this._accessPeriodId; }
  get status() { return this._status; }
  get sportId() { return this._sportId; }
  get facilityId() { return this._facilityId; }
  get facilityName() { return this._facilityName; }
  get ownerId() { return this._ownerId; }
  get user() { return this._user; }
  get reservationId() { return this._reservationId; }

  get statusDes(): string {
    const statusesDes = ['Not booked', 'Booked', 'Cancelled by owner', 'Inactive', 'Cancelled by user'];
    return statusesDes[this.status];
  }
}
