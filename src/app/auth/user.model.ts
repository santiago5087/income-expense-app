export class User {

  public name: string;
  public email : string;
  public uid: string;

  constructor(name: string, email: string, uid: string) {
    this.name = name;
    this.email = email;
    this.uid = uid;
  }
  
}