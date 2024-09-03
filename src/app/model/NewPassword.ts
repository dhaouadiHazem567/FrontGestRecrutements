export class NewPassword{

  idUser!:number;
  newPassword!:string;


  constructor(idUser: number, newPassword: string) {
    this.idUser = idUser;
    this.newPassword = newPassword;
  }
}
