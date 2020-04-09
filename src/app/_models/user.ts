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

  getUser() {
    return {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber
    };
  }

  setUser(form: any) {
    this.name = form.name;
    this.surname = form.surname;
    this.email = form.email;
    this.password = form.password;
    this.phoneNumber = form.phoneNumber;
  }

}
