import { User } from './user';
import { Config as con } from '../../config';

export class SportFacility {
  // tslint:disable
  private _name: string;
  private _sport: string;
  private _phone: string;
  private _address: string;
  private _lat: string;
  private _lon: string;
  private _description: string;
  private _facilityId: number;
  private _owner: User;
  private _imagesUrl: Array<string>;

  constructor(
    name: string,
    sport: string,
    phone: string,
    address: string,
    lat: string,
    lon: string,
    description: string,
    imagesUrl?: Array<string>,
    facilityId?: number,
    owner?: User) {
    this._name = name;
    this._sport = sport;
    this._phone = phone;
    this._address = address;
    this._lat = lat;
    this._lon = lon;
    this._imagesUrl = imagesUrl;
    this._description = description;
    this._facilityId = facilityId;
    this._owner = owner;
  }

  get name() { return this._name; }
  get sport() { return this._sport; }
  get phone() { return this._phone; }
  get address() { return this._address; }
  get lat() { return this._lat; }
  get lon() { return this._lon; }
  get imagesUrl() { return this._imagesUrl.map((imageUrl: string) => con.REST_API_URL + '/' + imageUrl); }
  get description() { return this._description; }
  get facilityId() { return this._facilityId; }
  get owner() { return this._owner; }

}

