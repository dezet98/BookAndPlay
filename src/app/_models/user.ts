export class User {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;

  constructor(name: string, surname: string, email: string, password: string, phoneNumber: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
  }

  getUserObject() {
    return {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber
    };
  }
}
