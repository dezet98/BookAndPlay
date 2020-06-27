export class User {
  // tslint:disable
  private _name: string;
  private _surname: string;
  private _email: string;
  private _phoneNumber: string;
  private _userId?: number;
  // tslint:enable

  constructor(name: string, surname: string, email: string, phoneNumber: string, userId?: number) {
    this._name = name;
    this._surname = surname;
    this._email = email;
    this._phoneNumber = phoneNumber;
    this._userId = userId;
  }

  get name() { return this._name; }
  get surname() { return this._surname; }
  get email() { return this._email; }
  get phoneNumber() { return this._phoneNumber; }
  get userId() { return this._userId; }

  getPersonalData() {
    return {
      name: this._name,
      surname: this._surname,
      email: this._email,
      phoneNumber: this._phoneNumber
    };
  }

}
