export class User {

  public uid: string;
  public email : string;
  public name: string;
  public avatar: string;

  constructor(obj: DataObj) {
    this.uid = obj && obj.uid || null;
    this.email = obj && obj.email || null;
    this.name = obj && obj.name || null;
    this.avatar = obj.avatar;
  }
  
}

interface DataObj {
  uid: string;
  email: string;
  name: string;
  avatar: string;
}