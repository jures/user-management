export class User {
  public id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public age: number;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    age: number
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.age = age;
  }
}
