import {Gender} from "../enum/Gender";

export class CreateUser {
  firstname?: string;
  lastname?: string;
  phone?: string;
  gender?: Gender;
  birthdate?: Date;
  username?: string;
  email!: string;
  password!: string;
}
