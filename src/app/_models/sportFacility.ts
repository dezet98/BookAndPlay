import { User } from './user';

export class SportFacility {
  // tslint:disable
  private _name: string;
  private _sport: string;
  private _phone: string;
  private _address: string;
  private _lat: string;
  private _lon: string;
  private _images: FormData;
  private _description: string;
  private _facilityId: number;
  private _owner: User;
  // tslint:enable

  constructor(
    name: string,
    sport: string,
    phone: string,
    address: string,
    lat: string,
    lon: string,
    images: FormData,
    description: string,
    facilityId?: number,
    owner?: User) {
    this._name = name;
    this._sport = sport;
    this._phone = phone;
    this._address = address;
    this._lat = lat;
    this._lon = lon;
    this._images = images;
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
  get description() { return this._description; }
  get facilityId() { return this._facilityId; }
  get owner() { return this._owner; }

  getSportObject() {
    return {
      name: this._name,
      sport: this._sport,
      phone: this._phone,
      address: this._address,
      lat: this._lat,
      lon: this._lon,
      // images: this.images,
      description: this._description
    };
  }
}
