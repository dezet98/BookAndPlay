import { Config as con } from '../../config';

export class User {
  // tslint:disable
  private _name: string;
  private _surname: string;
  private _email: string;
  private _phoneNumber: string;
  private _userId?: number;
  private _avatar?: string;
  // tslint:enable

  constructor(name: string, surname: string, email: string, phoneNumber: string, userId?: number, avatar?: string) {
    this._name = name;
    this._surname = surname;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._userId = userId;
    this._avatar = avatar;
  }

  get name() { return this._name; }
  get surname() { return this._surname; }
  get email() { return this._email; }
  get phoneNumber() { return this._phoneNumber; }
  get userId() { return this._userId; }
  get avatar() { return con.REST_API_URL + '/' + this._avatar; }

  getPersonalData() {
    return {
      name: this._name,
      surname: this._surname,
      email: this._email,
      phoneNumber: this._phoneNumber
    };
  }

}
